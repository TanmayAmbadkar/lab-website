import React from 'react';
import SEO from '../components/SEO';

// --- Import Reusable Components ---
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';

// --- Contact Page Component ---
const ContactPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center pt-24">
            <SEO
                title="Contact"
                description="Get in touch with the Neurosymbolic Lab at Penn State. Find our location and contact information."
                keywords="Contact, Lab Location, Penn State, Neurosymbolic Lab"
            />
            <section id="contact" className="w-full py-20 md:py-32">
                <div className="container mx-auto px-6">
                    <SectionTitle>Get in Touch</SectionTitle>
                    <Card className="max-w-4xl mx-auto !p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                            {/* Left Side: Contact Info */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Email</h3>
                                    <a
                                        href="mailto:averma@psu.edu"
                                        className="text-blue-400 text-lg hover:text-blue-300 transition-colors duration-300"
                                    >
                                        verma@psu.edu
                                    </a>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Location</h3>
                                    <p className="text-gray-400 text-lg">
                                        Westgate Building<br />
                                        The Pennsylvania State University<br />
                                        University Park, PA 16802
                                    </p>
                                </div>
                            </div>

                            {/* Right Side: Google Map */}
                            <div>
                                <div className="rounded-2xl overflow-hidden border-2 border-gray-700">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1531.0669620802664!2d-77.86851385123236!3d40.793617464777164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89cea89b09575805%3A0x92843a3f0c16116!2sPenn%20State%20Department%20of%20Computer%20Science%20and%20Engineering!5e0!3m2!1sen!2sus!4v1756388794843!5m2!1sen!2sus"
                                        width="100%"
                                        height="350"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Google Map of Westgate Building, Penn State"
                                    ></iframe>
                                </div>
                            </div>

                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
