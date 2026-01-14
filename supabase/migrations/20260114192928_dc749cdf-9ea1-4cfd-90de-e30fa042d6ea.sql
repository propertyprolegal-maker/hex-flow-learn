-- Fix enrollments: instructors should NOT be able to see student payment details
-- Drop existing policy and create a more restrictive one
DROP POLICY IF EXISTS "Users can view their own enrollments" ON public.enrollments;

-- Users can only view their own enrollments (no instructor access to payment data)
CREATE POLICY "Users can view their own enrollments"
ON public.enrollments
FOR SELECT
USING (user_id = auth.uid());

-- Instructors can see enrollment counts/status for their courses but NOT payment details
-- This is handled through a view that excludes sensitive payment fields
CREATE OR REPLACE VIEW public.enrollments_instructor
WITH (security_invoker = on) AS
SELECT 
  e.id,
  e.user_id,
  e.course_id,
  e.enrolled_at,
  e.completed_at,
  e.status,
  e.package_type
  -- Excludes: amount_paid, stripe_payment_id, payment_status
FROM public.enrollments e
JOIN public.courses c ON c.id = e.course_id
WHERE c.instructor_id = auth.uid();

GRANT SELECT ON public.enrollments_instructor TO authenticated;