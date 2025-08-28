import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const DataContext = createContext();

export function useData() {
    return useContext(DataContext);
}

export function DataProvider({ children }) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const collectionsToFetch = ['people', 'projects', 'news', 'publications'];
        const unsubscribes = []; // To hold our listener cleanup functions

        // Set initial loading state
        setLoading(true);

        collectionsToFetch.forEach(collectionName => {
            let q;
            // --- UPDATED: Add specific ordering for the 'news' collection ---
            if (collectionName === 'news') {
                // Order news by date in descending order (newest first)
                q = query(collection(db, collectionName), orderBy('date', 'desc'));
            } else {
                // For other collections, fetch without a specific order
                q = query(collection(db, collectionName));
            }
            
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                
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
