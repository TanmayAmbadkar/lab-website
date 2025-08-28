import React from 'react';

// --- Import Reusable Components ---
// These files should be located in your src/components/ folder
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';
import ProfileImage from '../components/ProfileImage';

// --- People Page Component ---
const PeoplePage = () => {
    // --- Data for Lab Members ---
    const phdStudents = [
        { name: 'Tanmay Ambadkar', img: 'tanmay-ambadkar', focusArea: 'Specification-Guided Reinforcement Learning' },
        { name: 'Xinjie Li', img: 'xinjie-li', focusArea: 'Computer Vision' },
        { name: 'Hayden Moore', img: 'hayden-moore', focusArea: 'LLMs' },
        { name: 'Yu-Wei Su', img: 'yu-wei-su', focusArea: 'Trustworthy AI' },
        { name: 'Asfahan Shah', img: 'asfahan-shah', focusArea: 'Interactive RL' },
    ];

    const mastersStudents = [
        { name: 'Darshan Chudiwal', title: 'MS Student', expertise: 'Safe Reinforcement Learning', img: 'darshan-chudiwal' },
        { name: 'Student Name', title: 'MS Student', expertise: 'Research Focus', img: 'placeholder-2' },
        { name: 'Student Name', title: 'MS Student', expertise: 'Research Focus', img: 'placeholder-3' },
        { name: 'Student Name', title: 'MS Student', expertise: 'Research Focus', img: 'placeholder-4' },
        { name: 'Student Name', title: 'MS Student', expertise: 'Research Focus', img: 'placeholder-5' },
    ];

    return (
        <div className="py-20 md:py-32 pt-40">
            <div className="container mx-auto px-6">
                
                {/* Section 1: Principal Investigator */}
                <SectionTitle>Principal Investigator</SectionTitle>
                <div className="max-w-5xl mx-auto mb-20">
                    <Card className="!p-8">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <ProfileImage 
                                src="/images/abhinav-verma.jpg"
                                name="Abhinav Verma"
                                className="w-48 h-48 rounded-full border-4 border-gray-700 flex-shrink-0 object-cover"
                            />
                            <div>
                                <h3 className="text-3xl font-bold text-white">Abhinav Verma</h3>
                                <p className="text-blue-400 text-lg mb-4">Hartz Family Career Development Assistant Professor</p>
                                <div className="flex space-x-4 mb-4 text-gray-300">
                                    <a href="#" className="hover:text-white">Email</a>
                                    <span>&bull;</span>
                                    <a href="#" className="hover:text-white">Google Scholar</a>
                                    <span>&bull;</span>
                                    <a href="#" className="hover:text-white">CV</a>
                                </div>
                                <p className="text-gray-400">
                                    My research lies at the intersection of machine learning and formal methods, with a focus on building intelligent systems that are reliable, transparent, and secure. This work builds connections between the symbolic reasoning and inductive learning paradigms of artificial intelligence.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Section 2: PhD Students */}
                <SectionTitle>PhD Students</SectionTitle>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-20">
                    {phdStudents.map(student => (
                        <Card key={student.name} className="text-center">
                            <ProfileImage
                                src={`/images/${student.img}.jpg`}
                                name={student.name}
                                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-700 object-cover"
                            />
                            <h3 className="text-xl font-bold text-white">{student.name}</h3>
                            <p className="text-blue-400">{student.focusArea}</p>
                        </Card>
                    ))}
                </div>

                {/* Section 3: Masters Students */}
                <SectionTitle>Masters Students</SectionTitle>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {mastersStudents.map((student, index) => (
                        <Card key={index} className="text-center">
                            <ProfileImage
                                src={`/images/${student.img}.jpg`}
                                name={student.name}
                                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-700 object-cover"
                            />
                            <h3 className="text-xl font-bold text-white">{student.name}</h3>
                            <p className="text-blue-400 mb-2">{student.title}</p>
                            <p className="text-gray-400 text-sm">{student.expertise}</p>
                        </Card>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default PeoplePage;
