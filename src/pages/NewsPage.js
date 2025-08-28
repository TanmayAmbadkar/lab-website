import React from 'react';

// --- Import Reusable Components ---
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';

// --- News Page Component ---
const NewsPage = () => {
    // --- Data for News and Achievements ---
    const newsItems = [
        {
            date: 'August 2025',
            title: 'Paper Accepted at NeurIPS 2025',
            description: 'Our paper on scalable safety shields for reinforcement learning was accepted at the Conference on Neural Information Processing Systems (NeurIPS).'
        },
        {
            date: 'April 2025',
            title: 'Paper Accepted at ICJAI 2025',
            description: 'Xinjie Li\'s paper "RetroMoE: A Mixture-of-Experts Latent Translation Framework for Single-step Retrosynthesis" accepted at the International Conference on Joint Artificial Intelligence (ICJAI).'
        },
        {
            date: 'March 2025',
            title: 'Our Lab Receives New Grant from the DoD',
            description: 'We are excited to announce new funding from the Department of Defense to continue our work on interactive, multi-objective reinforcement learning.'
        },
    ];

    return (
        <section id="news" className="py-20 md:py-32 pt-40 bg-gray-900/50">
            <div className="container mx-auto px-6">
                <SectionTitle>News & Achievements</SectionTitle>
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Map over the news items array to render each one */}
                    {newsItems.map((item, index) => (
                        <Card key={index} className="!p-6">
                            <p className="text-sm text-blue-400 mb-2">{item.date}</p>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-gray-400">{item.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewsPage;
