-- Create RPC function to get quiz questions WITHOUT correct answers (for students)
CREATE OR REPLACE FUNCTION public.get_quiz_questions_for_student(p_quiz_id UUID)
RETURNS TABLE (
  id UUID,
  quiz_id UUID,
  question_text TEXT,
  question_type TEXT,
  options JSONB,
  points INTEGER,
  order_index INTEGER
)
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Verify user is enrolled in the course containing this quiz
  IF NOT EXISTS (
    SELECT 1 FROM quizzes q
    JOIN modules m ON m.id = q.module_id
    JOIN courses c ON c.id = m.course_id
    LEFT JOIN enrollments e ON e.course_id = c.id AND e.user_id = auth.uid()
    WHERE q.id = p_quiz_id
    AND (e.status = 'active' OR c.instructor_id = auth.uid())
  ) THEN
    RAISE EXCEPTION 'Not authorized to access this quiz';
  END IF;

  -- Return questions without correct_answer and explanation
  RETURN QUERY
  SELECT 
    qq.id,
    qq.quiz_id,
    qq.question_text,
    qq.question_type,
    qq.options,
    qq.points,
    qq.order_index
  FROM quiz_questions qq
  WHERE qq.quiz_id = p_quiz_id
  ORDER BY qq.order_index;
END;
$$;

-- Create RPC function to submit quiz and check answers server-side
CREATE OR REPLACE FUNCTION public.submit_quiz_answers(
  p_quiz_id UUID,
  p_answers JSONB
)
RETURNS TABLE (
  attempt_id UUID,
  score INTEGER,
  max_score INTEGER,
  is_passed BOOLEAN,
  results JSONB
)
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  v_attempt_id UUID;
  v_score INTEGER := 0;
  v_max_score INTEGER := 0;
  v_passing_score INTEGER;
  v_is_passed BOOLEAN;
  v_question RECORD;
  v_results JSONB := '[]'::jsonb;
  v_user_answer TEXT;
  v_is_correct BOOLEAN;
BEGIN
  -- Verify user is enrolled
  IF NOT EXISTS (
    SELECT 1 FROM quizzes q
    JOIN modules m ON m.id = q.module_id
    JOIN courses c ON c.id = m.course_id
    JOIN enrollments e ON e.course_id = c.id AND e.user_id = auth.uid()
    WHERE q.id = p_quiz_id
    AND e.status = 'active'
  ) THEN
    RAISE EXCEPTION 'Not enrolled in this course';
  END IF;

  -- Check max attempts
  DECLARE
    v_attempt_count INTEGER;
    v_max_attempts INTEGER;
  BEGIN
    SELECT max_attempts INTO v_max_attempts FROM quizzes WHERE id = p_quiz_id;
    SELECT COUNT(*) INTO v_attempt_count 
    FROM quiz_attempts 
    WHERE quiz_id = p_quiz_id AND user_id = auth.uid() AND submitted_at IS NOT NULL;
    
    IF v_max_attempts IS NOT NULL AND v_attempt_count >= v_max_attempts THEN
      RAISE EXCEPTION 'Maximum attempts exceeded';
    END IF;
  END;

  -- Calculate score
  FOR v_question IN 
    SELECT qq.* FROM quiz_questions qq WHERE qq.quiz_id = p_quiz_id ORDER BY qq.order_index
  LOOP
    v_max_score := v_max_score + v_question.points;
    v_user_answer := p_answers->>v_question.id::text;
    v_is_correct := v_user_answer = v_question.correct_answer;
    
    IF v_is_correct THEN
      v_score := v_score + v_question.points;
    END IF;

    -- Build results with explanations (only shown after submission)
    v_results := v_results || jsonb_build_object(
      'question_id', v_question.id,
      'correct', v_is_correct,
      'correct_answer', v_question.correct_answer,
      'explanation', v_question.explanation
    );
  END LOOP;

  -- Get passing score and determine if passed
  SELECT passing_score INTO v_passing_score FROM quizzes WHERE id = p_quiz_id;
  
  IF v_max_score > 0 THEN
    v_is_passed := (v_score * 100.0 / v_max_score) >= v_passing_score;
  ELSE
    v_is_passed := true;
  END IF;

  -- Create attempt record
  INSERT INTO quiz_attempts (user_id, quiz_id, answers, score, max_score, is_passed, submitted_at)
  VALUES (auth.uid(), p_quiz_id, p_answers, v_score, v_max_score, v_is_passed, now())
  RETURNING quiz_attempts.id INTO v_attempt_id;

  RETURN QUERY SELECT v_attempt_id, v_score, v_max_score, v_is_passed, v_results;
END;
$$;

-- Drop the existing permissive SELECT policy for students
DROP POLICY IF EXISTS "Questions visible to enrolled users" ON public.quiz_questions;

-- Create restrictive policy: Only instructors can SELECT directly from quiz_questions
CREATE POLICY "Only instructors can view full question details"
ON public.quiz_questions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM quizzes q
    JOIN modules m ON m.id = q.module_id
    JOIN courses c ON c.id = m.course_id
    WHERE q.id = quiz_questions.quiz_id
    AND c.instructor_id = auth.uid()
  )
);