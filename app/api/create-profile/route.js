import { createClient } from '@supabase/supabase-js';

// Use service role key for admin operations
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
);

export async function POST(request) {
    try {
        const { userId, email, name } = await request.json();

        console.log('Creating profile for:', { userId, email, name });

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

        // Create profile using service role (bypasses RLS)
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
