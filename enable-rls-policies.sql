-- ============================================
-- ENABLE ROW LEVEL SECURITY FOR UJWAL ACADEMY
-- ============================================
-- This script enables RLS and creates secure policies
-- that work with Supabase Auth
-- ============================================

-- Step 1: Enable RLS on the users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Step 2: Drop existing policies (if any)
DROP POLICY IF EXISTS "Users can view their own profile" ON users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;
DROP POLICY IF EXISTS "Enable read access for all authenticated users" ON users;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON users;
DROP POLICY IF EXISTS "Enable update for users based on id" ON users;

-- ============================================
-- USERS TABLE POLICIES
-- ============================================

-- Policy 1: Allow users to READ their own profile
CREATE POLICY "Users can read own profile"
ON users
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Policy 2: Allow users to INSERT their own profile during registration
CREATE POLICY "Users can insert own profile"
ON users
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Policy 3: Allow users to UPDATE their own profile
CREATE POLICY "Users can update own profile"
ON users
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Policy 4: Allow admins to read ALL user profiles
CREATE POLICY "Admins can read all profiles"
ON users
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

-- Policy 5: Allow admins to update ANY user profile
CREATE POLICY "Admins can update all profiles"
ON users
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

-- ============================================
-- VERIFICATION
-- ============================================

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'users';

-- List all policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'users';

-- ============================================
-- TESTING QUERIES (Run these to verify)
-- ============================================

-- Test 1: Check if current user can see their profile
-- SELECT * FROM users WHERE id = auth.uid();

-- Test 2: Check if user can update their own profile
-- UPDATE users SET name = 'Updated Name' WHERE id = auth.uid();

-- ============================================
-- NOTES
-- ============================================
-- 1. RLS is now ENABLED for the users table
-- 2. Users can only see/update their OWN profile
-- 3. Admins can see/update ALL profiles
-- 4. Profile creation during registration is allowed
-- 5. This is production-ready and secure
