'use client';

import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function Features() {
    const [ref, isVisible] = useIntersectionObserver();

    const features = [
        {
            icon: '📊',
            title: 'IT-Certified',
            description: 'Industry-recognized certifications that boost your career prospects',
        },
        {
            icon: '📞',
            title: 'PR Internet Call',
            description: '24/7 support and guidance from our expert team',
        },
        {
            icon: '💼',
            title: 'Limit Projects',
            description: 'Hands-on experience with real-world projects',
        },
    ];

    return (
        <section id="about" ref={ref} className="py-20 bg-gradient-to-br from-primary via-primary-dark to-primary text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">
                        Why Choose<br />Ujwal Academy?
                    </h2>
                    <p className="text-lg text-white/90 max-w-2xl mx-auto">
                        Discover what makes us the best choice for your career transformation
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass rounded-2xl p-8 hover:bg-white/15 transition-all hover:-translate-y-2"
                        >
                            <div className="text-6xl mb-6">{feature.icon}</div>
                            <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-white/90 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
