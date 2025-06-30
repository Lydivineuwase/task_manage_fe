import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const { isAuthenticated, login } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${baseUrl}/auth/register`, { name, email, password });
            login(response.data.token);
        } catch (err) {
            setError('Error registering');
        }
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
            <div className="max-w-md w-full p-8 bg-gradient-to-br from-blue-100 to-white rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">Create Account</h2>
                <p className="text-center text-gray-500 mb-6">Sign up to get started</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Your name"
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@email.com"
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-lg shadow hover:from-blue-500 hover:to-blue-700 transition"
                    >
                        Register
                    </button>
                    {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                </form>
                <div className="mt-6 text-center text-gray-500 text-sm">
                    Already have an account? <a href="/login" className="text-blue-600 hover:underline">Sign in</a>
                </div>
                <div className="mt-4 text-center">
                    <button
                        type="button"
                        className="text-blue-500 hover:underline text-sm"
                        onClick={handleBack}
                    >
                        &larr; Back to Landing Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
