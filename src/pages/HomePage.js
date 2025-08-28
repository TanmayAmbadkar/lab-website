import React, { useEffect, useRef } from 'react';

// --- Import Reusable Components ---
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';

// --- Home Page Component ---
const HomePage = () => {
    const mountRef = useRef(null);

    // This effect runs once when the component mounts to create the 3D background
    useEffect(() => {
        let animationFrameId;
        let resizeObserver;

        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        threeScript.async = true;
        document.body.appendChild(threeScript);

        const initAnimation = () => {
            if (!window.THREE || !mountRef.current) {
                setTimeout(initAnimation, 100);
                return;
            }
            
            while (mountRef.current.firstChild) {
                mountRef.current.removeChild(mountRef.current.firstChild);
            }

            const THREE = window.THREE;
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(60, mountRef.current.clientWidth / mountRef.current.clientHeight, 1, 1000);
            camera.position.z = 1;

            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
            mountRef.current.appendChild(renderer.domElement);

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
            
            const animate = () => {
                animationFrameId = requestAnimationFrame(animate);
                stars.rotation.x += 0.0001;
                stars.rotation.y += 0.0002;
                renderer.render(scene, camera);
            };
            animate();
            
            resizeObserver = new ResizeObserver(entries => {
                if (!entries || entries.length === 0) return;
                const { width, height } = entries[0].contentRect;
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height);
            });
            resizeObserver.observe(mountRef.current);
        };

        threeScript.onload = initAnimation;

        return () => {
            document.body.removeChild(threeScript);
            cancelAnimationFrame(animationFrameId);
            if (resizeObserver && mountRef.current) {
                resizeObserver.unobserve(mountRef.current);
            }
        };
    }, []);

    return (
        <>
            <style>
                {`
                    @keyframes rotate-glow {
                        0% { transform: translate(-50%, -50%) rotate(0deg); }
                        100% { transform: translate(-50%, -50%) rotate(360deg); }
                    }
                    .animated-glow-background {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 120%;
                        height: 120%;
                        background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(168, 85, 247, 0.2) 50%, rgba(17, 24, 39, 0) 70%);
                        filter: blur(40px);
                        animation: rotate-glow 20s linear infinite;
                        z-index: -1;
                    }
                `}
            </style>
            <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div ref={mountRef} id="hero-bg" className="absolute inset-0 z-[-1]"></div>
                
                <div className="relative z-10 px-4">
                    <div className="relative inline-block">
                        <div className="animated-glow-background"></div>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight">
                            Neurosymbolic Intelligence Lab
                        </h1>
                    </div>

                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 mt-4">
                        Led by Prof. Abhinav Verma at Penn State, we build intelligent systems that are reliable, transparent, and secure by combining machine learning and formal methods.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button to="/research" variant="primary">Explore Our Work</Button>
                        <Button to="/contact" variant="secondary">Get In Touch</Button>
                    </div>
                </div>
            </section>

            <section id="about" className="py-20 md:py-32">
                <div className="container mx-auto px-6">
                    <SectionTitle>Research Overview</SectionTitle>
                    <div className="max-w-4xl mx-auto text-center text-gray-400 space-y-6">
                        <p className="text-lg">
                            Our research combines ideas from formal methods and machine learning to efficiently build models that are reliable, transparent, and secure. This means that such a system can be expected to learn desirable behaviors with limited data, while provably maintaining some essential correctness invariant and generating models whose decisions can be understood by humans. We believe that we can achieve these goals via Neurosymbolic learning.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
