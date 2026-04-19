import React from 'react';
import { Award, Clock, Truck, ShieldCheck, Heart } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-20">
            {/* ── HERO ─────────────────────────────────────────── */}
            <div className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 dark:bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-600 dark:text-green-400 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-6">
                        <Heart size={14} className="fill-current" />
                        Our Story
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-6">
                        Redefining Food <br/> <span className="text-green-500">Delivery Excellence</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        At FoodDash, we believe that great food should be accessible at lightning speed, without compromising on quality or freshness. 🥗
                    </p>
                </div>
            </div>

            {/* ── MISSION ──────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 -translate-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { 
                            icon: <Clock size={32}/>, 
                            title: "Time-Sensitive", 
                            desc: "Our delivery partners are trained to beat the clock, ensuring your meal arrives hot and fresh every single time.",
                            color: "bg-blue-500"
                        },
                        { 
                            icon: <ShieldCheck size={32}/>, 
                            title: "Quality First", 
                            desc: "We only partner with top-rated restaurants that share our commitment to hygiene and premium ingredients.",
                            color: "bg-green-500"
                        },
                        { 
                            icon: <Truck size={32}/>, 
                            title: "Global Standards", 
                            desc: "Built with world-class technology to provide a seamless ordering experience across Somalia.",
                            color: "bg-purple-500"
                        }
                    ].map((m, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-800 hover:scale-105 transition-all duration-300">
                            <div className={`${m.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-current/20`}>
                                {m.icon}
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">{m.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">{m.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── STATS ────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="bg-gray-900 dark:bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-green-500/20 rounded-full blur-3xl pointer-events-none"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10 text-center">
                        {[
                            { val: "50k+", label: "Orders Delivered" },
                            { val: "200+", label: "Top Restaurants" },
                            { val: "15min", label: "Avg Delivery" },
                            { val: "4.9/5", label: "Trust Rating" }
                        ].map((s, i) => (
                            <div key={i} className="space-y-2">
                                <div className="text-4xl md:text-5xl font-black text-green-500 tracking-tighter">{s.val}</div>
                                <div className="text-gray-400 text-sm font-bold uppercase tracking-widest">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 text-center mt-10">
                <Award className="text-yellow-500 mx-auto mb-6" size={48} />
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">A Culture of Innovation</h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                    FoodDash isn't just a delivery app; it's a technology platform born out of a passion for bringing people and great food together. We're constantly refining our algorithms and expanding our network to serve you better.
                </p>
            </div>
        </div>
    );
};

export default About;
