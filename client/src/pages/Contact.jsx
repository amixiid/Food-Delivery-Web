import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle2 } from 'lucide-react';

const Contact = () => {
    const [status, setStatus] = useState('idle'); // idle | sending | success

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => setStatus('success'), 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-24">
            {/* ── HEADER ────────────────────────────────────────── */}
            <div className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-6">
                        <HelpCircle size={14} />
                        Get In Touch
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-6">
                        We're Here to <br/> <span className="text-green-500">Help You Feel Full</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto font-medium">
                        Have a question about your order or our services? Our team is available 24/7 to assist you. 📞
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 -translate-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* ── CONTACT INFO ────────────────────────────────── */}
                    <div className="lg:col-span-1 space-y-6">
                        {[
                            { icon: <Mail/>, title: "Support Email", val: "support@fooddash.com", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
                            { icon: <Phone/>, title: "Phone Support", val: "+252 00 000 0000", color: "text-green-500", bg: "bg-green-50 dark:bg-green-500/10" },
                        ].map((c, i) => (
                            <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl flex items-center gap-5">
                                <div className={`${c.bg} ${c.color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner`}>
                                    {c.icon}
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1">{c.title}</div>
                                    <div className="text-gray-900 dark:text-white font-black">{c.val}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── CONTACT FORM ────────────────────────────────── */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl dark:shadow-green-500/5 border border-gray-100 dark:border-slate-800 transition-all duration-300">
                            {status === 'success' ? (
                                <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
                                    <div className="w-24 h-24 bg-green-50 dark:bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                                        <CheckCircle2 size={48} className="text-green-500" />
                                    </div>
                                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Message Received!</h2>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium mb-10">We'll get back to you within the hour. Keep your phone close! 🚀</p>
                                    <button 
                                        onClick={() => setStatus('idle')}
                                        className="btn-primary px-10 py-4 rounde-2xl font-black"
                                    >
                                        Send Another
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                                            <input 
                                                required
                                                type="text" 
                                                className="w-full px-5 py-4 rounded-2xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all dark:text-white"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                                            <input 
                                                required
                                                type="email" 
                                                className="w-full px-5 py-4 rounded-2xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all dark:text-white"
                                                placeholder="name@example.com"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Subject</label>
                                        <input 
                                            required
                                            type="text" 
                                            className="w-full px-5 py-4 rounded-2xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all dark:text-white"
                                            placeholder="Order Issue, Partnership, etc."
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Message</label>
                                        <textarea 
                                            required
                                            rows="5" 
                                            className="w-full px-5 py-4 rounded-2xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all dark:text-white resize-none"
                                            placeholder="How can we help you today?"
                                        ></textarea>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={status === 'sending'}
                                        className="w-full btn-primary h-16 rounded-[1.25rem] flex items-center justify-center gap-3 text-lg font-black shadow-lg shadow-green-500/20 disabled:opacity-70 transition-all hover:scale-[1.01] active:scale-[0.98]"
                                    >
                                        {status === 'sending' ? (
                                            <>
                                                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>Send Message <Send size={20}/></>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
