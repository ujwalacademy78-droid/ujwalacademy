-- Fix RLS policy to allow profile creation after auth signup
-- Run this in Supabase SQL Editor

-- Drop existing policy
DROP POLICY IF EXISTS "Anyone can register" ON users;

-- Create new policy that allows authenticated users to insert their own profile
CREATE POLICY "Users can create own profile" ON users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Also allow service role to insert (for server-side operations)
CREATE POLICY "Service role can insert" ON users
  FOR INSERT
  WITH CHECK (true);
