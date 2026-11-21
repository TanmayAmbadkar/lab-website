import React, { useMemo } from 'react';
import { useData } from '../context/DataContext';
import { parseFlexibleDate, formatDisplayDate } from '../utils/dates';
import SEO from '../components/SEO';

// --- Reusable Components ---
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';

const NewsPage = () => {
    const { news = [], loading, error } = useData();

    const sortedNews = useMemo(() => {
        return [...news].sort((a, b) => parseFlexibleDate(b.date) - parseFlexibleDate(a.date));
    }, [news]);

    if (loading) {
        return (
            <div className="container mx-auto px-6 py-40 text-center text-gray-300" role="status">
                Loading news...
            </div>
        );
    }

    return (
        <section id="news" className="py-20 md:py-28 pt-32 md:pt-40">
            <SEO
                title="News"
                description="Latest news, achievements, and announcements from the Neurosymbolic AI Lab at Penn State."
                keywords="Lab News, Achievements, AI Research, Penn State"
                url="/news"
            />
            <div className="container mx-auto px-6">
                <SectionTitle
                    as="h1"
                    subtitle="Announcements, awards, paper acceptances, and lab milestones."
                >
                    News &amp; Achievements
                </SectionTitle>

                {error && (
                    <div role="alert" className="max-w-2xl mx-auto mb-10 rounded-xl bg-red-950/60 border border-red-500/30 px-5 py-4 text-center text-sm text-red-200">
                        {error}
                    </div>
                )}

                {sortedNews.length === 0 ? (
                    <Card className="max-w-xl mx-auto text-center text-gray-400">
                        No news announcements yet. Please check back soon.
                    </Card>
                ) : (
                    <div className="max-w-4xl mx-auto space-y-5">
                        {sortedNews.map((item) => {
                            const formattedDate = formatDisplayDate(item.date);
                            const newsSchema = {
                                '@context': 'https://schema.org',
                                '@type': 'NewsArticle',
                                headline: item.title,
                                datePublished: typeof item.date === 'string' ? item.date : formattedDate,
                                description: item.description,
                                author: {
                                    '@type': 'Organization',
                                    name: 'The Neurosymbolic AI Lab @ Penn State',
                                },
                            };

                            return (
                                <React.Fragment key={item.id}>
                                    <script type="application/ld+json">
                                        {JSON.stringify(newsSchema)}
                                    </script>
                                    <Card interactive className="!p-6">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
                                            {formattedDate}
                                        </p>
                                        <h2 className="text-xl font-bold text-white mb-2">{item.title}</h2>
                                        <p className="text-gray-300 leading-relaxed">{item.description}</p>
                                    </Card>
                                </React.Fragment>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default NewsPage;
