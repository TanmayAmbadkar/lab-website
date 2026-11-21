import React from 'react';
import { useData } from '../context/DataContext';

// --- Import Reusable Components ---
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';

const ContactPage = () => {
    const { people = [] } = useData();
    const pi = people.find((p) => p.role === 'pi');
    const contactEmail = pi?.email?.trim() || 'verma@psu.edu';

    return (
        <section id="contact" className="py-20 md:py-28 pt-32 md:pt-40">
            <div className="container mx-auto px-6">
                <SectionTitle
                    as="h1"
                    subtitle="Reach out regarding research collaborations, talks, or joining the lab."
                >
                    Get in Touch
                </SectionTitle>
                <Card className="max-w-4xl mx-auto !p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        {/* Left Side: Contact Info */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-bold text-white mb-2">Email</h2>
                                <a
                                    href={`mailto:${contactEmail}`}
                                    className="text-blue-400 text-lg hover:text-blue-300 underline decoration-blue-400/30 underline-offset-4 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                                >
                                    {contactEmail}
                                </a>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-white mb-2">Location</h2>
                                <address className="not-italic text-gray-300 text-base leading-relaxed">
                                    Westgate Building<br />
                                    Department of Computer Science and Engineering<br />
                                    The Pennsylvania State University<br />
                                    University Park, PA 16802
                                </address>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                                <h2 className="text-lg font-semibold text-white mb-2">Prospective Students</h2>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    We welcome inquiries from motivated PhD, MS, and undergraduate students interested in neurosymbolic AI, reinforcement learning, and formal methods. Please include your CV and a brief note on your research interests.
                                </p>
                            </div>
                        </div>

                        {/* Right Side: Google Map */}
                        <div>
                            <div className="rounded-xl overflow-hidden border border-white/15 bg-gray-900">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1531.0669620802664!2d-77.86851385123236!3d40.793617464777164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89cea89b09575805%3A0x92843a3f0c16116!2sPenn%20State%20Department%20of%20Computer%20Science%20and%20Engineering!5e0!3m2!1sen!2sus!4v1756388794843!5m2!1sen!2sus"
                                    width="100%"
                                    height="350"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Map of Westgate Building, Penn State"
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
};

export default ContactPage;
