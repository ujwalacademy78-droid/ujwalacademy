'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import { FaGraduationCap, FaGoogle, FaGithub, FaEye, FaEyeSlash } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useApp();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Check if user exists in Supabase
            const { data: users, error: fetchError } = await supabase
                .from('users')
                .select('*')
                .eq('email', formData.email)
                .single();

            if (fetchError || !users) {
                setError('Invalid email or password');
                setLoading(false);
                return;
            }

            // Login with context provider
            login(formData.email, users.role);

            // Wait for context to update, then redirect to appropriate dashboard
            setTimeout(() => {
                if (users.role === 'admin') {
                    router.push('/dashboard/admin');
                } else {
                    router.push('/dashboard/student');
                }
            }, 100);
        } catch (err) {
            console.error('Login error:', err);
            setError('An unexpected error occurred. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-dark via-dark-light to-dark p-12 flex-col justify-between text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-cyan rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10">
                    <Link href="/" className="flex items-center mb-12">
                        <img
                            src="/logo-final.png"
                            alt="Ujwal Academy"
                            className="h-12 w-auto object-contain"
                        />
                    </Link>
                    <h1 className="text-5xl font-extrabold mb-6 leading-tight">
                        Welcome back to<br />your learning journey.
                    </h1>

                    <p className="text-lg text-white/80 mb-12 max-w-md">
                        Continue building your skills and advancing your career with our industry-leading courses.
                    </p>

                    <div className="space-y-4">
                        {[
                            { icon: '📊', text: 'Track your progress' },
                            { icon: '🎯', text: 'Resume where you left off' },
                            { icon: '🏆', text: 'Earn certificates' },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xl">
                                    {item.icon}
                                </div>
                                <span className="text-white/90 text-lg">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 text-white/60 text-sm">
                    © 2024 Ujwal Academy. All rights reserved.
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-start justify-center p-6 sm:p-8 lg:p-12 pt-20 bg-gray-50 min-h-screen">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <Link href="/" className="lg:hidden flex items-center gap-2 text-xl font-bold mb-8">
                        <FaGraduationCap className="text-2xl text-primary" />
                        <span className="text-gray-900">UJWAL</span>
                        <span className="text-primary">ACADEMY</span>
                    </Link>

                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                            Welcome back
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Log in to your account to continue learning.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@example.com"
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <Link href="#" className="text-sm text-primary hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                />
                                <label className="text-sm text-gray-600">
                                    Remember me for 30 days
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-all hover:shadow-xl hover:-translate-y-0.5"
                            >
                                Log In
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                                <FaGoogle className="text-red-500" />
                                <span className="font-medium text-gray-700">Google</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                                <FaGithub className="text-gray-900" />
                                <span className="font-medium text-gray-700">Github</span>
                            </button>
                        </div>

                        {/* Register Link */}
                        <p className="mt-6 text-center text-gray-600">
                            Don't have an account?{' '}
                            <Link href="/register" className="text-primary font-semibold hover:underline">
                                Sign up for free
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
