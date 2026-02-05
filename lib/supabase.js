import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kyllfbinwjrcflxaauqi.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5bGxmYmlud2pyY2ZseGFhdXFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2OTMwMTIsImV4cCI6MjA4NTI2OTAxMn0.ZNJVXlkfnyOJUOdp9BJFjT3dd2kbFNZg2mhV7s40MxE';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key exists:', !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
