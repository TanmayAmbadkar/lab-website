import React from 'react';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';

// --- Home Page Component ---
const HomePage = () => {
    const targetTitle = 'Neurosymbolic Lab @ PennState';

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

                <div className="relative z-10 px-4">
                    <div className="relative inline-block">
                        <div className="animated-glow-background"></div>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight">
                            {targetTitle}
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
                    <div className="max-w-4xl mx-auto text-left text-gray-400 space-y-6">
                        <p className="text-lg">
                            Our research is dedicated to advancing the frontier of <strong>Trustworthy Artificial Intelligence</strong>. While modern Deep Neural Networks are powerful, their "black-box" nature presents significant challenges that limit their deployment in high-stakes environments. These models are often:
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                            <li><strong>Hard to interpret</strong>, making them difficult to audit and debug.</li>
                            <li><strong>Hard to formally verify</strong>, preventing provable guarantees of their behavior.</li>
                            <li><strong>Unreliable</strong>, showing high variability based on factors like random initialization.</li>
                            <li><strong>Lacking in domain awareness</strong>, unable to incorporate commonsense knowledge.</li>
                        </ul>
                        <p>
                            The Neurosymbolic Intelligence Lab directly confronts these drawbacks. Our central mission is to build intelligent systems that are <strong>reliable, transparent, and secure</strong> by pioneering new techniques at the intersection of <strong>machine learning</strong> and <strong>formal methods</strong>. By creating deep connections between the inductive learning of neural networks and the rigorous logic of symbolic reasoning, we are forging a path toward a new generation of AI that can be truly trusted.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;

