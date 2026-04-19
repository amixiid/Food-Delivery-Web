import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Package, Clock, CheckCircle, Truck } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get('/api/orders/myorders', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setOrders(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchOrders();
    }, [user]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending': return <Clock size={16} className="text-yellow-500" />;
            case 'Preparing': return <Package size={16} className="text-blue-500" />;
            case 'On the way': return <Truck size={16} className="text-purple-500" />;
            case 'Delivered': return <CheckCircle size={16} className="text-green-500" />;
            default: return null;
        }
    };

    if (loading) return <div className="text-center py-20 text-gray-400">Loading order history...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-primary text-3xl font-bold">
                    {user?.name.charAt(0)}
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{user?.name}</h1>
                    <p className="text-gray-500">{user?.email}</p>
                    <span className="inline-block bg-green-50 text-xs text-primary font-bold px-3 py-1 rounded-full mt-2 uppercase tracking-wider">
                        {user?.role}
                    </span>
                </div>
            </div>

            <section className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Package className="text-primary" />
                    Recent Orders
                </h2>

                {orders.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-400">You haven't placed any orders yet.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order._id} className="card p-6 flex flex-col md:flex-row justify-between gap-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-sm text-gray-400">#{order._id.slice(-6)}</span>
                                        <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-lg text-sm font-semibold">
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </div>
                                    </div>
                                    <p className="font-bold">{order.orderItems.map(i => i.name).join(', ')}</p>
                                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center justify-between md:flex-col md:items-end gap-2">
                                    <span className="text-xl font-bold">${order.totalPrice.toFixed(2)}</span>
                                    <button className="text-primary text-sm font-bold hover:underline">
                                        Track Order
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
        </div>
    );
};

export default Profile;
