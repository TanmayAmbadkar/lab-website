import React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';

// --- Reusable Components ---
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';
import ProfileImage from '../components/ProfileImage';
import SocialLinks from '../components/SocialLinks';

// --- People Page Component ---
const PeoplePage = () => {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                // --- FIX: Removed the orderBy("order") to prevent errors if the field is missing ---
                const q = query(collection(db, "people"));
                const querySnapshot = await getDocs(q);
                const peopleList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPeople(peopleList);
            } catch (error) {
                console.error("Error fetching people: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPeople();
    }, []);

    const pi = people.find(p => p.role === 'pi');
    const phdStudents = people.filter(p => p.role === 'phd');
    const mastersStudents = people.filter(p => p.role === 'ms');

    if (loading) {
        return <div className="text-center py-40">Loading...</div>;
    }

    return (
        <div className="py-20 md:py-32 pt-40">
            <div className="container mx-auto px-6">
                {pi && (
                    <>
                        <SectionTitle>Principal Investigator</SectionTitle>
                        <div className="max-w-5xl mx-auto mb-20">
                            <Card className="!p-8">
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <ProfileImage 
                                        src={pi.imageURL}
                                        name={pi.name}
                                        className="w-48 h-48 rounded-full border-4 border-gray-700 flex-shrink-0 object-cover"
                                    />
                                    <div>
                                        <h3 className="text-3xl font-bold text-white">{pi.name}</h3>
                                        <p className="text-blue-400 text-lg mb-4">Hartz Family Career Development Assistant Professor</p>
                                        
                                        {/* --- UPDATED: Text-based links for the PI --- */}
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-gray-300">
                                            {pi.email && <a href={`mailto:${pi.email}`} className="hover:text-white transition-colors">Email</a>}
                                            {pi.cv && <a href={pi.cv} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Website</a>}
                                            {pi.scholar && <a href={pi.scholar} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Google Scholar</a>}
                                            {pi.linkedin && <a href={pi.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>}
                                            {pi.github && <a href={pi.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>}
                                        </div>

                                        <p className="text-gray-400">{pi.bio}</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </>
                )}

                <SectionTitle>PhD Students</SectionTitle>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-20">
                    {phdStudents.map(student => (
                        <Card key={student.id} className="text-center">
                            <ProfileImage
                                src={student.imageURL}
                                name={student.name}
                                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-700 object-cover"
                            />
                            <h3 className="text-xl font-bold text-white">{student.name}</h3>
                            <p className="text-blue-400">{student.focusArea}</p>
                            <SocialLinks links={student} />
                        </Card>
                    ))}
                </div>

                <SectionTitle>Masters Students</SectionTitle>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {mastersStudents.map((student) => (
                        <Card key={student.id} className="text-center">
                            <ProfileImage
                                src={student.imageURL}
                                name={student.name}
                                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-700 object-cover"
                            />
                            <h3 className="text-xl font-bold text-white">{student.name}</h3>
                            <p className="text-blue-400 mb-2">MS Student</p>
                            <SocialLinks links={student} />
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PeoplePage;
