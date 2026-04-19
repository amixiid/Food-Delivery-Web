import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

const OrderScreen = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await axios.get(`/api/orders/${id}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setOrder(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchOrder();
    }, [id, user]);

    if (loading) return <div className="text-center py-20 text-gray-400">Loading order details...</div>;
    if (!order) return <div className="text-center py-20">Order not found.</div>;

    const steps = [
        { label: 'Pending', icon: <Clock /> },
        { label: 'Preparing', icon: <Package /> },
        { label: 'On the way', icon: <Truck /> },
        { label: 'Delivered', icon: <CheckCircle /> }
    ];

    const currentStepIndex = steps.findIndex(s => s.label === order.status);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold">Track Order #{order._id.slice(-6)}</h1>

            {/* Tracking Progress Bar */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                <div className="relative flex justify-between">
                    {/* Line Background */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0"></div>
                    {/* Active Line */}
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-green-500 -translate-y-1/2 z-0 transition-all duration-1000"
                        style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                    ></div>

                    {steps.map((step, index) => (
                        <div key={step.label} className="relative z-10 flex flex-col items-center gap-2">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                                index <= currentStepIndex ? 'bg-green-500 text-white scale-110 shadow-lg' : 'bg-gray-100 text-gray-400'
                            }`}>
                                {step.icon}
                            </div>
                            <span className={`text-xs font-bold uppercase ${
                                index <= currentStepIndex ? 'text-green-500' : 'text-gray-400'
                            }`}>
                                {step.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Items Summary */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                    <h2 className="text-xl font-bold">Items Ordered</h2>
                    <div className="divide-y">
                        {order.orderItems.map((item) => (
                            <div key={item.menuItem} className="py-4 flex justify-between">
                                <div>
                                    <p className="font-bold">{item.name}</p>
                                    <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                </div>
                                <span className="font-bold">${(item.price * item.qty).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t pt-4 flex justify-between text-lg font-bold">
                        <span>Total Price</span>
                        <span className="text-green-500">${order.totalPrice.toFixed(2)}</span>
                    </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                    <h2 className="text-xl font-bold">Delivery Details</h2>
                    <div className="space-y-4 text-gray-600">
                        <div>
                            <p className="text-sm font-semibold uppercase text-gray-400">Address</p>
                            <p className="font-medium text-black">{order.shippingAddress.address}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase text-gray-400">Payment Status</p>
                            <p className="font-medium text-black">
                                {order.isPaid ? `Paid and confirmed` : 'Cash on Delivery / Pending'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default OrderScreen;
