import React from 'react';

// --- Import Reusable Components ---
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';

// --- Projects Page Component ---
const ProjectsPage = () => {
    return (
        <section id="research" className="py-20 md:py-32 pt-40 bg-gray-900/50">
            <div className="container mx-auto px-6">
                <SectionTitle>Core Research Areas</SectionTitle>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    {/* Research Card 1: Robust RL */}
                    <Card>
                        <h3 className="text-2xl font-bold text-white mb-3">Robust & Interactive Reinforcement Learning</h3>
                        <p className="text-gray-400">
                            We focus on making Reinforcement Learning robust to imperfect, high-level human guidance. Our work enables users to interactively balance conflicting goals in real-time, creating flexible and human-tunable AI systems without the need for retraining.
                        </p>
                    </Card>

                    {/* Research Card 2: Provably Safe AI */}
                    <Card>
                        <h3 className="text-2xl font-bold text-white mb-3">Provably Safe AI with Formal Verification</h3>
                        <p className="text-gray-400">
                            We build algorithm-agnostic "safety shields" to prevent catastrophic failures in AI systems. These shields act as runtime monitors that verify an agent's actions against safety constraints, providing safe alternatives to ensure reliable operation during learning and deployment.
                        </p>
                    </Card>

                    {/* Research Card 3: Neurosymbolic Methods */}
                    <Card>
                        <h3 className="text-2xl font-bold text-white mb-3">Neurosymbolic Methods for Trustworthy AI</h3>
                        <p className="text-gray-400">
                            Our research lies at the intersection of inductive learning and symbolic reasoning. We integrate the principles of formal methods and programming languages with deep learning to build AI systems that are not only powerful but also reliable, transparent, and secure enough for high-stakes environments.
                        </p>
                    </Card>

                </div>
            </div>
        </section>
    );
};

export default ProjectsPage;
