import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

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
            const q = query(collection(db, collectionName));
            
            // --- UPDATED: Use onSnapshot for real-time updates ---
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
        // This is not perfect but works for this use case.
        // A more robust solution might track loading state for each collection.
        const initialLoadTimer = setTimeout(() => setLoading(false), 2000); // Assume initial data loads within 2 seconds

        // Cleanup function: This is crucial to prevent memory leaks.
        // It runs when the component unmounts, detaching all the listeners.
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
