import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import * as THREE from 'three'; // <-- 1. Import THREE.js

// --- Import all page components ---
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PeoplePage from './pages/PeoplePage';
import ProjectsPage from './pages/ProjectsPage';
import PublicationsPage from './pages/PublicationsPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [isHeaderGlass, setIsHeaderGlass] = useState(false);
    const lastScrollY = useRef(0);
    const location = useLocation();
    const backgroundRef = useRef(null);

    // --- Global background animation effect ---
    useEffect(() => {
        const currentMount = backgroundRef.current;
        if (!currentMount) return;

        // --- 2. Animation logic now directly uses the imported THREE object ---
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, currentMount.clientWidth / currentMount.clientHeight, 1, 1000);
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        currentMount.appendChild(renderer.domElement);

        const starGeo = new THREE.BufferGeometry();
        const starVertices = [];
        for (let i = 0; i < 6000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            starVertices.push(x, y, z);
        }
        starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        const starMaterial = new THREE.PointsMaterial({ color: 0xaaaaaa, size: 0.7 });
        const stars = new THREE.Points(starGeo, starMaterial);
        scene.add(stars);
        
        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            stars.rotation.x += 0.0001;
            stars.rotation.y += 0.0002;
            renderer.render(scene, camera);
        };
        animate();

        const onWindowResize = () => {
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        };
        window.addEventListener('resize', onWindowResize);

        return () => {
            window.removeEventListener('resize', onWindowResize);
            cancelAnimationFrame(animationFrameId);
            if (currentMount) {
                 // Check if renderer.domElement is still a child before removing
                if (renderer.domElement.parentNode === currentMount) {
                    currentMount.removeChild(renderer.domElement);
                }
            }
        };
    }, []);

    // Effect to scroll to top on navigation
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // Effect for the header style and hide/show logic
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsHeaderVisible(false);
            } else {
                setIsHeaderVisible(true);
            }
            setIsHeaderGlass(currentScrollY > 50);
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AuthProvider>
            <DataProvider>
                <div className="antialiased relative" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#0a0a0a', color: '#e2e8f0' }}>
                    <div ref={backgroundRef} className="fixed inset-0 z-[-1]"></div>
                    
                    <Header isHeaderVisible={isHeaderVisible} isHeaderGlass={isHeaderGlass} />
                    
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/people" element={<PeoplePage />} />
                            <Route path="/research" element={<ProjectsPage />} />
                            <Route path="/publications" element={<PublicationsPage />} />
                            <Route path="/news" element={<NewsPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route 
                                path="/admin" 
                                element={
                                    <ProtectedRoute>
                                        <AdminPage />
                                    </ProtectedRoute>
                                } 
                            />
                        </Routes>
                    </main>

                    <footer className="bg-gray-900/70 backdrop-blur-sm border-t border-gray-800 pt-16 pb-8">
                         <div className="container mx-auto px-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4">Pages</h3>
                                    <ul>
                                        <li><Link to="/people" className="text-gray-400 hover:text-white transition">People</Link></li>
                                        <li><Link to="/research" className="text-gray-400 hover:text-white transition">Research</Link></li>
                                        <li><Link to="/publications" className="text-gray-400 hover:text-white transition">Publications</Link></li>
                                        <li><Link to="/news" className="text-gray-400 hover:text-white transition">News</Link></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4">Research Areas</h3>
                                    <ul className="text-gray-400">
                                        <li>Trustworthy AI</li>
                                        <li>Neurosymbolic Learning</li>
                                        <li>Safe Reinforcement Learning</li>
                                        <li>Formal Methods</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4">Our Location</h3>
                                    <p className="text-gray-400">W365 Westgate Building</p>
                                    <p className="text-gray-400">The Pennsylvania State University</p>
                                    <p className="text-gray-400">University Park, PA 16802</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
                                    <p className="text-gray-400">
                                        <a href="mailto:verma@psu.edu" className="hover:text-white transition">verma@psu.edu</a>
                                    </p>
                                </div>
                            </div>
                            <div className="text-center text-gray-500 mt-12 border-t border-gray-800 pt-8">
                                &copy; {new Date().getFullYear()} Abhinav Verma. All Rights Reserved.
                            </div>
                        </div>
                    </footer>
                </div>
            </DataProvider>
        </AuthProvider>
    );
}

