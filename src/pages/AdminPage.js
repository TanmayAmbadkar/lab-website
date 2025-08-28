import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// --- Reusable UI Components ---

const Modal = ({ children, onClose, title }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-start pt-20 z-50 overflow-y-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl relative border border-gray-700">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">{title}</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
            </div>
            {children}
        </div>
    </div>
);

const DocumentForm = ({ formData, fields, onChange, onSave, onCancel, isSaving }) => (
    <div>
        {fields.map(field => (
            <div key={field} className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2 capitalize">{field.replace('.', ' ')}</label>
                <input
                    type="text"
                    name={field}
                    placeholder={`Enter ${field.replace('.', ' ')}`}
                    value={field.includes('.') ? formData[field.split('.')[0]]?.[field.split('.')[1]] || '' : formData[field] || ''}
                    onChange={onChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
            </div>
        ))}
        <div className="flex justify-end mt-8">
            <button onClick={onCancel} className="bg-gray-600 text-white px-4 py-2 rounded-full font-semibold mr-4 hover:bg-gray-500 transition">Cancel</button>
            <button onClick={onSave} disabled={isSaving} className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-500 transition disabled:bg-blue-800 disabled:cursor-not-allowed">
                {isSaving ? 'Saving...' : 'Save'}
            </button>
        </div>
    </div>
);

// --- Main Admin Page Component ---

const AdminPage = () => {
    const navigate = useNavigate();
    const [collections, setCollections] = useState({});
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [activeCollection, setActiveCollection] = useState('people');
    const [formData, setFormData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const collectionConfigs = {
        projects: { name: 'Projects', fields: ['title', 'description'] },
        people: { name: 'People', fields: ['name', 'role', 'focusArea', 'imageURL', 'email', 'bio', 'cv', 'scholar', 'linkedin', 'github'] },
        news: { name: 'News', fields: ['date', 'title', 'description'] },
        publications: { name: 'Publications', fields: ['title', 'authors', 'conference', 'links.ArXiv', 'links.Code'] },
    };

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const allData = {};
            for (const key in collectionConfigs) {
                const q = query(collection(db, key));
                const snapshot = await getDocs(q);
                allData[key] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            }
            setCollections(allData);
        } catch (error) {
            console.error("Error fetching data: ", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev };
            if (name.includes('.')) {
                const [parent, child] = name.split('.');
                newData[parent] = { ...(prev[parent] || {}), [child]: value };
            } else {
                newData[name] = value;
            }
            return newData;
        });
    };

    const handleSave = async () => {
        setIsSaving(true);
        const { id, ...dataToSave } = formData;
        try {
            if (id) {
                await updateDoc(doc(db, activeCollection, id), dataToSave);
                setCollections(prev => ({
                    ...prev,
                    [activeCollection]: prev[activeCollection].map(item =>
                        item.id === id ? { id, ...dataToSave } : item
                    )
                }));
            } else {
                const newDocRef = await addDoc(collection(db, activeCollection), dataToSave);
                setCollections(prev => ({
                    ...prev,
                    [activeCollection]: [...prev[activeCollection], { id: newDocRef.id, ...dataToSave }]
                }));
            }
            closeModal();
        } catch (error) {
            console.error("Error saving document:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await deleteDoc(doc(db, activeCollection, id));
                setCollections(prev => ({
                    ...prev,
                    [activeCollection]: prev[activeCollection].filter(item => item.id !== id)
                }));
            } catch (error) {
                console.error("Error deleting document:", error);
            }
        }
    };

    const openModal = (doc = null) => {
        setFormData(doc ? { ...doc } : {});
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({});
    };

    const handleSignOut = async () => {
        await signOut(getAuth());
        navigate('/login');
    };

    if (loading) return <div className="text-center py-40 text-white">Loading Admin Panel...</div>;

    const currentFields = collectionConfigs[activeCollection].fields;
    const currentData = collections[activeCollection] || [];

    return (
        <div className="py-20 md:py-24 pt-32 min-h-screen bg-gray-900 text-gray-200">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-white">Admin Panel</h1>
                    <button onClick={handleSignOut} className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-500 transition">Sign Out</button>
                </div>
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="w-full md:w-1/4">
                        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                            <h3 className="text-lg font-semibold text-white mb-4">Collections</h3>
                            <ul>
                                {Object.entries(collectionConfigs).map(([key, config]) => (
                                    <li key={key}>
                                        <button
                                            onClick={() => setActiveCollection(key)}
                                            className={`w-full text-left p-3 rounded-md transition-colors ${activeCollection === key ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                                        >
                                            {config.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                    <main className="w-full md:w-3/4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">{collectionConfigs[activeCollection].name}</h2>
                            <button onClick={() => openModal()} className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-500 transition">Add New</button>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg overflow-x-auto border border-gray-700">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-700 bg-gray-800">
                                        <th className="p-4 text-white font-semibold">Title / Name</th>
                                        <th className="p-4 text-white font-semibold">Details</th>
                                        <th className="p-4 text-white font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.map(item => (
                                        <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
                                            <td className="p-4 text-white font-medium">{item.title || item.name}</td>
                                            <td className="p-4 text-gray-400 text-sm truncate max-w-xs">{item.description || item.focusArea || item.authors}</td>
                                            <td className="p-4 text-right">
                                                <button onClick={() => openModal(item)} className="text-blue-400 hover:text-blue-300 mr-4 font-semibold">Edit</button>
                                                <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-400 font-semibold">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>
            {isModalOpen && (
                <Modal onClose={closeModal} title={formData.id ? 'Edit Item' : 'Add New Item'}>
                    <DocumentForm
                        formData={formData}
                        fields={currentFields}
                        onChange={handleInputChange}
                        onSave={handleSave}
                        onCancel={closeModal}
                        isSaving={isSaving}
                    />
                </Modal>
            )}
        </div>
    );
};

export default AdminPage;
