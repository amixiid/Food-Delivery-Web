import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X, UtensilsCrossed, Moon, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDark = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDark(true);
        }
    };

    const handleLogout = () => {
        logout();
        setMobileOpen(false);
        navigate('/');
    };

    const dashboardLink = user?.role === 'admin' ? '/admin' : '/profile';

    const navLinks = (
        <>
            <Link to="/" onClick={() => setMobileOpen(false)} className="hover:text-green-500 dark:hover:text-green-400 transition-colors font-bold uppercase text-[11px] tracking-widest">Home</Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className="hover:text-green-500 dark:hover:text-green-400 transition-colors font-bold uppercase text-[11px] tracking-widest">About</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="hover:text-green-500 dark:hover:text-green-400 transition-colors font-bold uppercase text-[11px] tracking-widest">Contact</Link>
            {user && <Link to="/profile" onClick={() => setMobileOpen(false)} className="hover:text-green-500 dark:hover:text-green-400 transition-colors font-bold uppercase text-[11px] tracking-widest">My Orders</Link>}
        </>
    );

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-colors duration-200 border-b border-gray-100 dark:border-gray-800">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-extrabold text-green-500 flex items-center gap-2">
                    <div className="bg-green-500 text-white p-1.5 rounded-xl">
                        <UtensilsCrossed size={18} />
                    </div>
                    FoodDash
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8 text-gray-700 dark:text-gray-300">
                    {navLinks}
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-3">
                    <button onClick={toggleDark} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-700 dark:text-gray-300">
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <Link to="/cart" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-700 dark:text-gray-300">
                        <ShoppingCart size={22} />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                                {cartItems.length}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-2">
                            <Link to={dashboardLink} className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium text-gray-700 dark:text-gray-300">
                                <User size={18} />
                                <span className="max-w-[100px] truncate">{user.name}</span>
                            </Link>
                            <button onClick={handleLogout} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full text-red-500 transition-colors">
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2 ml-2">
                            <Link to="/login" className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors dark:text-white">Login</Link>
                            <Link to="/register" className="btn-primary">Sign Up</Link>
                        </div>
                    )}
                </div>

                {/* Mobile: Cart + Hamburger */}
                <div className="flex md:hidden items-center gap-3">
                    <button onClick={toggleDark} className="p-2 text-gray-700 dark:text-gray-300">
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <Link to="/cart" className="relative p-2 text-gray-700 dark:text-gray-300">
                        <ShoppingCart size={22} />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                                {cartItems.length}
                            </span>
                        )}
                    </Link>
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 py-6 space-y-4 shadow-lg">
                    <div className="flex flex-col gap-4 text-gray-700 dark:text-gray-300">
                        {navLinks}
                        <hr className="border-gray-200 dark:border-gray-800" />
                        {user ? (
                            <>
                                <Link to={dashboardLink} onClick={() => setMobileOpen(false)} className="flex items-center gap-2 font-medium">
                                    <User size={18} /> {user.name} ({user.role})
                                </Link>
                                <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 font-medium">
                                    <LogOut size={18} /> Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <Link to="/login" onClick={() => setMobileOpen(false)} className="w-full text-center px-4 py-3 rounded-xl border dark:border-gray-700">Login</Link>
                                <Link to="/register" onClick={() => setMobileOpen(false)} className="w-full text-center btn-primary py-3">Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
