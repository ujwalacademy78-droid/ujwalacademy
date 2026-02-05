'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.push('/dashboard/student');
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Redirecting to Dashboard...</h2>
                <p className="text-gray-600">Please wait</p>
            </div>
        </div>
    );
}
