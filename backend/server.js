const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const packageRoutes = require('./routes/packageRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const contactRoutes = require('./routes/contactRoutes');
const promoRoutes = require('./routes/promoRoutes');

app.use('/api/packages', packageRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/promos', promoRoutes);

// Seeding/Health Check
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
