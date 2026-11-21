import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { extractYear, getPublicationTimestamp } from '../utils/dates';

// --- Reusable Components ---
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';

const PublicationsPage = () => {
    const { publications = [], loading, error } = useData();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState('All');

    const sortedPublications = useMemo(() => {
        return [...publications].sort((a, b) => {
            const dateDiff = getPublicationTimestamp(b) - getPublicationTimestamp(a);
            if (dateDiff !== 0) return dateDiff;
            return (a.title || '').localeCompare(b.title || '');
        });
    }, [publications]);

    const years = useMemo(() => {
        const yearSet = new Set();
        sortedPublications.forEach((pub) => {
            const yr = extractYear(pub);
            if (yr) yearSet.add(String(yr));
        });
        return ['All', ...Array.from(yearSet).sort((a, b) => Number(b) - Number(a))];
    }, [sortedPublications]);

    const filteredPublications = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        return sortedPublications.filter((pub) => {
            const pubYear = extractYear(pub);
            const matchesYear = selectedYear === 'All' || String(pubYear) === selectedYear;
            if (!matchesYear) return false;
            if (!query) return true;
            const haystack = `${pub.title || ''} ${pub.authors || ''} ${pub.conference || ''}`.toLowerCase();
            return haystack.includes(query);
        });
    }, [sortedPublications, searchQuery, selectedYear]);

    if (loading) {
        return (
            <div className="container mx-auto px-6 py-40 text-center text-gray-300" role="status">
                Loading publications...
            </div>
        );
    }

    return (
        <section id="publications" className="py-20 md:py-28 pt-32 md:pt-40">
            <div className="container mx-auto px-6">
                <SectionTitle
                    as="h1"
                    subtitle="Peer-reviewed papers and preprints from The Neurosymbolic AI Lab."
                >
                    Publications
                </SectionTitle>

                {error && (
                    <div role="alert" className="max-w-2xl mx-auto mb-10 rounded-xl bg-red-950/60 border border-red-500/30 px-5 py-4 text-center text-sm text-red-200">
                        {error}
                    </div>
                )}

                {publications.length === 0 ? (
                    <Card className="max-w-xl mx-auto text-center text-gray-400">
                        No publications are listed yet. Please check back soon.
                    </Card>
                ) : (
                    <div className="max-w-4xl mx-auto">
                        {/* Search & Year Filter Controls */}
                        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                            <div className="relative flex-1">
                                <label htmlFor="pub-search" className="sr-only">
                                    Search publications
                                </label>
                                <input
                                    id="pub-search"
                                    type="search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by title, author, or venue..."
                                    className="w-full bg-gray-900/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {years.length > 2 && (
                                <div className="flex flex-wrap gap-2" role="group" aria-label="Filter publications by year">
                                    {years.map((year) => (
                                        <button
                                            key={year}
                                            type="button"
                                            onClick={() => setSelectedYear(year)}
                                            aria-pressed={selectedYear === year}
                                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                                                selectedYear === year
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white'
                                            }`}
                                        >
                                            {year}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {filteredPublications.length === 0 ? (
                            <Card className="text-center text-gray-400">
                                No publications match &ldquo;{searchQuery}&rdquo;.
                            </Card>
                        ) : (
                            <div className="space-y-4">
                                {filteredPublications.map((pub) => {
                                    const validLinks = pub.links
                                        ? Object.entries(pub.links).filter(([, url]) => typeof url === 'string' && url.trim() !== '')
                                        : [];

                                    return (
                                        <Card key={pub.id} interactive className="!p-6">
                                            <h2 className="text-lg font-semibold text-white leading-snug mb-2">
                                                {pub.title}
                                            </h2>
                                            <p className="text-gray-300 text-sm mb-3">{pub.authors}</p>
                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <p className="text-blue-400 text-sm font-medium">{pub.conference}</p>
                                                {validLinks.length > 0 && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {validLinks.map(([name, url]) => (
                                                            <a
                                                                key={name}
                                                                href={url.trim()}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-200 hover:bg-blue-600/20 hover:border-blue-400/40 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                                                            >
                                                                {name}
                                                                <span aria-hidden="true" className="text-[10px]">&#8599;</span>
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default PublicationsPage;
