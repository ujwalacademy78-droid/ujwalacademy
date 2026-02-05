-- Fix RLS Policies for User Registration
-- Run this in Supabase SQL Editor

-- Drop existing policies that might be blocking inserts
DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Admins can view all users" ON users;

-- Allow anyone to insert new users (for registration)
CREATE POLICY "Anyone can register" ON users
  FOR INSERT
  WITH CHECK (true);

-- Users can view their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT
  USING (true);

-- Users can update their own data  
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE
  USING (true);

-- Only admins can delete users
CREATE POLICY "Admins can delete users" ON users
  FOR DELETE
  USING (role = 'admin');
