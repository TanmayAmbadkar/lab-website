import React from 'react';
import { useData } from '../context/DataContext';
import SEO from '../components/SEO';

// --- Reusable Components ---
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';

// --- Publications Page Component ---
const PublicationsPage = () => {
    // Get data and loading state from the central DataContext
    const { publications = [], loading } = useData();

    if (loading) {
        return <div className="text-center py-40 text-white">Loading...</div>;
    }

    // Helper to format date as "Month Year"
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        // Use UTC to avoid timezone shifts since the input is YYYY-MM-DD (ISO date)
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
    };

    return (
        <section id="publications" className="py-20 md:py-32 pt-40">
            <SEO
                title="Publications"
                description="Selected research publications from the Neurosymbolic Lab at Penn State, covering topics in machine learning, formal methods, and program synthesis."
                keywords="Research Papers, Publications, Neurosymbolic AI, Formal Methods, Penn State"
            />
            <div className="container mx-auto px-6">
                <SectionTitle>Publications</SectionTitle>
                <div className="max-w-4xl mx-auto space-y-3">
                    {publications.map((pub) => {
                        const publicationSchema = {
                            "@context": "https://schema.org",
                            "@type": "ScholarlyArticle",
                            "headline": pub.title,
                            "author": pub.authors.split(',').map(name => ({ "@type": "Person", "name": name.trim() })),
                            "datePublished": pub.date,
                            "publication": pub.conference
                        };

                        return (
                            <React.Fragment key={pub.id}>
                                <script type="application/ld+json">
                                    {JSON.stringify(publicationSchema)}
                                </script>
                                <Card className="!p-4">
                                    <p className="text-lg text-white font-semibold mb-2">{pub.title}</p>
                                    <p className="text-gray-400 mb-3">{pub.authors}</p>
                                    <div className="flex flex-wrap items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <p className="text-blue-400 font-medium">{pub.conference}</p>
                                            {pub.date && <span className="text-gray-500">• {formatDate(pub.date)}</span>}
                                        </div>
                                        {pub.links && (
                                            <div className="flex space-x-4 mt-2 sm:mt-0">
                                                {Object.entries(pub.links)
                                                    .filter(([_, url]) => url && url.trim() !== '') // Filter out empty strings
                                                    .map(([name, url]) => (
                                                        <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-200">
                                                            [{name === 'ArXiv' ? 'Paper' : name}]
                                                        </a>
                                                    ))}
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PublicationsPage;
