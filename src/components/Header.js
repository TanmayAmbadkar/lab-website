import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ isHeaderVisible, isHeaderGlass }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Effect to prevent body scrolling when the mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        // Cleanup function to reset the style when the component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    // Reusable NavLink component for consistent behavior and styling
    const NavLink = ({ to, children, isMobile = false }) => (
        <Link
            to={to}
            onClick={() => setIsMenuOpen(false)} // Always close menu on link click
            className={
                isMobile
                    ? 'text-3xl font-bold text-gray-200 hover:text-white transition-colors duration-300'
                    : `capitalize transition-colors duration-300 ${location.pathname === to ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`
            }
        >
            {children}
        </Link>
    );

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'} ${isHeaderGlass ? 'glass-effect shadow-lg' : ''}`}>
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-white z-50">
                        <span className="hidden md:inline">Neurosymbolic Lab @ PennState</span>
                        <span className="md:hidden">Neurosymbolic Lab</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/people">People</NavLink>
                        <NavLink to="/research">Research</NavLink>
                        <NavLink to="/publications">Publications</NavLink>
                        <NavLink to="/news">News</NavLink>
                        <Link to="/contact" className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-500 transition">Get in Touch</Link>
                    </div>

                    {/* Mobile Menu Button (high z-index to stay on top) */}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white z-50">
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                        )}
                    </button>
                </nav>
            </header>

            {/* --- OPTIMIZED: Fullscreen Mobile Menu --- */}
            <div className={`md:hidden fixed inset-0 bg-gray-900 bg-opacity-95 backdrop-blur-lg z-40 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col items-center justify-center h-full space-y-8">
                    <NavLink to="/" isMobile={true}>Home</NavLink>
                    <NavLink to="/people" isMobile={true}>People</NavLink>
                    <NavLink to="/research" isMobile={true}>Research</NavLink>
                    <NavLink to="/publications" isMobile={true}>Publications</NavLink>
                    <NavLink to="/news" isMobile={true}>News</NavLink>
                    <NavLink to="/contact" isMobile={true}>Get in Touch</NavLink>
                </div>
            </div>
        </>
    );
};

export default Header;

