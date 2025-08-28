import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore'; 

// --- Import Reusable Components ---
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';

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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* --- FIX: Filter out any projects that don't have a title --- */}
                    {projects.filter(project => project.title).map((project) => (
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
