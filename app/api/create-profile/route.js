import { createClient } from '@supabase/supabase-js';

// Create a Supabase client with service role for admin operations
// This bypasses RLS policies
const getSupabaseAdmin = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl) {
        throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
    }

    // If no service role key, we'll need to disable RLS or use a different approach
    if (!serviceRoleKey) {
        console.warn('SUPABASE_SERVICE_ROLE_KEY not set, using anon key (may fail with RLS)');
        return createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    }

    return createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
};

export async function POST(request) {
    try {
        const { userId, email, name } = await request.json();

        console.log('Creating profile for:', { userId, email, name });

        const supabaseAdmin = getSupabaseAdmin();

        // Check if profile already exists
        const { data: existing, error: checkError } = await supabaseAdmin
            .from('users')
            .select('id')
            .eq('id', userId)
            .maybeSingle();

        if (checkError) {
            console.error('Error checking existing profile:', checkError);
        }

        if (existing) {
            console.log('Profile already exists');
            return Response.json({ success: true, message: 'Profile already exists' });
        }

        // Create profile
        const { data, error } = await supabaseAdmin
            .from('users')
            .insert([
                {
                    id: userId,
                    email: email,
                    name: name || email.split('@')[0],
                    role: 'student',
                    subscription: 'free',
                    status: 'active'
                }
            ])
            .select()
            .single();

        if (error) {
            console.error('Profile creation error:', error);

            // Provide helpful error message
            if (error.message.includes('row-level security')) {
                return Response.json({
                    success: false,
                    error: 'Database permission error. Please add SUPABASE_SERVICE_ROLE_KEY to environment variables.',
                    details: error.message
                }, { status: 500 });
            }

            return Response.json({
                success: false,
                error: error.message,
                details: error
            }, { status: 500 });
        }

        console.log('Profile created successfully:', data);
        return Response.json({ success: true, data });
    } catch (error) {
        console.error('API error:', error);
        return Response.json({
            success: false,
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
