import React from 'react';
import { useData } from '../context/DataContext';
import SEO from '../components/SEO';

// --- Reusable Components ---
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';

const ProjectsPage = () => {
    const { projects = [], loading, error } = useData();

    if (loading) {
        return (
            <div className="container mx-auto px-6 py-40 text-center text-gray-300" role="status">
                Loading research areas...
            </div>
        );
    }

    return (
        <section id="research" className="py-20 md:py-28 pt-32 md:pt-40">
            <SEO
                title="Research Projects"
                description="Explore our cutting-edge research projects in neurosymbolic intelligence, formal methods, and program synthesis."
                keywords="Research Projects, AI Research, Neurosymbolic AI, Formal Methods, Penn State"
                url="/research"
            />
            <div className="container mx-auto px-6">
                <SectionTitle
                    as="h1"
                    subtitle="Combining inductive learning with symbolic reasoning and formal verification to create reliable AI."
                >
                    Core Research Areas
                </SectionTitle>

                {error && (
                    <div role="alert" className="max-w-2xl mx-auto mb-10 rounded-xl bg-red-950/60 border border-red-500/30 px-5 py-4 text-center text-sm text-red-200">
                        {error}
                    </div>
                )}

                {projects.length === 0 ? (
                    <Card className="max-w-xl mx-auto text-center text-gray-400">
                        No research areas are listed yet. Please check back soon.
                    </Card>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {projects.map((project) => (
                            <Card key={project.id} interactive className="flex flex-col">
                                <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
                                    {project.title}
                                </h2>
                                <p className="text-gray-300 leading-relaxed flex-1">
                                    {project.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectsPage;
