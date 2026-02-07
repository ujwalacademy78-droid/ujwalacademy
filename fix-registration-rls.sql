-- ============================================
-- FIX REGISTRATION - UPDATE RLS POLICIES
-- ============================================
-- The issue: API route can't create profiles because
-- it uses anon key (no auth.uid())
-- Solution: Allow service role or update policies
-- ============================================

-- Drop existing insert policy
DROP POLICY IF EXISTS "Users can insert own profile" ON users;

-- Create new insert policy that allows:
-- 1. Authenticated users to insert their own profile
-- 2. Service role (API) to insert any profile
CREATE POLICY "Allow profile creation"
ON users
FOR INSERT
TO authenticated, anon
WITH CHECK (
  -- Either the user is creating their own profile
  auth.uid() = id
  -- OR it's being created via service (no auth.uid() means API call)
  OR auth.uid() IS NULL
);

-- Verify the policy
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename = 'users' AND cmd = 'INSERT';
