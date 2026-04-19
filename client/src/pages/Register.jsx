import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password, role);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-500/5 dark:bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-md w-full relative z-10">
                <div className="bg-white dark:bg-slate-900 shadow-2xl dark:shadow-green-500/5 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 p-8 md:p-10 transition-all duration-300">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Create Account</h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-3 font-medium">Join FoodDash today 🥘</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-2xl mb-8 text-sm animate-shake">
                            {error}
                        </div>
                    )}

                <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" size={20} />
                                <input 
                                    type="text"
                                    required
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all dark:text-white"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" size={20} />
                                <input 
                                    type="email"
                                    required
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all dark:text-white"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" size={20} />
                                <input 
                                    type="password"
                                    required
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all dark:text-white"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button type="submit" className="w-full btn-primary py-4 text-base font-bold mt-6 h-14">
                            Register Now
                        </button>
                    </form>

                    <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                        Already have an account? <Link to="/login" className="text-green-500 font-bold hover:underline ml-1 uppercase tracking-wider text-xs">Login</Link>
                    </div>
            </div>
            </div>
        </div>
    );
};

export default Register;
