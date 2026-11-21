import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin');
        } catch (err) {
            setError('Failed to log in. Please check your email and password.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-20 md:py-28 pt-32 md:pt-40">
            <div className="container mx-auto px-6">
                <SectionTitle as="h1" subtitle="Sign in to manage lab content.">
                    Admin Login
                </SectionTitle>
                <Card className="max-w-md mx-auto">
                    <form onSubmit={handleLogin} noValidate>
                        {error && (
                            <div
                                role="alert"
                                className="bg-red-950/70 border border-red-500/40 text-red-200 text-sm text-center p-3 rounded-lg mb-5"
                            >
                                {error}
                            </div>
                        )}
                        <div className="mb-4">
                            <label htmlFor="admin-email" className="block text-sm font-medium text-gray-200 mb-2">
                                Email
                            </label>
                            <input
                                id="admin-email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-900/90 border border-white/15 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="admin-password" className="block text-sm font-medium text-gray-200 mb-2">
                                Password
                            </label>
                            <input
                                id="admin-password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-900/90 border border-white/15 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                required
                            />
                        </div>
                        <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full">
                            {isSubmitting ? 'Signing In...' : 'Log In'}
                        </Button>
                    </form>
                </Card>
            </div>
        </section>
    );
};

export default LoginPage;
