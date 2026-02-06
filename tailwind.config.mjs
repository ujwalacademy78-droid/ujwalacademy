/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2B7FFF',
                    dark: '#1a6ee6',
                    light: '#5c9aff',
                },
                secondary: {
                    DEFAULT: '#10B981',
                    dark: '#059669',
                },
                accent: {
                    purple: '#8B5CF6',
                    pink: '#EC4899',
                    cyan: '#00D4FF',
                },
                dark: {
                    DEFAULT: '#1a1a2e',
                    light: '#2d2d44',
                },
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
            boxShadow: {
                'glow': '0 0 20px rgba(43, 127, 255, 0.3)',
                'glow-lg': '0 0 40px rgba(43, 127, 255, 0.4)',
            },
        },
    },
    plugins: [],
};
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2B7FFF',
                    dark: '#1a6ee6',
                    light: '#5c9aff',
                },
                secondary: {
                    DEFAULT: '#10B981',
                    dark: '#059669',
                },
                accent: {
                    purple: '#8B5CF6',
                    pink: '#EC4899',
                    cyan: '#00D4FF',
                },
                dark: {
                    DEFAULT: '#1a1a2e',
                    light: '#2d2d44',
                },
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
            boxShadow: {
                'glow': '0 0 20px rgba(43, 127, 255, 0.3)',
                'glow-lg': '0 0 40px rgba(43, 127, 255, 0.4)',
            },
        },
    },
    plugins: [],
};
