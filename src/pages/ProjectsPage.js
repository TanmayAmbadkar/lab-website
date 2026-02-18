import React from 'react';
import { useData } from '../context/DataContext';
import SEO from '../components/SEO';

// --- Reusable Components ---
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';

// --- Projects Page Component ---
const ProjectsPage = () => {
    // Get data and loading state from the central DataContext
    const { projects = [], loading } = useData();

    if (loading) {
        return <div className="text-center py-40 text-white">Loading...</div>;
    }

    return (
        <section id="research" className="py-20 md:py-32 pt-40">
            <SEO
                title="Research Projects"
                description="Explore our cutting-edge research projects in neurosymbolic intelligence, formal methods, and program synthesis."
                keywords="Research Projects, AI Research, Neurosymbolic AI, Formal Methods, Penn State"
            />
            <div className="container mx-auto px-6">
                <SectionTitle>Core Research Areas</SectionTitle>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <Card key={project.id}>
                            <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                            <p className="text-gray-400">{project.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsPage;
