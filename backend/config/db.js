const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, 
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('--- MONGODB CONNECTION ERROR ---');
        console.error(`Message: ${error.message}`);
        console.error('Please ensure your .env URI is correct and your IP is whitelisted in Atlas.');
        console.error('--------------------------------');
    }
};

module.exports = connectDB;
