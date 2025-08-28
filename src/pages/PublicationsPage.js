import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore'; 

// --- Import Reusable Components ---
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';

// --- Publications Page Component ---
const PublicationsPage = () => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "publications"));
                const pubList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPublications(pubList); 
            } catch (error) {
                console.error("Error fetching publications: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPublications();
    }, []); 

    if (loading) {
        return <div className="text-center py-40">Loading...</div>;
    }

    return (
        // --- FIX: Removed the bg-gray-900/50 class for consistent color ---
        <section id="publications" className="py-20 md:py-32 pt-40">
            <div className="container mx-auto px-6">
                <SectionTitle>Publications</SectionTitle>
                <div className="max-w-4xl mx-auto space-y-4">
                    {publications.map((pub) => (
                        <Card key={pub.id} className="!p-6">
                            <p className="text-lg text-white font-semibold mb-2">{pub.title}</p>
                            <p className="text-gray-400 mb-3">{pub.authors}</p>
                            <div className="flex flex-wrap items-center justify-between">
                                <p className="text-blue-400 font-medium">{pub.conference}</p>
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
