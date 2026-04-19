const mongoose = require('mongoose');
const dns = require('dns');

const connectDB = async () => {
    try {
        // Force Google DNS to fix querySrv ECONNREFUSED on some networks
        dns.setServers(['8.8.8.8', '8.8.4.4']);
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            family: 4,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
