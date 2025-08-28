import React, { useState, useEffect } from 'react';
import NewsPage from './pages/NewsPage';

// --- Import all page components ---
// This assumes you have a folder structure like: src/pages/HomePage.js, etc.
import HomePage from './pages/HomePage';
import PeoplePage from './pages/PeoplePage';
import ProjectsPage from './pages/ProjectsPage';
import PublicationsPage from './pages/PublicationsPage';
import ContactPage from './pages/ContactPage';

// --- Main App Component ---
// This component now handles navigation and layout, but not page content.
export default function App() {
    // State to track the current page
    const [page, setPage] = useState('home');
    // State for the mobile menu toggle
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // State to manage the header's glass effect on scroll
    const [isHeaderGlass, setIsHeaderGlass] = useState(false);

    // Effect to add a scroll listener for the header style
    useEffect(() => {
        const handleScroll = () => {
            setIsHeaderGlass(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        // Cleanup the event listener when the component unmounts
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- Navigation Function ---
    // Changes the page, closes the mobile menu, and scrolls to the top
    const navigate = (newPage) => {
        setPage(newPage);
        setIsMenuOpen(false);
        window.scrollTo(0, 0);
    };

    // --- Navigation Link Component ---
    // A reusable button for the main navigation
    const NavLink = ({ pageName, children }) => (
        <button 
            onClick={() => navigate(pageName.toLowerCase())} 
            className={`capitalize transition-colors duration-300 ${page === pageName.toLowerCase() ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
        >
            {children}
        </button>
    );

    // --- Page Renderer ---
    // This function decides which page component to display
    const renderPage = () => {
        switch (page) {
            case 'home':
                return <HomePage navigate={navigate} />;
            case 'people':
                return <PeoplePage />;
            case 'projects':
                return <ProjectsPage />;
            case 'publications':
                return <PublicationsPage />;
            case 'contact':
                return <ContactPage />;
            case 'news':
                return <NewsPage />;
            default:
                return <HomePage navigate={navigate} />;
        }
    };

    return (
        // Main container with global styles
        <div className="antialiased" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#0a0a0a', color: '#e2e8f0' }}>
            
            {/* Header and Navigation */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isHeaderGlass || isMenuOpen ? 'glass-effect shadow-lg' : ''}`}>
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <button onClick={() => navigate('home')} className="text-2xl font-bold text-white">
                        Neurosymbolic Intelligence Lab
                    </button>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                      <NavLink pageName="home">Home</NavLink>
                      <NavLink pageName="people">People</NavLink>
                      <NavLink pageName="projects">Research</NavLink>
                      <NavLink pageName="publications">Publications</NavLink>
                      <NavLink pageName="news">News</NavLink> {/* <-- ADD THIS LINE */}
                      <button onClick={() => navigate('contact')} className="btn btn-primary text-sm">Get in Touch</button>
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
                        <button onClick={() => navigate('home')} className="block w-full text-left py-3 px-6 text-white hover:bg-blue-600">Home</button>
                        <button onClick={() => navigate('people')} className="block w-full text-left py-3 px-6 text-white hover:bg-blue-600">People</button>
                        <button onClick={() => navigate('projects')} className="block w-full text-left py-3 px-6 text-white hover:bg-blue-600">Research</button>
                        <button onClick={() => navigate('publications')} className="block w-full text-left py-3 px-6 text-white hover:bg-blue-600">Publications</button>
                        <button onClick={() => navigate('news')} className="block w-full text-left py-3 px-6 text-white hover:bg-blue-600">News</button>

                        <button onClick={() => navigate('contact')} className="block w-full text-left py-3 px-6 text-white hover:bg-blue-600">Get in Touch</button>
                    </div>
                )}
            </header>

            {/* Main Content Area */}
            <main>
                {renderPage()}
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

// Note: The reusable components like `Card`, `Button`, etc., should also be moved
// to their own files in a separate `src/components` folder for best practice.
// Then, you would import them into the page files where they are needed.
