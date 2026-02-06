'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('home');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

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
        setIsMobileMenuOpen(false); // Close mobile menu

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

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'courses', label: 'Courses' },
        { id: 'mentors', label: 'Mentors' },
        { id: 'about', label: 'About' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center flex-shrink-0">
                        <img
                            src="/logo-final.png"
                            alt="Ujwal Academy"
                            className="h-8 sm:h-10 w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
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

                    {/* Desktop CTA Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/login"
                            className="text-primary font-semibold hover:text-primary-dark transition-colors"
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

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <FaTimes className="w-6 h-6" />
                        ) : (
                            <FaBars className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <div
                className={`md:hidden fixed inset-0 top-16 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-[60] ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsMobileMenuOpen(false)}
            >
                <div
                    className={`bg-white w-full max-w-sm ml-auto h-full shadow-xl transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-col h-full p-6">
                        {/* Mobile Navigation Links */}
                        <div className="flex flex-col gap-4 mb-8">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.id)}
                                    className={`text-left py-3 px-4 rounded-lg font-medium transition-all ${pathname === '/' && activeSection === item.id
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        {/* Mobile CTA Buttons */}
                        <div className="flex flex-col gap-3 mt-auto">
                            <Link
                                href="/login"
                                className="w-full text-center py-3 px-6 rounded-lg font-semibold text-primary border-2 border-primary hover:bg-primary/10 transition-all"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="w-full text-center py-3 px-6 rounded-lg font-semibold bg-primary text-white hover:bg-primary-dark transition-all shadow-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                📚 Enroll Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
