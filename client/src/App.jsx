import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import OrderScreen from './pages/OrderScreen';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
                <Navbar />
                <main className="flex-grow w-full overflow-x-hidden">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/order/:id" element={<OrderScreen />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </main>
                <footer className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 py-8 text-center text-gray-400 text-sm transition-colors duration-200">
                    <p className="font-semibold text-gray-500 dark:text-gray-300 mb-1">🥗 FoodDash</p>
                    <p>© 2026 FoodDash. All rights reserved. Built with ❤️</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
