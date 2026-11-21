import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
    { to: '/', label: 'Home' },
    { to: '/people', label: 'People' },
    { to: '/research', label: 'Research' },
    { to: '/publications', label: 'Publications' },
    { to: '/news', label: 'News' },
];

const Header = ({ isHeaderVisible, isHeaderGlass }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Close mobile menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    // Lock body scrolling and support Escape key when mobile menu is open
    useEffect(() => {
        if (!isMenuOpen) {
            document.body.style.overflow = '';
            return undefined;
        }

        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMenuOpen]);

    const isContactActive = location.pathname === '/contact';
    const shouldShowHeader = isHeaderVisible || isMenuOpen;

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    shouldShowHeader ? 'translate-y-0' : '-translate-y-full'
                } ${isHeaderGlass && !isMenuOpen ? 'glass-header shadow-lg shadow-black/30' : 'bg-transparent'}`}
            >
                <nav
                    aria-label="Primary Navigation"
                    className="container mx-auto px-6 py-4 flex justify-between items-center"
                >
                    <Link
                        to="/"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-xl md:text-2xl font-bold text-white tracking-tight z-50 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                        <span className="hidden md:inline">The Neurosymbolic AI Lab</span>
                        <span className="md:hidden">Neurosymbolic AI</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {NAV_ITEMS.map(({ to, label }) => {
                            const isActive = location.pathname === to;
                            return (
                                <Link
                                    key={to}
                                    to={to}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={`text-sm transition-colors duration-200 rounded-md px-1 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                                        isActive
                                            ? 'text-white font-semibold'
                                            : 'text-gray-300 hover:text-white'
                                    }`}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                        <Link
                            to="/contact"
                            aria-current={isContactActive ? 'page' : undefined}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${
                                isContactActive
                                    ? 'bg-blue-500 text-white ring-2 ring-blue-300/60'
                                    : 'bg-blue-600 text-white hover:bg-blue-500'
                            }`}
                        >
                            Get in Touch
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-nav-menu"
                        className="md:hidden text-white p-2 -mr-2 rounded-lg z-50 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </nav>
            </header>

            {/* Fullscreen Mobile Menu */}
            <div
                id="mobile-nav-menu"
                aria-hidden={!isMenuOpen}
                className={`md:hidden fixed inset-0 bg-[#0a0a0a]/95 backdrop-blur-lg z-40 transition-all duration-300 ease-in-out ${
                    isMenuOpen
                        ? 'translate-x-0 opacity-100 pointer-events-auto visible'
                        : 'translate-x-full opacity-0 pointer-events-none invisible'
                }`}
            >
                <div className="flex flex-col items-center justify-center h-full space-y-7 px-6">
                    {[...NAV_ITEMS, { to: '/contact', label: 'Get in Touch' }].map(({ to, label }) => {
                        const isActive = location.pathname === to;
                        return (
                            <Link
                                key={to}
                                to={to}
                                tabIndex={isMenuOpen ? 0 : -1}
                                aria-current={isActive ? 'page' : undefined}
                                onClick={() => setIsMenuOpen(false)}
                                className={`text-2xl font-bold transition-colors duration-200 rounded-md px-3 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                                    isActive
                                        ? 'text-blue-400'
                                        : 'text-gray-200 hover:text-white'
                                }`}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Header;
