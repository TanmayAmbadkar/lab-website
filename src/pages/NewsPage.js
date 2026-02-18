import React from 'react';
import { useData } from '../context/DataContext';
import SEO from '../components/SEO';

// --- Reusable Components ---
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';

// --- News Page Component ---
const NewsPage = () => {
    // Get data and loading state from the central DataContext
    const { news = [], loading } = useData();

    // --- UPDATED: Correctly sort news items by parsing the date string ---
    const sortedNews = [...news].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Helper to format date as "Month Year"
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        // Use UTC to avoid timezone shifts since the input is YYYY-MM-DD (ISO date)
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
    };

    if (loading) {
        return <div className="text-center py-40 text-white">Loading...</div>;
    }

    return (
        <section id="news" className="py-20 md:py-32 pt-40">
            <SEO
                title="News"
                description="Latest news, achievements, and announcements from the Neurosymbolic Lab at Penn State."
                keywords="Lab News, Achievements, AI Research, Penn State"
            />
            <div className="container mx-auto px-6">
                <SectionTitle>News & Achievements</SectionTitle>
                <div className="max-w-4xl mx-auto space-y-3">
                    {sortedNews.map((item) => {
                        const newsSchema = {
                            "@context": "https://schema.org",
                            "@type": "NewsArticle",
                            "headline": item.title,
                            "datePublished": item.date,
                            "description": item.description,
                            "author": {
                                "@type": "Organization",
                                "name": "Neurosymbolic Lab @ PennState"
                            }
                        };

                        return (
                            <React.Fragment key={item.id}>
                                <script type="application/ld+json">
                                    {JSON.stringify(newsSchema)}
                                </script>
                                <Card className="!p-4">
                                    <p className="text-sm text-blue-400 mb-2">{formatDate(item.date)}</p>
                                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-gray-400">{item.description}</p>
                                </Card>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default NewsPage;
