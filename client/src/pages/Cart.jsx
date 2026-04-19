import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Cart = () => {
    const { cartItems, removeFromCart, clearCart, cartTotal } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState('cart'); // 'cart' | 'address'
    const [address, setAddress] = useState({ address: '', city: '', postalCode: '', country: '' });
    const [placing, setPlacing] = useState(false);

    const handleCheckout = () => {
        if (!user) return navigate('/login');
        setStep('address');
    };

    const handlePlaceOrder = async () => {
        setPlacing(true);
        try {
            const shipping = 0;
            const tax = +(cartTotal * 0.05).toFixed(2);
            const total = +(cartTotal + tax).toFixed(2);

            const { data } = await axios.post('/api/orders', {
                orderItems: cartItems.map(i => ({
                    name: i.name,
                    qty: i.qty,
                    image: i.image,
                    price: i.price,
                    menuItem: i.menuItem
                })),
                shippingAddress: address,
                paymentMethod: 'Manual Payment', // Updated to Manual Payment
                itemsPrice: cartTotal,
                taxPrice: tax,
                shippingPrice: shipping,
                totalPrice: total
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            clearCart();
            navigate(`/order/${data._id}`);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to place order');
        } finally {
            setPlacing(false);
        }
    };

    if (cartItems.length === 0 && step === 'cart') {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 min-h-[70vh] flex items-center justify-center">
                <div className="text-center py-16 px-10 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl dark:shadow-green-500/5 border border-gray-100 dark:border-slate-800 max-w-lg w-full">
                    <div className="bg-green-50 dark:bg-green-500/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <ShoppingBag className="text-green-500" size={44} />
                    </div>
                    <h2 className="text-3xl font-black mb-3 text-gray-900 dark:text-white">Your cart is empty</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-10 font-medium">Add some delicious items to start your feast! 🍕</p>
                    <button onClick={() => navigate('/')} className="btn-primary px-8 py-4 text-base font-bold shadow-green-500/20">
                        Start Ordering
                    </button>
                </div>
            </div>
        );
    }

    if (step === 'address') {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 transition-colors duration-300">
            <div className="max-w-2xl mx-auto space-y-10">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Delivery Details</h1>
                    <div className="flex items-center gap-2 bg-green-50 dark:bg-green-500/10 px-4 py-2 rounded-2xl">
                        <MapPin size={18} className="text-green-500" />
                        <span className="text-sm font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">Checkout</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl dark:shadow-green-500/5 border border-gray-100 dark:border-slate-800 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { key: 'address', label: 'Street Address', placeholder: '123 Main St', full: true },
                            { key: 'city', label: 'City', placeholder: 'Your City' },
                            { key: 'postalCode', label: 'Postal Code', placeholder: '00000' },
                            { key: 'country', label: 'Country', placeholder: 'Somalia', full: true },
                        ].map(f => (
                            <div key={f.key} className={`space-y-3 ${f.full ? 'md:col-span-2' : ''}`}>
                                <label className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">{f.label}</label>
                                <input
                                    type="text"
                                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all dark:text-white"
                                    placeholder={f.placeholder}
                                    value={address[f.key]}
                                    onChange={e => setAddress(prev => ({ ...prev, [f.key]: e.target.value }))}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 space-y-4">
                        <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
                            <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Payment Method</span>
                            <span className="text-sm font-black text-green-500 bg-green-50 dark:bg-green-500/10 px-3 py-1 rounded-lg">Manual Payment</span>
                        </div>

                        <div className="space-y-3 px-2">
                            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400"><span>Subtotal</span><span className="font-bold">${cartTotal.toFixed(2)}</span></div>
                            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400"><span>Tax (5%)</span><span className="font-bold">${(cartTotal * 0.05).toFixed(2)}</span></div>
                            <div className="flex justify-between font-black text-2xl text-gray-900 dark:text-white border-t border-gray-200 dark:border-slate-700 pt-4 mt-2">
                                <span>Total</span><span>${(cartTotal * 1.05).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <button
                            onClick={handlePlaceOrder}
                            disabled={placing || !address.address || !address.city}
                            className="w-full btn-primary py-5 rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-black shadow-lg shadow-green-500/20 h-16"
                        >
                            {placing ? (
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Processing...</span>
                                </div>
                            ) : (
                                <>Confirm & Place Order <ArrowRight size={22} /></>
                            )}
                        </button>
                        <button onClick={() => setStep('cart')} className="w-full p-2 text-sm font-bold text-gray-400 dark:text-slate-500 hover:text-green-500 dark:hover:text-green-400 uppercase tracking-widest transition-colors">
                            ← Back to cart
                        </button>
                    </div>
                </div>
            </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 transition-colors duration-300">
        <div className="max-w-5xl mx-auto space-y-10">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Your Basket</h1>
                <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center gap-2">
                    <ShoppingBag className="text-green-500" size={18} />
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-300">{cartItems.length} Items</span>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
                <div className="flex-grow space-y-6">
                    {cartItems.map((item) => (
                        <div key={item.menuItem} className="group bg-white dark:bg-slate-900 flex items-center gap-6 p-5 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:shadow-green-500/5 transition-all duration-300">
                            <div className="relative overflow-hidden w-24 h-24 rounded-2xl">
                                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name} />
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            
                            <div className="flex-grow">
                                <h3 className="font-black text-lg text-gray-900 dark:text-white leading-tight mb-1">{item.name}</h3>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Quantity</span>
                                    <span className="bg-slate-50 dark:bg-slate-800 dark:text-white px-2 py-0.5 rounded-lg text-sm font-black">{item.qty}</span>
                                </div>
                            </div>
                            
                            <div className="text-right flex flex-col items-end gap-3">
                                <span className="font-black text-xl text-gray-900 dark:text-white tracking-tighter">
                                    <span className="text-green-500 text-sm mr-1">$</span>{(item.price * item.qty).toFixed(2)}
                                </span>
                                <button 
                                    onClick={() => removeFromCart(item.menuItem)} 
                                    className="bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-500 hover:text-white p-2.5 rounded-2xl transition-all duration-300"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-full lg:w-96">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl dark:shadow-green-500/5 border border-gray-100 dark:border-slate-800 sticky top-24">
                        <h2 className="font-black text-2xl mb-8 text-gray-900 dark:text-white tracking-tight">Summary</h2>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 font-medium">
                                <span>Subtotal</span>
                                <span className="text-gray-900 dark:text-white font-bold">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 font-medium">
                                <span>Delivery</span>
                                <span className="bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider">FREE</span>
                            </div>
                            
                            <div className="h-px bg-gray-100 dark:bg-slate-800 my-2"></div>
                            
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-900 dark:text-white font-black text-xl tracking-tight">Total Total</span>
                                <span className="text-green-500 font-black text-3xl tracking-tighter">${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <button 
                            onClick={handleCheckout} 
                            className="w-full btn-primary h-16 rounded-2xl flex items-center justify-center gap-3 group text-lg font-black shadow-lg shadow-green-500/20"
                        >
                            Checkout Now
                            <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-300" />
                        </button>

                        <p className="mt-6 text-center text-xs text-gray-400 dark:text-slate-500 font-medium uppercase tracking-widest leading-relaxed">
                            Secure Manual Payment <br/> on Delivery
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Cart;
