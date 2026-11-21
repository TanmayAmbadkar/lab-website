import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider, useData } from './context/DataContext';
import * as THREE from 'three';

// --- Import Components ---
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import IntroAnimation from './components/IntroAnimation';
import Button from './components/Button';

// --- Import Pages ---
import HomePage from './pages/HomePage';
import PeoplePage from './pages/PeoplePage';
import ProjectsPage from './pages/ProjectsPage';
import PublicationsPage from './pages/PublicationsPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';

const NotFoundPage = () => (
    <section className="flex items-center justify-center py-40 px-6 text-center">
        <div className="max-w-md">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-3">404</p>
            <h1 className="text-4xl font-extrabold text-white mb-4">Page Not Found</h1>
            <p className="text-gray-400 mb-8">
                The page you are looking for doesn&apos;t exist or may have been moved.
            </p>
            <Button to="/" variant="primary">
                Return Home
            </Button>
        </div>
    </section>
);

const AppContent = () => {
    const [showIntro, setShowIntro] = useState(false);
    const [isSessionChecked, setIsSessionChecked] = useState(false);
    const { loading: isDataLoading } = useData();

    const [isNavVisible, setIsNavVisible] = useState(true);
    const [isHeaderGlass, setIsHeaderGlass] = useState(false);
    const lastScrollY = useRef(0);
    const location = useLocation();
    const backgroundRef = useRef(null);

    // --- Intro Animation Logic ---
    useEffect(() => {
        const prefersReducedMotion =
            window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const introShownInSession = sessionStorage.getItem('introShown');

        if (!introShownInSession && !prefersReducedMotion) {
            setShowIntro(true);
            sessionStorage.setItem('introShown', 'true');
        }
        setIsSessionChecked(true);
    }, []);

    // --- Persistent Background Starfield ---
    useEffect(() => {
        if (!isSessionChecked) return undefined;
        const currentMount = backgroundRef.current;
        if (!currentMount) return undefined;

        const prefersReducedMotion =
            window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const width = currentMount.clientWidth || window.innerWidth;
        const height = currentMount.clientHeight || window.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
        camera.position.z = 1;

        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
        } catch (err) {
            // Gracefully skip WebGL starfield if WebGL is unavailable
            return undefined;
        }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height);
        currentMount.appendChild(renderer.domElement);

        const starGeo = new THREE.BufferGeometry();
        const starVertices = [];
        for (let i = 0; i < 3500; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            starVertices.push(x, y, z);
        }
        starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        const starMaterial = new THREE.PointsMaterial({
            color: 0x94a3b8,
            size: 0.85,
            transparent: true,
            opacity: 0.55,
        });
        const stars = new THREE.Points(starGeo, starMaterial);
        scene.add(stars);

        let animationFrameId = null;

        const renderFrame = () => {
            renderer.render(scene, camera);
        };

        const animate = () => {
            if (document.hidden) {
                animationFrameId = null;
                return;
            }
            stars.rotation.x += 0.00008;
            stars.rotation.y += 0.00014;
            renderFrame();
            animationFrameId = requestAnimationFrame(animate);
        };

        if (prefersReducedMotion) {
            renderFrame();
        } else {
            animate();
        }

        const handleVisibilityChange = () => {
            if (prefersReducedMotion) return;
            if (!document.hidden && animationFrameId === null) {
                animate();
            }
        };

        const onWindowResize = () => {
            if (!currentMount) return;
            const nextWidth = currentMount.clientWidth || window.innerWidth;
            const nextHeight = currentMount.clientHeight || window.innerHeight;
            camera.aspect = nextWidth / nextHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(nextWidth, nextHeight);
            if (prefersReducedMotion) {
                renderFrame();
            }
        };

        window.addEventListener('resize', onWindowResize);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('resize', onWindowResize);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
            }
            starGeo.dispose();
            starMaterial.dispose();
            renderer.dispose();
            if (currentMount && renderer.domElement.parentNode === currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, [isSessionChecked]);

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsNavVisible(true);
    }, [location.pathname]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsNavVisible(false);
            } else {
                setIsNavVisible(true);
            }
            setIsHeaderGlass(currentScrollY > 40);
            lastScrollY.current = currentScrollY;
        };

        if (!showIntro) {
            window.addEventListener('scroll', handleScroll, { passive: true });
        }
        return () => window.removeEventListener('scroll', handleScroll);
    }, [showIntro]);

    const handleAnimationComplete = useCallback(() => {
        setShowIntro(false);
    }, []);

    if (!isSessionChecked) {
        return null;
    }

    return (
        <>
            {showIntro && (
                <IntroAnimation isLoaded={!isDataLoading} onAnimationComplete={handleAnimationComplete} />
            )}

            <div className="antialiased relative min-h-screen flex flex-col z-0 text-slate-200">
                {/* Visible above body's #0a0a0a background and behind all page content */}
                <div ref={backgroundRef} aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none" />

                <Header isHeaderVisible={isNavVisible} isHeaderGlass={isHeaderGlass} />

                <main className="flex-1">
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

                <footer className="bg-gray-950/70 backdrop-blur-md border-t border-white/10 py-10 mt-16">
                    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
                        <div className="text-center md:text-left">
                            <p className="font-semibold text-gray-200">The Neurosymbolic AI Lab</p>
                            <p className="text-xs text-gray-400 mt-1">
                                Department of Computer Science and Engineering &middot; The Pennsylvania State University
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
                            <Link to="/people" className="hover:text-white transition-colors">People</Link>
                            <Link to="/research" className="hover:text-white transition-colors">Research</Link>
                            <Link to="/publications" className="hover:text-white transition-colors">Publications</Link>
                            <Link to="/news" className="hover:text-white transition-colors">News</Link>
                            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
                        </div>
                        <p className="text-xs text-gray-500">
                            &copy; {new Date().getFullYear()} The Neurosymbolic AI Lab
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default function App() {
    return (
        <AuthProvider>
            <DataProvider>
                <AppContent />
            </DataProvider>
        </AuthProvider>
    );
}
