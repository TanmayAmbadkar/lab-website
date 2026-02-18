import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { HelmetProvider } from 'react-helmet-async';
import * as THREE from 'three';

// --- Import Components ---
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

// --- Import Pages ---
import HomePage from './pages/HomePage';
import PeoplePage from './pages/PeoplePage';
import ProjectsPage from './pages/ProjectsPage';
import PublicationsPage from './pages/PublicationsPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

// This new wrapper component can access the DataContext
const AppContent = () => {
    // const { loading: isDataLoading } = useData(); // Not needed anymore if no intro

    const [isNavVisible, setIsNavVisible] = useState(true);
    const [isHeaderGlass, setIsHeaderGlass] = useState(false);
    const lastScrollY = useRef(0);
    const location = useLocation();
    const backgroundRef = useRef(null);

    // --- Persistent Background Animation ---
    useEffect(() => {
        const currentMount = backgroundRef.current;
        if (!currentMount) return;

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
            if (currentMount) {
                camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            }
        };
        window.addEventListener('resize', onWindowResize);

        return () => {
            window.removeEventListener('resize', onWindowResize);
            cancelAnimationFrame(animationFrameId);
            if (currentMount && renderer.domElement.parentNode === currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsNavVisible(false);
            } else {
                setIsNavVisible(true);
            }
            setIsHeaderGlass(currentScrollY > 50);
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className="antialiased relative"
            style={{
                fontFamily: "'Inter', sans-serif",
                backgroundColor: '#0a0a0a',
                color: '#e2e8f0',
            }}
        >
            <div ref={backgroundRef} className="fixed inset-0 z-[-1]"></div>

            <Header isHeaderVisible={isNavVisible} isHeaderGlass={isHeaderGlass} />

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
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>

            <footer className="bg-gray-900/50 border-t border-gray-800 py-8">
                <div className="container mx-auto px-6 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Neurosymbolic Lab @ PennState</p>
                </div>
            </footer>
        </div>
    );
};

// The main App component now just provides the context wrappers
export default function App() {
    return (
        <HelmetProvider>
            <AuthProvider>
                <DataProvider>
                    <AppContent />
                </DataProvider>
            </AuthProvider>
        </HelmetProvider>
    );
}

