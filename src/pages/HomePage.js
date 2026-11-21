import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';
import SEO from '../components/SEO';
import { useData } from '../context/DataContext';
import { parseFlexibleDate, formatDisplayDate } from '../utils/dates';

const HomePage = () => {
    const { news = [], projects = [] } = useData();

    const recentNews = useMemo(() => {
        return [...news]
            .sort((a, b) => parseFlexibleDate(b.date) - parseFlexibleDate(a.date))
            .slice(0, 3);
    }, [news]);

    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: 'The Neurosymbolic AI Lab @ Penn State',
        url: 'https://neurosymbolic.netlify.app',
        logo: 'https://neurosymbolic.netlify.app/logo512.png',
        description:
            'Research in Deep Learning, Formal Methods, and Program Synthesis led by Prof. Abhinav Verma at Penn State.',
        member: {
            '@type': 'Person',
            name: 'Abhinav Verma',
        },
    };

    return (
        <>
            <SEO
                title="Home"
                description="The Neurosymbolic AI Lab at Penn State focuses on building reliable, transparent, and secure intelligent systems through machine learning and formal methods."
            />
            <script type="application/ld+json">
                {JSON.stringify(organizationSchema)}
            </script>

            <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden pt-20">
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-transparent pointer-events-none" />

                <div className="relative z-10 px-6 max-w-5xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm text-blue-300 font-medium tracking-wide mb-6">
                        <span>Penn State University</span>
                        <span aria-hidden="true" className="text-gray-500">&middot;</span>
                        <span>Computer Science &amp; Engineering</span>
                    </div>

                    <div className="relative inline-block">
                        <div className="animated-glow-background" />
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
                            The Neurosymbolic AI Lab
                        </h1>
                    </div>

                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mt-6 mb-10 leading-relaxed">
                        Led by Prof. Abhinav Verma at Penn State, we build intelligent systems that are reliable, transparent, and secure by combining machine learning and formal methods.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button to="/research" variant="primary">Explore Our Research</Button>
                        <Button to="/publications" variant="secondary">View Publications</Button>
                    </div>
                </div>
            </section>

            <section id="about" className="py-20 md:py-28">
                <div className="container mx-auto px-6">
                    <SectionTitle>Research Overview</SectionTitle>
                    <Card className="max-w-4xl mx-auto">
                        <div className="text-left text-gray-300 space-y-6 leading-relaxed">
                            <p className="text-lg">
                                Our research is dedicated to advancing the frontier of{' '}
                                <strong className="text-white font-semibold">Trustworthy Artificial Intelligence</strong>. While modern Deep Neural Networks are powerful, their &ldquo;black-box&rdquo; nature presents significant challenges that limit their deployment in high-stakes environments. These models are often:
                            </p>
                            <ul className="space-y-3 pl-5 list-disc marker:text-blue-400">
                                <li>
                                    <strong className="text-white font-semibold">Hard to interpret</strong>, making them difficult to audit and debug.
                                </li>
                                <li>
                                    <strong className="text-white font-semibold">Hard to formally verify</strong>, preventing provable guarantees of their behavior.
                                </li>
                                <li>
                                    <strong className="text-white font-semibold">Unreliable</strong>, showing high variability based on factors like random initialization.
                                </li>
                                <li>
                                    <strong className="text-white font-semibold">Lacking in domain awareness</strong>, unable to incorporate commonsense knowledge.
                                </li>
                            </ul>
                            <p>
                                <strong className="text-white font-semibold">The Neurosymbolic AI Lab</strong> directly confronts these drawbacks. Our central mission is to build intelligent systems that are{' '}
                                <strong className="text-white font-semibold">reliable, transparent, and secure</strong> by pioneering new techniques at the intersection of{' '}
                                <strong className="text-white font-semibold">machine learning</strong> and{' '}
                                <strong className="text-white font-semibold">formal methods</strong>. By creating deep connections between the inductive learning of neural networks and the rigorous logic of symbolic reasoning, we are forging a path toward a new generation of AI that can be truly trusted.
                            </p>
                        </div>
                    </Card>
                </div>
            </section>

            {projects.length > 0 && (
                <section className="py-12 md:py-20">
                    <div className="container mx-auto px-6">
                        <SectionTitle subtitle="Core themes driving our work in neurosymbolic AI and formal verification.">
                            Research Pillars
                        </SectionTitle>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {projects.slice(0, 3).map((project) => (
                                <Card key={project.id} interactive className="flex flex-col">
                                    <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed flex-1">{project.description}</p>
                                </Card>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <Link
                                to="/research"
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                Explore all research areas <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {recentNews.length > 0 && (
                <section className="py-12 md:py-20">
                    <div className="container mx-auto px-6">
                        <SectionTitle subtitle="Recent paper acceptances, awards, and milestones from the lab.">
                            Latest News
                        </SectionTitle>
                        <div className="max-w-4xl mx-auto space-y-4">
                            {recentNews.map((item) => (
                                <Card key={item.id} interactive className="!p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 sm:w-36 flex-shrink-0">
                                            {formatDisplayDate(item.date)}
                                        </span>
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <Link
                                to="/news"
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                View all news &amp; achievements <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default HomePage;
