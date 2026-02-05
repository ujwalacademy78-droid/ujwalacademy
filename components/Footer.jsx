'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaGraduationCap, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    const pathname = usePathname();

    // Hide footer on dashboard pages - AFTER all hooks
    if (pathname.startsWith('/dashboard')) {
        return null;
    }

    return (
        <footer className="bg-dark text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Column 1: About */}
                    <div>
                        <div className="flex items-center gap-2 text-xl font-bold mb-4">
                            <FaGraduationCap className="text-2xl text-primary" />
                            <span>UJWAL</span>
                            <span className="text-primary">ACADEMY</span>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Empowering students with industry-relevant skills and knowledge for a successful career in technology.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: FaFacebook, href: '#' },
                                { icon: FaTwitter, href: '#' },
                                { icon: FaLinkedin, href: '#' },
                                { icon: FaInstagram, href: '#' },
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all hover:-translate-y-1"
                                >
                                    <social.icon className="text-lg" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            {['Home', 'All Courses', 'Our Mentors', 'About Us'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href="#"
                                        className="text-gray-400 hover:text-primary transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Courses */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Courses</h4>
                        <ul className="space-y-3">
                            {['Java Full Stack', 'Python & AI', 'Web Development', 'Data Science'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href="#"
                                        className="text-gray-400 hover:text-primary transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Contact Us</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex items-start gap-2">
                                <span>📧</span>
                                <span>info@ujwalacademy.com</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>📞</span>
                                <span>+91 1234567890</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>📍</span>
                                <span>Amravati, Maharashtra</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 text-center text-gray-500">
                    <p>&copy; 2024 Ujwal Academy. All rights reserved. Designed with ❤️ by Ujwal Team</p>
                </div>
            </div>
        </footer>
    );
}
