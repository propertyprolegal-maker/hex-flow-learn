-- Add unique constraint to prevent duplicate user-course enrollments
ALTER TABLE enrollments ADD CONSTRAINT unique_user_course_enrollment UNIQUE (user_id, course_id);