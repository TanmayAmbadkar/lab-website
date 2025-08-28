import React from 'react';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';

// --- Home Page Component ---
const HomePage = () => {
    // The useEffect for the animation has been moved to App.js

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
                {/* This overlay is optional but helps with text readability */}
                <div className="absolute inset-0 bg-black opacity-50"></div>
                
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
                            Our research combines ideas from formal methods and machine learning to efficiently build models that are reliable, transparent, and secure.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
