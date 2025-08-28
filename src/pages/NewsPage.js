import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore'; 

// --- Import Reusable Components ---
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';

// --- News Page Component ---
const NewsPage = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "news"));
                const newsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setNewsItems(newsList); 
            } catch (error) {
                console.error("Error fetching news: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []); 

    if (loading) {
        return <div className="text-center py-40">Loading...</div>;
    }

    return (
        // --- FIX: Removed the bg-gray-900/50 class for consistent color ---
        <section id="news" className="py-20 md:py-32 pt-40">
            <div className="container mx-auto px-6">
                <SectionTitle>News & Achievements</SectionTitle>
                <div className="max-w-4xl mx-auto space-y-6">
                    {newsItems.map((item) => (
                        <Card key={item.id} className="!p-6">
                            <p className="text-sm text-blue-400 mb-2">{item.date}</p>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-gray-400">{item.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewsPage;
