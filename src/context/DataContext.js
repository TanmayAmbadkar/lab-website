import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const DataContext = createContext();

export function useData() {
    return useContext(DataContext);
}

export function DataProvider({ children }) {
    const [data, setData] = useState(() => {
        const cached = localStorage.getItem('siteData');
        return cached ? JSON.parse(cached) : {};
    });

    const [loading, setLoading] = useState(() => {
        // If we have cached data, we don't need to show a loading screen
        return !localStorage.getItem('siteData');
    });

    // Save data to local storage whenever it changes
    useEffect(() => {
        if (Object.keys(data).length > 0) {
            localStorage.setItem('siteData', JSON.stringify(data));
        }
    }, [data]);

    useEffect(() => {
        const collectionsToFetch = ['people', 'projects', 'news', 'publications'];
        const unsubscribes = []; // To hold our listener cleanup functions



        collectionsToFetch.forEach(collectionName => {
            let q;
            // --- UPDATED: Add specific ordering for the 'news' and 'publications' collections ---
            if (collectionName === 'news') {
                // Order news by date in descending order (newest first)
                q = query(collection(db, collectionName), orderBy('date', 'desc'));
            } else if (collectionName === 'publications') {
                // Order publications by date in descending order (newest first)
                q = query(collection(db, collectionName), orderBy('date', 'desc'));
            } else {
                // For other collections, fetch without a specific order
                q = query(collection(db, collectionName));
            }

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const docs = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    // Convert Firestore Timestamps to strings
                    for (const key in data) {
                        if (data[key] && typeof data[key].toDate === 'function') {
                            data[key] = data[key].toDate().toISOString().split('T')[0];
                        }
                    }
                    return { id: doc.id, ...data };
                });

                // Update the state for the specific collection that changed
                setData(prevData => ({
                    ...prevData,
                    [collectionName]: docs,
                }));
            }, (error) => {
                console.error(`Error fetching ${collectionName}:`, error);
            });

            unsubscribes.push(unsubscribe);
        });

        // A simple way to determine the initial load is complete
        // We still run this to ensure loading is eventually cleared if cache was empty
        const initialLoadTimer = setTimeout(() => setLoading(false), 2000);

        // Cleanup function: This is crucial to prevent memory leaks.
        return () => {
            unsubscribes.forEach(unsub => unsub());
            clearTimeout(initialLoadTimer);
        };
    }, []); // Empty dependency array means this runs only once on mount

    const value = {
        ...data,
        loading,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}
