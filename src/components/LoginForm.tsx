import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    // const { login } = useAuth();
    const { isAuthenticated, login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle form submission
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
            const response = await axios.post(`${baseUrl}/auth/login`, { email, password });
            login(response.data.token);
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border border-blue-100">
            <div className="flex flex-col items-center mb-6">
                <div className="bg-blue-500 rounded-full p-3 mb-2 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-8 0v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
                </div>
                <h2 className="text-3xl font-bold text-blue-700">Welcome Back</h2>
                <p className="text-gray-500 mt-1 text-sm">Sign in to your account</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                <label className="block text-gray-700 mb-1 font-medium" htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                />
                </div>
                <div>
                <label className="block text-gray-700 mb-1 font-medium" htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                />
                </div>
                <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                Login
                </button>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            </form>
            <div className="mt-6 text-center">
                <span className="text-gray-500 text-sm">Don't have an account? </span>
                <a href="/register" className="text-blue-600 font-medium hover:underline text-sm">Sign up</a>
            </div>
            <div className="mt-4 text-center">
                <button
                type="button"
                className="text-blue-500 hover:underline text-sm"
                onClick={() => window.location.href = '/'}
                >
                &larr; Back to Landing Page
                </button>
            </div>
            </div>
        </div>
    );
};

export default LoginForm;
