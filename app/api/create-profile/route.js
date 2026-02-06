import { supabase } from '@/lib/supabase';

export async function POST(request) {
    try {
        const { userId, email, name } = await request.json();

        // Check if profile already exists
        const { data: existing } = await supabase
            .from('users')
            .select('id')
            .eq('id', userId)
            .single();

        if (existing) {
            return Response.json({ success: true, message: 'Profile already exists' });
        }

        // Create profile
        const { data, error } = await supabase
            .from('users')
            .insert([
                {
                    id: userId,
                    email: email,
                    name: name || 'User',
                    role: 'student',
                    subscription: 'free'
                }
            ])
            .select()
            .single();

        if (error) {
            console.error('Profile creation error:', error);
            return Response.json({ success: false, error: error.message }, { status: 500 });
        }

        return Response.json({ success: true, data });
    } catch (error) {
        console.error('API error:', error);
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}
