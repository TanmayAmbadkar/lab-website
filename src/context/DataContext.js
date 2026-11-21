import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

const DataContext = createContext();

export function useData() {
    return useContext(DataContext);
}

const COLLECTIONS_TO_FETCH = ['people', 'projects', 'news', 'publications'];

export function DataProvider({ children }) {
    const [data, setData] = useState({
        people: [],
        projects: [],
        news: [],
        publications: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribes = [];
        const settled = new Set();
        let isMounted = true;

        const markSettled = (collectionName) => {
            settled.add(collectionName);
            if (isMounted && settled.size >= COLLECTIONS_TO_FETCH.length) {
                setLoading(false);
            }
        };

        setLoading(true);
        setError(null);

        COLLECTIONS_TO_FETCH.forEach((collectionName) => {
            const q = query(collection(db, collectionName));

            const unsubscribe = onSnapshot(
                q,
                (querySnapshot) => {
                    const docs = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    if (isMounted) {
                        setData((prevData) => ({
                            ...prevData,
                            [collectionName]: docs,
                        }));
                    }
                    markSettled(collectionName);
                },
                (err) => {
                    console.error(`Error fetching ${collectionName}:`, err);
                    if (isMounted) {
                        setError('Some content could not be loaded. Please try refreshing the page.');
                    }
                    markSettled(collectionName);
                }
            );

            unsubscribes.push(unsubscribe);
        });

        // Safety fallback in case Firestore is unreachable or offline
        const fallbackTimer = setTimeout(() => {
            if (isMounted) {
                setLoading(false);
            }
        }, 4000);

        return () => {
            isMounted = false;
            unsubscribes.forEach((unsub) => unsub());
            clearTimeout(fallbackTimer);
        };
    }, []);

    const value = {
        ...data,
        loading,
        error,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}
