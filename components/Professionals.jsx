'use client';

import Image from 'next/image';
import { useCarousel } from '@/hooks/useCarousel';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { motion } from 'framer-motion';

export default function Professionals() {
    const [ref, isVisible] = useIntersectionObserver();

    const instructors = [
        { name: 'Amit Deshmukh', image: '/images/instructor1.png' },
        { name: 'Rohan Kulkarni', image: '/images/instructor2.png' },
    ];

    const { currentIndex, next, prev, pause, resume } = useCarousel(instructors.length);

    return (
        <section
            id="mentors"
            ref={ref}
            className="py-20 bg-white"
            onMouseEnter={pause}
            onMouseLeave={resume}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">
                        Learn From <span className="gradient-text">Professionals</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Get mentored by industry experts with years of real-world experience
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Previous Button */}
                    <button
                        onClick={prev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                    >
                        ←
                    </button>

                    {/* Carousel Track */}
                    <div className="overflow-hidden">
                        <motion.div
                            className="flex gap-8"
                            animate={{ x: `-${currentIndex * 100}%` }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                            {instructors.map((instructor, index) => (
                                <div
                                    key={index}
                                    className="min-w-full sm:min-w-[calc(50%-1rem)] lg:min-w-[calc(33.333%-1.5rem)] flex-shrink-0"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
                                    >
                                        <div className="relative h-80">
                                            <Image
                                                src={instructor.image}
                                                alt={instructor.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-6 bg-gray-50 text-center">
                                            <h3 className="text-xl font-bold">{instructor.name}</h3>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={next}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                    >
                        →
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-8">
                    {instructors.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => { }}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-primary w-8' : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
