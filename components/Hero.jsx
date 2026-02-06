'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section id="home" className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            🎓 WELCOME TO UJWAL
                        </div>

                        <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                            Shape Your<br />
                            <span className="gradient-text">Digital Future</span><br />
                            In Amravati.
                        </h1>

                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            An interactive platform offers Freshers, Newly Graduated, and unemployed,
                            an advanced set of solutions to help them to enhance their career.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/register"
                                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-all hover:shadow-xl hover:-translate-y-1 text-center"
                            >
                                Enroll For Free
                            </Link>
                            <button className="bg-secondary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-secondary-dark transition-all hover:shadow-xl hover:-translate-y-1">
                                🎬 Upgrade Basics
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-float">
                            <Image
                                src="/images/hero.png"
                                alt="Workspace"
                                width={600}
                                height={600}
                                className="w-full h-auto"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section id="home" className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            🎓 WELCOME TO UJWAL
                        </div>

                        <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                            Shape Your<br />
                            <span className="gradient-text">Digital Future</span><br />
                            In Amravati.
                        </h1>

                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            An interactive platform offers Freshers, Newly Graduated, and unemployed,
                            an advanced set of solutions to help them to enhance their career.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/register"
                                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-all hover:shadow-xl hover:-translate-y-1 text-center"
                            >
                                Enroll For Free
                            </Link>
                            <button className="bg-secondary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-secondary-dark transition-all hover:shadow-xl hover:-translate-y-1">
                                🎬 Upgrade Basics
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-float">
                            <Image
                                src="/images/hero.png"
                                alt="Workspace"
                                width={600}
                                height={600}
                                className="w-full h-auto"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
