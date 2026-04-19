import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Users, ShoppingBag, DollarSign, TrendingUp, Utensils, Plus, Edit2, Trash2, CheckCircle, Package } from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [activeTab, setActiveTab] = useState('foods'); // 'foods', 'orders', 'users'

    // Data states
    const [foods, setFoods] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);

    // Food Form
    const [isAddingFood, setIsAddingFood] = useState(false);
    const [foodForm, setFoodForm] = useState({ name: '', description: '', price: '', image: '', category: 'Main Course' });

    useEffect(() => {
        if (user && user.role === 'admin') {
            fetchStats();
            fetchFoods();
        }
    }, [user]);

    const fetchStats = async () => {
        try {
            const { data } = await axios.get('/api/admin/analytics', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setStats(data);
        } catch (error) {
            console.error('Error fetching analytics', error);
        }
    };

    const fetchFoods = async () => {
        try {
            const { data } = await axios.get('/api/foods');
            setFoods(data);
        } catch (error) { console.error(error); }
    };

    const fetchOrders = async () => {
        // Placeholder - requires an endpoint in actual implementation
        // For now we'll pretend it's connected if we mapped it, but let's assume it exists or will be added.
        try {
            const { data } = await axios.get('/api/orders/myorders', { headers: { Authorization: `Bearer ${user.token}` } });
            // Ideally should be /api/admin/orders
            setOrders(data);
        } catch (error) { console.error(error); }
    };

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('/api/admin/users', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setUsers(data);
        } catch (error) { console.error(error); }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'foods') fetchFoods();
        if (tab === 'orders') fetchOrders();
        if (tab === 'users') fetchUsers();
    };

    const handleCreateFood = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/foods', { ...foodForm, price: Number(foodForm.price) }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setIsAddingFood(false);
            setFoodForm({ name: '', description: '', price: '', image: '', category: 'Main Course' });
            fetchFoods();
            fetchStats();
        } catch (error) {
            alert('Error adding food');
        }
    };

    const handleDeleteFood = async (id) => {
        if (!window.confirm('Delete this menu item?')) return;
        try {
            await axios.delete(`/api/foods/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            fetchFoods();
            fetchStats();
        } catch (error) {
            alert('Error deleting');
        }
    };

    if (!user || user.role !== 'admin') {
        return <div className="text-center py-20 text-xl font-bold dark:text-white">Access Denied. Admins Only.</div>;
    }

    const statCards = [
        { label: 'Total Revenue', value: `$${stats?.totalRevenue?.toFixed(2) || '0.00'}`, icon: <DollarSign />, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400' },
        { label: 'Total Orders', value: stats?.orderCount ?? 0, icon: <ShoppingBag />, color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400' },
        { label: 'Menu Items', value: stats?.foodCount ?? 0, icon: <Utensils />, color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400' },
        { label: 'Total Users', value: stats?.userCount ?? 0, icon: <Users />, color: 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white">Admin Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage all operations from one place.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {statCards.map((s, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-5 hover:-translate-y-1 transition-transform">
                        <div className={`p-4 rounded-2xl ${s.color}`}>
                            {s.icon}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-400 dark:text-gray-500">{s.label}</p>
                            <p className="text-2xl font-black text-gray-900 dark:text-white">{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                {['foods', 'orders', 'users'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={`px-6 py-3 rounded-xl font-bold capitalize whitespace-nowrap transition-all ${
                            activeTab === tab 
                            ? 'bg-gray-900 text-white shadow-lg dark:bg-green-500' 
                            : 'bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700'
                        }`}
                    >
                        {tab} Management
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 overscroll-auto">
                {activeTab === 'foods' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold dark:text-white">Menu Items Catalog</h2>
                            <button 
                                onClick={() => setIsAddingFood(!isAddingFood)}
                                className="btn-primary flex items-center gap-2 text-sm px-4 py-2 rounded-lg"
                            >
                                {isAddingFood ? 'Cancel' : <><Plus size={16} /> Add Food</>}
                            </button>
                        </div>

                        {isAddingFood && (
                            <form onSubmit={handleCreateFood} className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl mb-8 space-y-4 border border-gray-200 dark:border-gray-700">
                                <h3 className="font-bold text-lg dark:text-white mb-4">New Menu Item</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input required type="text" placeholder="Item Name" className="p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500" value={foodForm.name} onChange={e => setFoodForm({...foodForm, name: e.target.value})} />
                                    <input required type="number" placeholder="Price ($)" step="0.01" className="p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500" value={foodForm.price} onChange={e => setFoodForm({...foodForm, price: e.target.value})} />
                                    <input required type="text" placeholder="Image URL" className="p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500" value={foodForm.image} onChange={e => setFoodForm({...foodForm, image: e.target.value})} />
                                    <select className="p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500" value={foodForm.category} onChange={e => setFoodForm({...foodForm, category: e.target.value})}>
                                        <option>Main Course</option>
                                        <option>Burgers</option>
                                        <option>Desserts</option>
                                        <option>Drinks</option>
                                    </select>
                                    <textarea required placeholder="Description..." className="p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 md:col-span-2" rows="3" value={foodForm.description} onChange={e => setFoodForm({...foodForm, description: e.target.value})}></textarea>
                                </div>
                                <button type="submit" className="btn-primary w-full py-3 rounded-xl">Save Item</button>
                            </form>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {foods.map(f => (
                                <div key={f._id} className="flex gap-4 p-4 border border-gray-100 dark:border-gray-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <img src={f.image} alt={f.name} className="w-20 h-20 rounded-xl object-cover" />
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-gray-900 dark:text-white truncate pr-2">{f.name}</h3>
                                        <p className="text-green-500 font-bold">${f.price.toFixed(2)}</p>
                                        <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">{f.category}</span>
                                    </div>
                                    <button onClick={() => handleDeleteFood(f._id)} className="text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg self-start">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        {foods.length === 0 && <div className="text-center text-gray-400 py-10">No foods added yet.</div>}
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-xs uppercase text-gray-500 bg-gray-50 dark:bg-gray-900/50 dark:text-gray-400">
                                <tr>
                                    <th className="px-6 py-4 rounded-tl-xl">ID</th>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4 rounded-tr-xl">Role</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {users.map(u => (
                                    <tr key={u._id} className="dark:text-gray-300">
                                        <td className="px-6 py-4 font-mono text-xs">{u._id.slice(-6)}</td>
                                        <td className="px-6 py-4 font-medium">{u.name}</td>
                                        <td className="px-6 py-4">{u.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${u.role === 'admin' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-700'}`}>
                                                {u.role}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="text-center py-20 text-gray-400">
                        <Package size={48} className="mx-auto mb-4 opacity-20" />
                        <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">Order Management</h3>
                        <p className="text-sm">Connect admin orders API endpoint to view global orders.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
