-- Check what's actually in the users table
SELECT * FROM users LIMIT 5;

-- Check if RLS is actually disabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'users' AND schemaname = 'public';

-- Try to manually insert a test user to see if it works
INSERT INTO users (id, email, name, role, subscription, status)
VALUES (
  gen_random_uuid(),
  'test@example.com',
  'Test User',
  'student',
  'free',
  'active'
)
RETURNING *;

-- If the above works, then the database is fine
-- If it fails, we'll see the actual error
