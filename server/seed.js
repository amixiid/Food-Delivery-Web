const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const MenuItem = require('./models/MenuItem');

dotenv.config();

// Consolidated Mapping of Local Assets (User Uploaded + AI Generated for missing ones)
const foodImages = {
    // Somali Foods
    laxoox: '/assets/food/loxood.webp',
    bariis: '/assets/food/rice2.png',
    haduud: '/assets/food/maize.jpg',
    soor: '/assets/food/maize.jpg',
    sambusa: '/assets/food/sambusa.jpg',
    cambuulo: '/assets/food/wheat.jpg',
    shaah: '/assets/food/somali-shaah.png',
    
    // Burgers & Meat
    burger: '/assets/food/bugger2.png',
    chicken: '/assets/food/chick1.jpg',
    chickenAlt: '/assets/food/chick2.jpg',
    steak: '/assets/food/halal-meat.jpg',
    salmon: '/assets/food/barbecue-meat-hummus-salad-29938571.webp',
    
    // Pizzas & Italian
    pizzaMargherita: '/assets/food/margherita-pizza.png',
    pizzaPepperoni: '/assets/food/pepperoni-pizza.png',
    pasta: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=800&q=80',
    
    // Drinks & Desserts
    mango: '/assets/food/mango.jpg',
    coffee: '/assets/food/coffee.webp',
    tiramisu: '/assets/food/tiramisu.png',
    lava_cake: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80',
    cheesecake: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80'
};

const seedData = async () => {
    try {
        require('dns').setServers(['8.8.8.8', '8.8.4.4']);
        await mongoose.connect(process.env.MONGODB_URI, { family: 4 });

        await User.deleteMany();
        await MenuItem.deleteMany();

        await User.create({ name: 'Admin', email: 'admin@fooddash.com', password: 'password123', role: 'admin' });
        
        await MenuItem.create([
            { name: 'Laxoox iyo Suqaar', description: 'Traditional Somali flatbread with meat suqaar.', price: 8.50, image: foodImages.laxoox, category: 'Somali', isAvailable: true },
            { name: 'Bariis Iskukaris', description: 'Fragrant Somali spiced rice with lamb.', price: 15.00, image: foodImages.bariis, category: 'Somali', isAvailable: true },
            { name: 'Haduud (Sorghum)', description: 'Authentic Somali Haduud grain.', price: 6.00, image: foodImages.haduud, category: 'Somali', isAvailable: true },
            { name: 'Soor iyo Maraq', description: 'Classic Somali cornmeal with stew.', price: 10.00, image: foodImages.soor, category: 'Somali', isAvailable: true },
            { name: 'Sambusa (3 pcs)', description: 'Crispy fried pastry with beef.', price: 4.50, image: foodImages.sambusa, category: 'Somali', isAvailable: true },
            { name: 'Cambuulo iyo Digir', description: 'Traditional mixed beans and adzuki.', price: 7.00, image: foodImages.cambuulo, category: 'Somali', isAvailable: true },
            { name: 'Somali Shaah', description: 'Spiced aromatic tea with milk.', price: 2.50, image: foodImages.shaah, category: 'Drinks', isAvailable: true },
            
            { name: 'Double Smash Burger', description: 'Two smashed patties with cheese.', price: 12.99, image: foodImages.burger, category: 'Burgers', isAvailable: true },
            { name: 'Spicy Chicken Burger', description: 'Crispy chicken breast with heat.', price: 10.50, image: foodImages.chicken, category: 'Burgers', isAvailable: true },
            { name: 'Crispy Chicken Strips', description: 'Hand-breaded golden chicken strips.', price: 9.00, image: foodImages.chickenAlt, category: 'Burgers', isAvailable: true },
            
            { name: 'Margherita Pizza', description: 'Classic tomato and basil.', price: 13.00, image: foodImages.pizzaMargherita, category: 'Main Course', isAvailable: true },
            { name: 'Pepperoni Pizza', description: 'Loaded with premium pepperoni.', price: 16.00, image: foodImages.pizzaPepperoni, category: 'Main Course', isAvailable: true },
            { name: 'Penne Arrabiata', description: 'Spicy tomato pasta sauce.', price: 11.50, image: foodImages.pasta, category: 'Main Course', isAvailable: true },
            { name: 'Grilled Salmon Platter', description: 'Wild-caught salmon with salad and hummus.', price: 22.00, image: foodImages.salmon, category: 'Main Course', isAvailable: true },
            { name: 'Steak Frites (Halal)', description: 'Juicy ribeye with fries.', price: 25.00, image: foodImages.steak, category: 'Main Course', isAvailable: true },
            
            { name: 'Chocolate Lava', description: 'Warm molten chocolate dessert.', price: 7.50, image: foodImages.lava_cake, category: 'Desserts', isAvailable: true },
            { name: 'Classic Tiramisu', description: 'Coffee-layered Italian delight.', price: 6.50, image: foodImages.tiramisu, category: 'Desserts', isAvailable: true },
            { name: 'Strawberry Cake', description: 'Fresh New York style cheesecake.', price: 8.00, image: foodImages.cheesecake, category: 'Desserts', isAvailable: true },
            
            { name: 'Fresh Mango Juice', description: 'Creamy natural mango nectar.', price: 5.00, image: foodImages.mango, category: 'Drinks', isAvailable: true },
            { name: 'Iced Coffee', description: 'Cold brewed coffee treat.', price: 4.50, image: foodImages.coffee, category: 'Drinks', isAvailable: true },
        ]);

        console.log('Database finalized with 100% Local stable Assets!');
        process.exit();
    } catch (error) {
        console.error('Error with seeding:', error);
        process.exit(1);
    }
};

seedData();
