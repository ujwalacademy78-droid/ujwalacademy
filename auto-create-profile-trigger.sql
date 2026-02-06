-- Automatically create user profile when someone signs up
-- Run this in Supabase SQL Editor

-- First, simplify RLS policies
DROP POLICY IF EXISTS "Users can create own profile" ON users;
DROP POLICY IF EXISTS "Service role can insert" ON users;
DROP POLICY IF EXISTS "Anyone can register" ON users;

-- Allow inserts for authenticated users
CREATE POLICY "Authenticated users can insert" ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Allow all to read (we can restrict this later)
CREATE POLICY "Anyone can read users" ON users
  FOR SELECT
  USING (true);

-- Create a trigger function to auto-create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, role, subscription)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    'student',
    'free'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
