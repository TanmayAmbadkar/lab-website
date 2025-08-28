import React from 'react';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';

// --- Home Page Component ---
const HomePage = () => {
    // The useEffect for the animation has been removed as it's now handled globally in App.js

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
                {/* The global background from App.js will show through here */}
                
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
                    <div className="max-w-4xl mx-auto text-left text-gray-400 space-y-6">
                        <p className="text-lg">
                            Our research is dedicated to advancing the frontier of <strong>Trustworthy Artificial Intelligence</strong>. While modern machine learning, particularly deep learning, has achieved remarkable success, its "black-box" nature often makes it unreliable, difficult to interpret, and hard to formally verify. The Neurosymbolic Intelligence Lab directly confronts these challenges by pioneering new algorithmic techniques at the intersection of <strong>machine learning</strong> and <strong>formal methods</strong>.
                        </p>
                        <p>
                            Our central mission is to build intelligent systems that are <strong>reliable, transparent, and secure</strong>. We achieve this by creating deep connections between the inductive learning of neural networks and the rigorous, logical frameworks of symbolic reasoning. This neurosymbolic approach allows us to develop models that can learn complex behaviors from limited data while provably maintaining critical safety guarantees and generating decisions that can be understood by humans.
                        </p>
                        <p>Our work is focused on several key pillars:</p>
                        <ul className="list-disc list-inside space-y-4 pl-4">
                            <li>
                                <strong>Making AI Robust to Human Interaction:</strong> Our research focuses on creating frameworks that allow users to guide AI with high-level, and even imperfect, instructions. We are building systems that can autonomously refine and correct these instructions during training, making powerful AI more accessible and collaborative.
                            </li>
                            <li>
                                <strong>Building Scalable Safety Shields:</strong> We develop algorithm-agnostic "safety shields" that act as runtime monitors. By learning to predict the consequences of an agent's actions, these shields can intervene to provide safe alternatives, ensuring that our systems operate safely while still learning effectively.
                            </li>
                            <li>
                                <strong>Enabling User-Driven Trade-offs:</strong> We train single AI policies that can generate a wide spectrum of optimal behaviors. This allows a human operator to interactively tune the agent's priorities on the fly, adapting its strategy to changing requirements without any need for retraining.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
