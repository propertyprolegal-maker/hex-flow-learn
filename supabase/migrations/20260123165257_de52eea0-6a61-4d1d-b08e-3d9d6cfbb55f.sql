-- Drop the existing view and recreate as a table with proper RLS
-- First check what profiles_public is (it's a view based on context)

-- Drop the view
DROP VIEW IF EXISTS public.profiles_public;

-- Recreate as a secure view with security_invoker
CREATE VIEW public.profiles_public
WITH (security_invoker = on) AS
SELECT 
  id,
  created_at,
  full_name,
  avatar_url,
  bio
FROM public.profiles;

-- Since it's a view with security_invoker, it inherits RLS from profiles table
-- But we need to add a policy on profiles for authenticated users to view others' public info

-- Add policy for authenticated users to view public profile info of others
CREATE POLICY "Authenticated users can view public profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);

-- Note: This allows authenticated users to see all profiles (non-sensitive fields only via the view)
-- The view excludes any sensitive columns like email