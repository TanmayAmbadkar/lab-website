import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin'); // Redirect to admin page on successful login
        } catch (err) {
            setError('Failed to log in. Please check your email and password.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center pt-24">
            <section className="w-full py-20 md:py-32">
                <div className="container mx-auto px-6">
                    <SectionTitle>Admin Login</SectionTitle>
                    <Card className="max-w-md mx-auto">
                        <form onSubmit={handleLogin}>
                            {error && <p className="bg-red-500 text-white text-center p-2 rounded-md mb-4">{error}</p>}
                            <div className="mb-4">
                                <label className="block text-white mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-white mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-full">Log In</button>
                        </form>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;
