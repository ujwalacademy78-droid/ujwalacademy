'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaGraduationCap } from 'react-icons/fa';

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('home');
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Only track active section on homepage
    useEffect(() => {
        if (pathname !== '/') return;

        const sections = ['home', 'courses', 'mentors', 'about'];
        const observerOptions = {
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [pathname]);

    const handleNavClick = (sectionId) => {
        // If we're not on the homepage, navigate to homepage first
        if (pathname !== '/') {
            router.push('/');
            // Wait for navigation to complete, then scroll
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            // If we're already on homepage, just scroll
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    // Hide navbar on dashboard pages - AFTER all hooks
    if (pathname.startsWith('/dashboard')) {
        return null;
    }

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <img
                            src="/logo-final.png"
                            alt="Ujwal Academy"
                            className="h-10 w-auto object-contain"
                        />
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {[
                            { id: 'home', label: 'Home' },
                            { id: 'courses', label: 'Courses' },
                            { id: 'mentors', label: 'Mentors' },
                            { id: 'about', label: 'About' },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`relative font-medium transition-colors ${pathname === '/' && activeSection === item.id
                                    ? 'text-primary'
                                    : 'text-gray-600 hover:text-primary'
                                    }`}
                            >
                                {item.label}
                                {pathname === '/' && activeSection === item.id && (
                                    <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>


                    {/* CTA Buttons */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/login"
                            className="hidden sm:block text-primary font-semibold hover:text-primary-dark transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-all hover:shadow-lg hover:-translate-y-0.5"
                        >
                            📚 Enroll Now
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
