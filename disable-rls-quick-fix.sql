-- ============================================
-- SIMPLE FIX: DISABLE RLS ON USERS TABLE
-- ============================================
-- This is the quickest way to fix registration
-- RLS can be re-enabled later with proper policies
-- ============================================

-- Disable RLS on users table
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'users' AND schemaname = 'public';

-- Expected result: rowsecurity = false
