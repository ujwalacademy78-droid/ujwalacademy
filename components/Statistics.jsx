'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useCounter } from '@/hooks/useCounter';

export default function Statistics() {
    const [ref, isVisible] = useIntersectionObserver();

    const stats = [
        { value: 10, label: 'y+', description: 'Years Experience' },
        { value: 50, label: 'c+', description: 'Courses' },
        { value: 1000, label: 's+', description: 'Students' },
        { value: 100, label: '%', description: 'Success Rate' },
    ];

    return (
        <section ref={ref} className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {stats.map((stat, index) => (
                        <StatItem
                            key={index}
                            value={stat.value}
                            label={stat.label}
                            description={stat.description}
                            isVisible={isVisible}
                        />
                    ))}

                    {/* Arrow Button */}
                    <button className="hidden lg:block absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                        →
                    </button>
                </div>
            </div>
        </section>
    );
}

function StatItem({ value, label, description, isVisible }) {
    const count = useCounter(value, 2000, isVisible);

    return (
        <div className="text-center p-6">
            <div className="text-5xl font-extrabold text-primary mb-1">
                {count}{label}
            </div>
            <div className="text-gray-600 font-medium">{description}</div>
        </div>
    );
}
