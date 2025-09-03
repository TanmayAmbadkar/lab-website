import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ isHeaderVisible, isHeaderGlass }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Reusable NavLink component that highlights the active page
    const NavLink = ({ to, children }) => (
        <Link
            to={to}
            onClick={() => setIsMenuOpen(false)} // Close menu on link click
            className={`capitalize transition-colors duration-300 ${location.pathname === to ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
        >
            {children}
        </Link>
    );

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'} ${isHeaderGlass || isMenuOpen ? 'glass-effect shadow-lg' : ''}`}>
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-white">
                    <span className="hidden md:inline">The Whitebox AI Lab</span>
                    <span className="md:hidden">Whitebox</span>
                </Link>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/people">People</NavLink>
                    <NavLink to="/research">Research</NavLink>
                    <NavLink to="/publications">Publications</NavLink>
                    <NavLink to="/news">News</NavLink>
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-500 transition">Get in Touch</Link>
                </div>

                {/* Mobile Menu Button */}
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white z-20">
                    {isMenuOpen ? (
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    )}
                </button>
            </nav>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-900/90 backdrop-blur-sm">
                    <NavLink to="/" className="block w-full text-left py-3 px-6 text-white hover:bg-blue-600">Home</NavLink>
                    <NavLink to="/people" className="block w-full text-left py-3 px-6 text-white hover:bg-blue-600">People</NavLink>
                    <NavLink to="/research" className="block w-full text-left py-3 px-6 text-white hover:bg-blue-600">Research</NavLink>
                    <NavLink to="/publications" className="block w-full text-left py-3 px-6 text-white hover:bg-blue-600">Publications</NavLink>
                    <NavLink to="/news" className="block w-full text-left py-3 px-6 text-white hover:bg-blue-600">News</NavLink>
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block w-full text-left py-3 px-6 text-white hover:bg-blue-600">Get in Touch</Link>
                </div>
            )}
        </header>
    );
};

export default Header;
