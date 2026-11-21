import React from 'react';
import { useData } from '../context/DataContext';
import SEO from '../components/SEO';

// --- Reusable Components ---
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';
import ProfileImage from '../components/ProfileImage';
import SocialLinks from '../components/SocialLinks';

const getLastName = (name) => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    return parts[parts.length - 1] || '';
};

const sortByLastName = (list) =>
    [...list].sort((a, b) => getLastName(a.name).localeCompare(getLastName(b.name)));

const STUDENT_GROUPS = [
    { role: 'postdoc', heading: 'Postdoctoral Researchers', fallbackSubtitle: 'Postdoctoral Researcher' },
    { role: 'phd', heading: 'PhD Students', fallbackSubtitle: 'PhD Student' },
    { role: 'ms', heading: 'Masters Students', fallbackSubtitle: 'MS Student' },
    { role: 'undergrad', heading: 'Undergraduate Researchers', fallbackSubtitle: 'Undergraduate Researcher' },
    { role: 'alumni', heading: 'Alumni', fallbackSubtitle: 'Lab Alumnus' },
];

const PeoplePage = () => {
    const { people = [], loading, error } = useData();

    const pi = people.find((p) => p.role === 'pi');

    const groupedMembers = STUDENT_GROUPS.map((group) => ({
        ...group,
        members: sortByLastName(people.filter((p) => p.role === group.role)),
    })).filter((group) => group.members.length > 0);

    if (loading) {
        return (
            <div className="container mx-auto px-6 py-40 text-center text-gray-300" role="status">
                Loading lab members...
            </div>
        );
    }

    return (
        <div className="py-20 md:py-28 pt-32 md:pt-40">
            <SEO
                title="People"
                description="Meet the researchers, students, and collaborators at the Neurosymbolic AI Lab, Penn State."
                keywords="Lab Members, Researchers, PhD Students, Abhinav Verma, Penn State"
                url="/people"
            />
            <div className="container mx-auto px-6">
                <SectionTitle
                    as="h1"
                    subtitle="Researchers advancing trustworthy, neurosymbolic, and provably safe artificial intelligence."
                >
                    People
                </SectionTitle>

                {error && (
                    <div role="alert" className="max-w-2xl mx-auto mb-10 rounded-xl bg-red-950/60 border border-red-500/30 px-5 py-4 text-center text-sm text-red-200">
                        {error}
                    </div>
                )}

                {!pi && groupedMembers.length === 0 ? (
                    <Card className="max-w-xl mx-auto text-center text-gray-400">
                        No lab members are listed yet. Please check back soon.
                    </Card>
                ) : (
                    <>
                        {pi && (
                            <section aria-labelledby="pi-heading" className="mb-20">
                                <h2 id="pi-heading" className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                                    Principal Investigator
                                </h2>
                                <div className="max-w-5xl mx-auto">
                                    <Card className="!p-8">
                                        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                                            <ProfileImage
                                                src={pi.imageURL}
                                                name={pi.name}
                                                className="w-40 h-40 md:w-48 md:h-48 rounded-full border-2 border-white/15 flex-shrink-0 object-cover"
                                            />
                                            <div className="text-center md:text-left">
                                                <h3 className="text-2xl md:text-3xl font-bold text-white">{pi.name}</h3>
                                                <p className="text-blue-400 text-base md:text-lg mt-1">
                                                    {pi.title || 'Hartz Family Career Development Assistant Professor'}
                                                </p>
                                                <SocialLinks links={pi} align="left" showLabels />
                                                {pi.bio && (
                                                    <p className="text-gray-300 mt-5 leading-relaxed">{pi.bio}</p>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </section>
                        )}

                        {groupedMembers.map((group) => (
                            <section key={group.role} aria-labelledby={`group-${group.role}`} className="mb-20 last:mb-0">
                                <h2
                                    id={`group-${group.role}`}
                                    className="text-2xl md:text-3xl font-bold text-white mb-8 text-center"
                                >
                                    {group.heading}
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
                                    {group.members.map((student) => (
                                        <Card key={student.id} interactive className="text-center !p-6 flex flex-col items-center">
                                            <ProfileImage
                                                src={student.imageURL}
                                                name={student.name}
                                                className="w-28 h-28 rounded-full mx-auto mb-4 border-2 border-white/15 object-cover flex-shrink-0"
                                            />
                                            <h3 className="text-lg font-bold text-white">{student.name}</h3>
                                            <p className="text-blue-400 text-sm mt-1">
                                                {student.focusArea || group.fallbackSubtitle}
                                            </p>
                                            <div className="mt-auto pt-2">
                                                <SocialLinks links={student} />
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default PeoplePage;
