'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CTA() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setStatus('success');
                setEmail('');
                setTimeout(() => setStatus(''), 3000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <section className="py-20 bg-dark text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">
                            Ready to start your <span className="gradient-text">career transition?</span>
                        </h2>
                        <p className="text-lg text-white/80 mb-8 leading-relaxed">
                            Join thousands of students who have transformed their careers with Ujwal Academy.
                            Start your journey today!
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="flex-1 px-6 py-4 rounded-lg bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-all hover:shadow-xl disabled:opacity-50"
                            >
                                {status === 'loading' ? 'Sending...' : 'Get Started'}
                            </button>
                        </form>

                        {status === 'success' && (
                            <p className="mt-4 text-secondary">Thank you! We'll contact you soon.</p>
                        )}
                        {status === 'error' && (
                            <p className="mt-4 text-red-400">Something went wrong. Please try again.</p>
                        )}
                    </motion.div>

                    {/* Right Testimonial Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="glass rounded-2xl p-8"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center text-2xl">
                                ✅
                            </div>
                            <div>
                                <h4 className="text-xl font-bold">Real Impact</h4>
                                <p className="text-white/70">Success Stories</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-white/70 text-sm mb-1">Course Sold</p>
                                <p className="text-3xl font-bold">10,000+</p>
                            </div>
                            <div>
                                <p className="text-white/70 text-sm mb-1">Enrolled Student</p>
                                <p className="text-3xl font-bold">50,000+</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CTA() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setStatus('success');
                setEmail('');
                setTimeout(() => setStatus(''), 3000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <section className="py-20 bg-dark text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">
                            Ready to start your <span className="gradient-text">career transition?</span>
                        </h2>
                        <p className="text-lg text-white/80 mb-8 leading-relaxed">
                            Join thousands of students who have transformed their careers with Ujwal Academy.
                            Start your journey today!
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="flex-1 px-6 py-4 rounded-lg bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-all hover:shadow-xl disabled:opacity-50"
                            >
                                {status === 'loading' ? 'Sending...' : 'Get Started'}
                            </button>
                        </form>

                        {status === 'success' && (
                            <p className="mt-4 text-secondary">Thank you! We'll contact you soon.</p>
                        )}
                        {status === 'error' && (
                            <p className="mt-4 text-red-400">Something went wrong. Please try again.</p>
                        )}
                    </motion.div>

                    {/* Right Testimonial Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="glass rounded-2xl p-8"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center text-2xl">
                                ✅
                            </div>
                            <div>
                                <h4 className="text-xl font-bold">Real Impact</h4>
                                <p className="text-white/70">Success Stories</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-white/70 text-sm mb-1">Course Sold</p>
                                <p className="text-3xl font-bold">10,000+</p>
                            </div>
                            <div>
                                <p className="text-white/70 text-sm mb-1">Enrolled Student</p>
                                <p className="text-3xl font-bold">50,000+</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
