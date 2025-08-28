import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

// --- Import all page components ---
import HomePage from './pages/HomePage';
import PeoplePage from './pages/PeoplePage';
import ProjectsPage from './pages/ProjectsPage';
import PublicationsPage from './pages/PublicationsPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHeaderGlass, setIsHeaderGlass] = useState(false);
    const location = useLocation(); // Hook to get the current URL

    // Effect to close mobile menu on navigation and scroll to top
    useEffect(() => {
        setIsMenuOpen(false);
        window.scrollTo(0, 0);
    }, [location.pathname]); // This runs every time the URL changes

    // Effect for the header style
    useEffect(() => {
        const handleScroll = () => setIsHeaderGlass(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Reusable NavLink component that highlights the active page
    const NavLink = ({ to, children }) => (
        <Link
            to={to}
            className={`capitalize transition-colors duration-300 ${location.pathname === to ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
        >
            {children}
        </Link>
    );

    return (
        <div className="antialiased" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#0a0a0a', color: '#e2e8f0' }}>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isHeaderGlass || isMenuOpen ? 'glass-effect shadow-lg' : ''}`}>
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-white">
                        Neurosymbolic Intelligence Lab
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/people">People</NavLink>
                        <NavLink to="/research">Research</NavLink>
                        <NavLink to="/publications">Publications</NavLink>
                        <NavLink to="/news">News</NavLink>
                        <Link to="/contact" className="btn btn-primary text-sm">Get in Touch</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white z-20">
                        {isMenuOpen ? (
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                        )}
                    </button>
                </nav>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden bg-gray-900/90 backdrop-blur-sm">
                        <Link to="/" className="block w-full text-left py-3 px-6 text-white hover:bg-blue-600">Home</Link>
                        <Link to="/people" className="block w-full text-left py-3 px-6 text-white hover:bg-blue-600">People</Link>
                        <Link to="/research" className="block w-full text-left py-3 px-6 text-white hover:bg-blue-600">Research</Link>
                        <Link to="/publications" className="block w-full text-left py-3 px-6 text-white hover:bg-blue-600">Publications</Link>
                        <Link to="/news" className="block w-full text-left py-3 px-6 text-white hover:bg-blue-600">News</Link>
                        <Link to="/contact" className="block w-full text-left py-3 px-6 text-white hover:bg-blue-600">Get in Touch</Link>
                    </div>
                )}
            </header>

            {/* Main Content Area with Routes */}
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/people" element={<PeoplePage />} />
                    <Route path="/research" element={<ProjectsPage />} />
                    <Route path="/publications" element={<PublicationsPage />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                </Routes>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900/50 border-t border-gray-800 py-8">
                <div className="container mx-auto px-6 text-center text-gray-400">
                    <p>&copy; 2025 Abhinav Verma</p>
                </div>
            </footer>
        </div>
    );
}