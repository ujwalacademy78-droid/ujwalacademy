'use client';

import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function Programs() {
    const [ref, isVisible] = useIntersectionObserver();

    const programs = [
        {
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
            title: 'Java Full Stack',
            description: 'Learn end-to-end Java development with Spring Boot, React, and modern tools.',
            duration: '6 months',
            featured: false,
        },
        {
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
            title: 'Python & AI',
            description: 'Master Python programming with AI/ML, Data Science, and automation.',
            duration: '8 months',
            featured: true,
        },
        {
            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
            title: 'Web Development',
            description: 'Build modern websites with HTML, CSS, JavaScript, and popular frameworks.',
            duration: '4 months',
            featured: false,
        },
    ];

    return (
        <section id="courses" ref={ref} className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">
                        Job-Oriented <span className="gradient-text">Programs</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Choose from our industry-aligned programs designed to make you job-ready
                    </p>
                </div>

                {/* Programs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {programs.map((program, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border-2 ${program.featured
                                ? 'border-primary bg-gradient-to-br from-primary/5 to-accent-cyan/5'
                                : 'border-transparent hover:border-primary'
                                }`}
                        >
                            <div className="w-20 h-20 mb-6 flex items-center justify-center">
                                <img
                                    src={program.logo}
                                    alt={`${program.title} logo`}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">{program.title}</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>

                            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                <span className="text-sm text-gray-500">📅 {program.duration}</span>
                                <a
                                    href="#"
                                    className="text-primary font-semibold hover:translate-x-1 transition-transform inline-block"
                                >
                                    Enroll →
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
