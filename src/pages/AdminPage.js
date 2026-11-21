import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, Timestamp } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { formatDisplayDate, toDateInputValue } from '../utils/dates';

const ROLE_OPTIONS = [
    { value: 'pi', label: 'Principal Investigator (pi)' },
    { value: 'postdoc', label: 'Postdoctoral Researcher (postdoc)' },
    { value: 'phd', label: 'PhD Student (phd)' },
    { value: 'ms', label: 'MS Student (ms)' },
    { value: 'undergrad', label: 'Undergraduate Researcher (undergrad)' },
    { value: 'alumni', label: 'Alumni (alumni)' },
];

const COLLECTION_CONFIGS = {
    people: {
        name: 'People',
        fields: [
            { name: 'name', label: 'Name', type: 'text', required: true },
            { name: 'role', label: 'Role', type: 'select', options: ROLE_OPTIONS, required: true },
            { name: 'title', label: 'Title (Optional, e.g. for PI)', type: 'text' },
            { name: 'focusArea', label: 'Focus Area', type: 'text' },
            { name: 'imageURL', label: 'Image URL', type: 'text', placeholder: '/images/name.jpg or https://...' },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'bio', label: 'Bio', type: 'textarea' },
            { name: 'cv', label: 'Website / CV URL', type: 'text' },
            { name: 'scholar', label: 'Google Scholar URL', type: 'text' },
            { name: 'linkedin', label: 'LinkedIn URL', type: 'text' },
            { name: 'github', label: 'GitHub URL', type: 'text' },
        ],
    },
    projects: {
        name: 'Research Areas',
        fields: [
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea', required: true },
        ],
    },
    news: {
        name: 'News',
        fields: [
            { name: 'date', label: 'Date', type: 'date', required: true },
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea', required: true },
        ],
    },
    publications: {
        name: 'Publications',
        fields: [
            { name: 'date', label: 'Publication Date', type: 'date' },
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'authors', label: 'Authors', type: 'text', required: true },
            { name: 'conference', label: 'Venue / Conference & Year', type: 'text', required: true },
            { name: 'links.ArXiv', label: 'Paper / ArXiv URL', type: 'url' },
            { name: 'links.Code', label: 'Code URL', type: 'url' },
            { name: 'links.PDF', label: 'PDF URL', type: 'url' },
        ],
    },
};

const getFieldValue = (formData, fieldName, fieldType) => {
    const raw = fieldName.includes('.')
        ? formData[fieldName.split('.')[0]]?.[fieldName.split('.')[1]]
        : formData[fieldName];
    if (fieldType === 'date') {
        return toDateInputValue(raw);
    }
    return raw || '';
};

const sanitizePayload = (data) => {
    const cleaned = { ...data };
    if (cleaned.links && typeof cleaned.links === 'object') {
        const nextLinks = {};
        Object.entries(cleaned.links).forEach(([k, v]) => {
            if (typeof v === 'string' && v.trim() !== '') {
                nextLinks[k] = v.trim();
            }
        });
        cleaned.links = nextLinks;
    }
    if (typeof cleaned.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(cleaned.date.trim())) {
        const dateObj = new Date(`${cleaned.date.trim()}T12:00:00Z`);
        if (!Number.isNaN(dateObj.getTime())) {
            cleaned.date = Timestamp.fromDate(dateObj);
        }
    }
    return cleaned;
};

// --- Reusable Modal Component ---
const Modal = ({ children, onClose, title }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-modal-title"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm flex justify-center items-start py-12 px-4 z-50 overflow-y-auto"
        >
            <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-2xl relative border border-white/15">
                <div className="flex justify-between items-center mb-6">
                    <h2 id="admin-modal-title" className="text-2xl font-bold text-white">
                        {title}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                        <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

const DocumentForm = ({ formData, fields, onChange, onSave, onCancel, isSaving }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave();
    };

    const inputClasses =
        'w-full bg-gray-950/90 border border-white/15 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition';

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                {fields.map((field) => {
                    const inputId = `field-${field.name.replace('.', '-')}`;
                    const value = getFieldValue(formData, field.name, field.type);

                    return (
                        <div key={field.name}>
                            <label htmlFor={inputId} className="block text-gray-200 text-sm font-medium mb-1.5">
                                {field.label}
                                {field.required && <span className="text-red-400 ml-1">*</span>}
                            </label>
                            {field.type === 'textarea' ? (
                                <textarea
                                    id={inputId}
                                    name={field.name}
                                    rows={4}
                                    required={field.required}
                                    placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                                    value={value}
                                    onChange={onChange}
                                    className={inputClasses}
                                />
                            ) : field.type === 'select' ? (
                                <select
                                    id={inputId}
                                    name={field.name}
                                    required={field.required}
                                    value={value}
                                    onChange={onChange}
                                    className={inputClasses}
                                >
                                    <option value="">Select {field.label.toLowerCase()}...</option>
                                    {field.options.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    id={inputId}
                                    type={field.type || 'text'}
                                    name={field.name}
                                    required={field.required}
                                    placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                                    value={value}
                                    onChange={onChange}
                                    className={inputClasses}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-white/10">
                <Button type="button" variant="secondary" onClick={onCancel} className="!py-2 !px-5 text-sm">
                    Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={isSaving} className="!py-2 !px-5 text-sm">
                    {isSaving ? 'Saving...' : 'Save'}
                </Button>
            </div>
        </form>
    );
};

// --- Main Admin Page Component ---
const AdminPage = () => {
    const navigate = useNavigate();
    const [collections, setCollections] = useState({});
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [activeCollection, setActiveCollection] = useState('people');
    const [formData, setFormData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setStatus(null);
        try {
            const allData = {};
            for (const key of Object.keys(COLLECTION_CONFIGS)) {
                const q = query(collection(db, key));
                const snapshot = await getDocs(q);
                allData[key] = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
            }
            setCollections(allData);
        } catch (error) {
            console.error('Error fetching data: ', error);
            setStatus({ type: 'error', message: 'Failed to load data from Firestore.' });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
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
        setStatus(null);
        const { id, ...rawData } = formData;
        const dataToSave = sanitizePayload(rawData);

        try {
            if (id) {
                await updateDoc(doc(db, activeCollection, id), dataToSave);
                setCollections((prev) => ({
                    ...prev,
                    [activeCollection]: (prev[activeCollection] || []).map((item) =>
                        item.id === id ? { id, ...dataToSave } : item
                    ),
                }));
                setStatus({ type: 'success', message: 'Item updated successfully.' });
            } else {
                const newDocRef = await addDoc(collection(db, activeCollection), dataToSave);
                setCollections((prev) => ({
                    ...prev,
                    [activeCollection]: [...(prev[activeCollection] || []), { id: newDocRef.id, ...dataToSave }],
                }));
                setStatus({ type: 'success', message: 'Item created successfully.' });
            }
            closeModal();
        } catch (error) {
            console.error('Error saving document:', error);
            setStatus({ type: 'error', message: 'Failed to save item. Please verify your permissions and try again.' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        setStatus(null);
        try {
            await deleteDoc(doc(db, activeCollection, id));
            setCollections((prev) => ({
                ...prev,
                [activeCollection]: (prev[activeCollection] || []).filter((item) => item.id !== id),
            }));
            setStatus({ type: 'success', message: 'Item deleted.' });
        } catch (error) {
            console.error('Error deleting document:', error);
            setStatus({ type: 'error', message: 'Failed to delete item.' });
        }
    };

    const openModal = (item = null) => {
        if (item) {
            const processed = { ...item };
            if (processed.date) {
                processed.date = toDateInputValue(processed.date);
            }
            setFormData(processed);
        } else {
            setFormData({});
        }
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

    if (loading) {
        return (
            <div className="text-center py-40 text-gray-300" role="status">
                Loading Admin Panel...
            </div>
        );
    }

    const currentFields = COLLECTION_CONFIGS[activeCollection].fields;
    const currentData = collections[activeCollection] || [];

    const getDetailSummary = (item) => {
        if (activeCollection === 'people') {
            return [item.role?.toUpperCase(), item.focusArea || item.title].filter(Boolean).join(' · ') || '—';
        }
        if (activeCollection === 'news') {
            return [formatDisplayDate(item.date), item.description].filter(Boolean).join(' — ') || '—';
        }
        if (activeCollection === 'publications') {
            return [formatDisplayDate(item.date), item.conference, item.authors].filter(Boolean).join(' · ') || '—';
        }
        return item.description || '—';
    };

    return (
        <div className="py-20 md:py-24 pt-32 min-h-screen text-gray-200">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">Admin Panel</h1>
                        <p className="text-sm text-gray-400 mt-1">Manage Firestore collections for The Neurosymbolic AI Lab.</p>
                    </div>
                    <Button variant="danger" onClick={handleSignOut} className="!py-2 !px-5 text-sm">
                        Sign Out
                    </Button>
                </div>

                {status && (
                    <div
                        role={status.type === 'error' ? 'alert' : 'status'}
                        className={`mb-6 rounded-xl px-4 py-3 text-sm border flex items-center justify-between ${
                            status.type === 'error'
                                ? 'bg-red-950/70 border-red-500/40 text-red-200'
                                : 'bg-emerald-950/70 border-emerald-500/40 text-emerald-200'
                        }`}
                    >
                        <span>{status.message}</span>
                        <button
                            type="button"
                            onClick={() => setStatus(null)}
                            aria-label="Dismiss message"
                            className="ml-4 text-xs underline opacity-80 hover:opacity-100"
                        >
                            Dismiss
                        </button>
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <div className="glass-effect rounded-2xl p-4">
                            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 px-3 mb-3">
                                Collections
                            </h2>
                            <ul className="space-y-1">
                                {Object.entries(COLLECTION_CONFIGS).map(([key, config]) => {
                                    const count = (collections[key] || []).length;
                                    const isActive = activeCollection === key;
                                    return (
                                        <li key={key}>
                                            <button
                                                type="button"
                                                onClick={() => setActiveCollection(key)}
                                                className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                                                    isActive
                                                        ? 'bg-blue-600 text-white'
                                                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                                }`}
                                            >
                                                <span>{config.name}</span>
                                                <span
                                                    className={`text-xs px-2 py-0.5 rounded-full ${
                                                        isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-gray-400'
                                                    }`}
                                                >
                                                    {count}
                                                </span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </aside>

                    <section className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">
                                {COLLECTION_CONFIGS[activeCollection].name}
                            </h2>
                            <Button variant="primary" onClick={() => openModal()} className="!py-2 !px-5 text-sm">
                                Add New
                            </Button>
                        </div>
                        <div className="glass-effect rounded-2xl overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 bg-white/5">
                                        <th className="p-4 text-xs uppercase tracking-wider text-gray-300 font-semibold">
                                            Title / Name
                                        </th>
                                        <th className="p-4 text-xs uppercase tracking-wider text-gray-300 font-semibold">
                                            Details
                                        </th>
                                        <th className="p-4 text-xs uppercase tracking-wider text-gray-300 font-semibold text-right">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="p-8 text-center text-gray-400 text-sm">
                                                No items in this collection yet. Click &ldquo;Add New&rdquo; to create one.
                                            </td>
                                        </tr>
                                    ) : (
                                        currentData.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors"
                                            >
                                                <td className="p-4 text-white font-medium">
                                                    {item.title || item.name || '(Untitled)'}
                                                </td>
                                                <td className="p-4 text-gray-400 text-sm truncate max-w-xs">
                                                    {getDetailSummary(item)}
                                                </td>
                                                <td className="p-4 text-right whitespace-nowrap">
                                                    <button
                                                        type="button"
                                                        onClick={() => openModal(item)}
                                                        className="text-blue-400 hover:text-blue-300 mr-4 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(item.id)}
                                                        className="text-red-400 hover:text-red-300 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
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
