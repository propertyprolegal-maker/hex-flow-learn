-- Remove email column from profiles table since it's redundant
-- (email is already stored securely in auth.users and accessible via session)
ALTER TABLE public.profiles DROP COLUMN IF EXISTS email;