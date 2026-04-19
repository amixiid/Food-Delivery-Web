import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Flame, Zap, Award, ShoppingBag, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const categories = [
    { label: 'All',         emoji: '🍽️' },
    { label: 'Main Course', emoji: '🍕' },
    { label: 'Somali',      emoji: '🥘' },
    { label: 'Burgers',     emoji: '🍔' },
    { label: 'Desserts',    emoji: '🍰' },
    { label: 'Drinks',      emoji: '🥤' }
];

const features = [
    { icon: <Zap  size={20} className="text-yellow-500" />, title: 'Lightning Fast', desc: 'Delivered under 30 mins' },
    { icon: <Flame size={20} className="text-red-500"   />, title: 'Hot & Fresh', desc: 'Straight from the kitchen' },
    { icon: <Award size={20} className="text-purple-500"/>, title: 'Top Quality', desc: 'Premium ingredients' },
];

/* ── Skeleton ──────────────────────────────────────────────── */
const SkeletonCard = () => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden animate-pulse shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="h-48 bg-gray-200 dark:bg-slate-700"></div>
        <div className="p-5 space-y-3">
            <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded-full w-2/3"></div>
            <div className="h-3 bg-gray-100 dark:bg-slate-600 rounded-full w-1/2"></div>
            <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded-xl w-full mt-3"></div>
        </div>
    </div>
);

/* ── Food Card ───────────────────────────────────────── */
const FoodCard = ({ item }) => {
    const { addToCart } = useCart();
    
    return (
        <div className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 flex flex-col hover:-translate-y-1">
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent dark:from-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative h-48 w-full overflow-hidden bg-gray-50 dark:bg-slate-900/50 flex items-center justify-center p-4">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 group-hover:rotate-1 transition-transform duration-500 drop-shadow-xl"
                />
                
                {/* Floating Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-gray-800 dark:text-gray-100 text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm border border-white/20">
                        {item.category}
                    </span>
                </div>
            </div>
    
            <div className="p-5 flex flex-col flex-grow relative z-10">
                <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-green-500 transition-colors">{item.name}</h3>
                    <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-1.5 py-0.5 rounded-md">
                        <Star size={12} className="fill-current" />
                        <span className="text-[10px] font-bold">4.9</span>
                    </div>
                </div>
                
                <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2 leading-relaxed mb-4 flex-grow">{item.description}</p>
                
                <div className="flex items-center justify-between mt-auto">
                    <span className="font-bold text-lg text-gray-900 dark:text-white">
                        <span className="text-green-500 mr-0.5">$</span>{item.price.toFixed(2)}
                    </span>
                    <button 
                        onClick={() => addToCart(item, 1)}
                        disabled={!item.isAvailable}
                        className="bg-gray-900 hover:bg-green-500 dark:bg-white dark:hover:bg-green-500 dark:text-gray-900 dark:hover:text-white text-white p-2.5 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 shadow-sm hover:shadow-green-500/20 group/btn"
                    >
                        <ShoppingBag size={18} className="group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                </div>
            </div>
            
            {/* Out of stock overlay */}
            {!item.isAvailable && (
                <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm z-20 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-lg tracking-wide rotate-12">Sold Out</span>
                </div>
            )}
        </div>
    );
}

/* ── Page ──────────────────────────────────────────────────── */
const Home = () => {
    const [foods, setFoods] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/foods')
            .then(({ data }) => setFoods(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const filtered = foods.filter(f => {
        const q = searchTerm.toLowerCase();
        const matchSearch = !q ||
            f.name.toLowerCase().includes(q) ||
            f.description?.toLowerCase().includes(q);
        const matchCategory = activeCategory === 'All' || f.category === activeCategory;
        return matchSearch && matchCategory;
    });

    return (
        <div className="w-full bg-slate-50 dark:bg-[#0f172a] min-h-screen transition-colors duration-300 pb-16">
            {/* ── MODERN HERO SECTION ─────────────────────────────── */}
            <section className="relative w-full overflow-hidden bg-white dark:bg-[#1e293b] shadow-sm dark:shadow-none border-b border-gray-100 dark:border-slate-800 transition-colors duration-300 rounded-b-3xl">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 dark:bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-10 pb-16 md:pt-16 md:pb-20 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-10">
                        
                        {/* Text Content */}
                        <div className="flex-1 text-center lg:text-left space-y-6">
                            <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-600 dark:text-green-400 font-semibold px-4 py-1.5 rounded-full text-xs tracking-wide shadow-sm">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                100% Free Delivery For New Users
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white tracking-tight">
                                Claim Best Offer <br className="hidden md:block" />
                                on Fast <span className="px-1 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-400 italic">Food</span>
                            </h1>

                            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                                Our job is to fill your tummy with delicious food and with fast and free delivery. Enjoy the best cuisines instantly!
                            </p>

                            {/* Search bar inside Hero to keep it modern */}
                            <div className="relative max-w-md mx-auto lg:mx-0 group mt-4">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                                <div className="relative flex items-center bg-white dark:bg-slate-800 p-1.5 rounded-xl shadow border border-gray-100 dark:border-slate-700">
                                    <Search className="ml-3 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="What do you want to eat?"
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                        className="w-full px-3 py-2 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 outline-none text-sm font-medium"
                                    />
                                    <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-lg text-sm transition-colors whitespace-nowrap hidden sm:block shadow-md shadow-green-500/20">
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Animated 3D Food Image */}
                        <div className="flex-1 relative flex justify-center items-center mt-6 lg:mt-0">
                            {/* Floating backdrop circle */}
                            <div className="absolute w-64 h-64 md:w-80 md:h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 dark:opacity-10 animate-pulse"></div>
                            
                            {/* Main Animated Food Image (User Uploaded Bugger2) */}
                            <img 
                                src="/assets/food/bugger2.png" 
                                alt="Delicious Gourmet Burger" 
                                className="relative z-10 w-full max-w-[340px] md:max-w-[420px] drop-shadow-2xl animate-slow-bounce"
                                style={{ mixBlendMode: 'multiply' }}
                            />
                            
                            {/* Accent floating objects */}
                            <div className="absolute top-4 right-4 md:right-10 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-xl dark:shadow-green-500/10 border border-gray-100 dark:border-slate-700 animate-[bounce_5s_ease-in-out_infinite] z-20 flex items-center gap-2">
                                <span className="text-xl">🔥</span>
                                <div>
                                    <div className="text-xs font-bold dark:text-white">Hot & Spicy</div>
                                    <div className="text-[10px] text-gray-400">Order Now</div>
                                </div>
                            </div>
                            
                            <div className="absolute bottom-4 left-4 md:left-10 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-xl dark:shadow-green-500/10 border border-gray-100 dark:border-slate-700 animate-[bounce_6s_ease-in-out_infinite] z-20 flex items-center gap-2">
                                <span className="text-xl">⭐️</span>
                                <div>
                                    <div className="text-xs font-bold dark:text-white">Rated 4.9/5</div>
                                    <div className="text-[10px] text-gray-400">Trust us</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FEATURES ──────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 -mt-6 relative z-20 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {features.map((f, i) => (
                        <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg shadow-gray-200/40 dark:shadow-none border border-gray-100 dark:border-slate-700 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
                            <div className="p-3 bg-gray-50 dark:bg-slate-900 rounded-xl shadow-inner border border-gray-100 dark:border-slate-700">
                                {f.icon}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">{f.title}</h4>
                                <p className="text-gray-500 dark:text-gray-400 text-[11px] font-medium">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── MENU / LISTING ──────────────────────────────────────── */}
            <div id="menu" className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <span className="text-green-500 font-bold tracking-wider uppercase text-xs mb-1 block">Our Menu</span>
                        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Explore Categories
                        </h2>
                    </div>
                    
                    <Link to="/" className="inline-flex items-center gap-1.5 text-green-500 text-sm font-bold hover:text-green-600 transition-colors group">
                        See All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Filters */}
                <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 mb-8">
                    {categories.map(c => (
                        <button
                            key={c.label}
                            onClick={() => setActiveCategory(c.label)}
                            className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                activeCategory === c.label
                                    ? 'bg-green-500 text-white shadow-md shadow-green-500/20 scale-105'
                                    : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:border-green-500/50 hover:bg-green-50 dark:hover:bg-slate-700'
                            }`}
                        >
                            <span className="text-base leading-none">
                                {c.emoji}
                            </span>
                            {c.label}
                        </button>
                    ))}
                </div>

                {/* Grid header */}
                <div className="mb-6 flex items-center gap-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {searchTerm
                            ? `Search: "${searchTerm}"`
                            : activeCategory !== 'All'
                                ? `Top ${activeCategory}`
                                : 'All Delicious Deals'}
                    </h3>
                    {!loading && (
                        <span className="bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 text-xs px-2.5 py-1 rounded-md border border-gray-200 dark:border-slate-700 font-medium">
                            {filtered.length} items
                        </span>
                    )}
                </div>

                {/* Food grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <SkeletonCard key={i} />)}
                    </div>
                ) : filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filtered.map(item => <FoodCard key={item._id} item={item} />)}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-gray-200 dark:border-slate-700 flex flex-col items-center justify-center shadow-sm">
                        <div className="text-6xl mb-4 opacity-50 filter grayscale">🍟</div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No foods found</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mb-6">We couldn't find anything matching your search. Try adjusting your filters.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                            className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2.5 rounded-lg text-sm transition-colors shadow-sm"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
