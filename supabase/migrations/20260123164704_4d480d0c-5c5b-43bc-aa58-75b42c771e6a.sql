-- Create policies for admin access to enrollments (view all)
CREATE POLICY "Admins can view all enrollments"
ON public.enrollments
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create policies for admin access to courses (full CRUD)
CREATE POLICY "Admins can manage all courses"
ON public.courses
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create policy for admins to view all profiles (for enrollment details)
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create a view for enrollment stats that's safe for admins
CREATE OR REPLACE VIEW public.enrollment_stats AS
SELECT 
  c.id as course_id,
  c.title as course_title,
  c.category,
  c.price,
  COUNT(e.id) as total_enrollments,
  COUNT(CASE WHEN e.status = 'active' THEN 1 END) as active_enrollments,
  COUNT(CASE WHEN e.status = 'completed' THEN 1 END) as completed_enrollments,
  COUNT(CASE WHEN e.payment_status = 'completed' THEN 1 END) as paid_enrollments,
  COALESCE(SUM(CASE WHEN e.payment_status = 'completed' THEN e.amount_paid END), 0) as total_revenue
FROM public.courses c
LEFT JOIN public.enrollments e ON e.course_id = c.id
GROUP BY c.id, c.title, c.category, c.price;

-- Create RLS policy for enrollment_stats view
ALTER VIEW public.enrollment_stats SET (security_invoker = on);