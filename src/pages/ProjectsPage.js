import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore'; 

// --- Import Reusable Components ---
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';

// --- Accordion Item Component for Mobile ---
const AccordionItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-700">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left p-4"
            >
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
            </button>
            {isOpen && (
                <div className="p-4 bg-gray-900/50">
                    <p className="text-gray-400">{children}</p>
                </div>
            )}
        </div>
    );
};


// --- Projects Page Component ---
const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "projects"));
                const projectsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProjects(projectsList); 
            } catch (error) {
                console.error("Error fetching projects: ", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchProjects();
    }, []); 

    if (loading) {
        return <div className="text-center py-40">Loading...</div>;
    }

    return (
        <section id="research" className="py-20 md:py-32 pt-40">
            <div className="container mx-auto px-6">
                <SectionTitle>Core Research Areas</SectionTitle>
                
                {/* Desktop View: 3-Column Cards (hidden on mobile) */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.filter(project => project.title).map((project) => (
                        <Card key={project.id}>
                            <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                            <p className="text-gray-400">{project.description}</p>
                        </Card>
                    ))}
                </div>

                {/* Mobile View: Accordion (hidden on desktop) */}
                <div className="md:hidden">
                    <div className="border border-gray-700 rounded-lg overflow-hidden">
                        {projects.filter(project => project.title).map((project) => (
                            <AccordionItem key={project.id} title={project.title}>
                                {project.description}
                            </AccordionItem>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ProjectsPage;
