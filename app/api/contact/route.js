import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { email } = await request.json();

        // Validate email
        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        // Here you would typically:
        // 1. Save to database
        // 2. Send confirmation email
        // 3. Add to mailing list

        console.log('Contact form submission:', email);

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 500));

        return NextResponse.json(
            { message: 'Thank you! We will contact you soon.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Something went wrong. Please try again.' },
            { status: 500 }
        );
    }
}
