import React from 'react';
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';

// --- Publications Page Component ---
const PublicationsPage = () => {
    // Array of publication data
    const publications = [
        { title: "RetroMoE: A Mixture-of-Experts Latent Translation Framework for Single-step Retrosynthesis", authors: "Xinjie Li, Abhinav Verma", conference: "International Joint Conference on Artificial Intelligence (IJCAI), 2025." },
        // { title: "LTL-Constrained Policy Optimization with Cycle Experience Replay", authors: "Ameesh Shah, Cameron Voloshin, Chenxi Yang, Abhinav Verma, Swarat Chaudhuri, Sanjit A. Seshia", conference: "Transactions on Machine Learning Research (TMLR), 2025.", links: { ArXiv: "#" } },
        // { title: "Compositional Policy Learning in Stochastic Control Systems with Formal Guarantees", authors: "Đorđe Žikelić, Mathias Lechner, Abhinav Verma, Krishnendu Chatterjee, Thomas Henzinger", conference: "Advances in Neural Information Processing Systems (NeurIPS), 2023.", links: { ArXiv: "#" } },
        // { title: "Eventual Discounting Temporal Logic Counterfactual Experience Replay", authors: "Cameron Voloshin, Abhinav Verma, Yisong Yue", conference: "International Conference on Machine Learning (ICML), 2023.", links: { ArXiv: "#" } },
        // { title: "Neurosymbolic Reinforcement Learning with Formally Verified Exploration", authors: "Greg Anderson, Abhinav Verma, Isil Dillig, Swarat Chaudhuri", conference: "Conference on Neural Information Processing Systems (NeurIPS), 2020.", links: { ArXiv: "#", Code: "#" } },
        // { title: "Learning Differentiable Programs with Admissible Neural Heuristics", authors: "Ameesh Shah, Eric Zhan, Jennifer J Sun, Abhinav Verma, Yisong Yue, Swarat Chaudhuri", conference: "Conference on Neural Information Processing Systems (NeurIPS), 2020.", links: { ArXiv: "#", Code: "#", Video: "#" } },
        // { title: "Imitation-Projected Programmatic Reinforcement Learning", authors: "Abhinav Verma, Hoang M. Le, Yisong Yue, Swarat Chaudhuri", conference: "Conference on Neural Information Processing Systems (NeurIPS), 2019.", links: { ArXiv: "#", Code: "#", Video: "#" } },
        // { title: "Control Regularization for Reduced Variance Reinforcement Learning", authors: "Richard Cheng, Abhinav Verma, Gabor Orosz, Swarat Chaudhuri, Yisong Yue, Joel W. Burdick", conference: "International Conference on Machine Learning (ICML), 2019.", links: { ArXiv: "#", Code: "#", Video: "#" } },
        // { title: "Representing Formal Languages: A Comparison Between Finite Automata and Recurrent Neural Networks", authors: "Joshua J. Michalenko, Ameesh Shah, Abhinav Verma, Richard G. Baraniuk, Swarat Chaudhuri, Ankit B. Patel", conference: "International Conference on Learning Representations(ICLR), 2019.", links: { ArXiv: "#" } },
        // { title: "Programmatically Interpretable Reinforcement Learning", authors: "Abhinav Verma, Vijayaraghavan Murali, Rishabh Singh, Pushmeet Kohli, Swarat Chaudhuri", conference: "International Conference on Machine Learning (ICML), 2018.", links: { ArXiv: "#", Video: "#" } },
    ];

    return (
        <section id="publications" className="py-20 md:py-32 pt-40 bg-gray-900/50">
            <div className="container mx-auto px-6">
                <SectionTitle>Publications</SectionTitle>
                <div className="max-w-4xl mx-auto space-y-4">
                    {/* Map over the publications array to render each one */}
                    {publications.map((pub, index) => (
                        <Card key={index} className="!p-6">
                            <p className="text-lg text-white font-semibold mb-2">{pub.title}</p>
                            <p className="text-gray-400 mb-3">{pub.authors}</p>
                            <div className="flex flex-wrap items-center justify-between">
                                <p className="text-blue-400 font-medium">{pub.conference}</p>
                                {/* Conditionally render links if they exist */}
                                {pub.links && (
                                    <div className="flex space-x-4 mt-2 sm:mt-0">
                                        {Object.entries(pub.links).map(([name, url]) => (
                                            <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-200">[{name}]</a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PublicationsPage;
