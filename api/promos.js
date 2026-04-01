const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

// Promo Schema - stores base64 image data directly
const PromoSchema = new mongoose.Schema({
    imageData: { type: String, required: true },  // base64 encoded image
    title: { type: String, required: true },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

let Promo;
try {
    Promo = mongoose.model('Promo');
} catch {
    Promo = mongoose.model('Promo', PromoSchema);
}

let cachedConnection = null;
async function connectDB() {
    if (cachedConnection && mongoose.connection.readyState === 1) {
        return cachedConnection;
    }
    cachedConnection = await mongoose.connect(MONGODB_URI);
    return cachedConnection;
}

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        await connectDB();

        // Security middleware for sensitive methods
        if (req.method === 'POST' || req.method === 'DELETE') {
            const password = req.headers['x-admin-password'];
            const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'hijrat786';
            if (password !== ADMIN_PASSWORD) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
        }

        if (req.method === 'GET') {
            const promos = await Promo.find({ active: true }).sort({ createdAt: -1 });
            return res.status(200).json(promos);
        }

        if (req.method === 'POST') {
            const { imageData, title } = req.body;
            if (!imageData || !title) {
                return res.status(400).json({ message: 'Image and title are required' });
            }
            const count = await Promo.countDocuments({ active: true });
            if (count >= 10) {
                return res.status(400).json({ message: 'Maximum 10 posters allowed. Delete some first.' });
            }
            const newPromo = await Promo.create({ imageData, title });
            return res.status(201).json(newPromo);
        }

        if (req.method === 'DELETE') {
            const { id } = req.query;
            if (!id) return res.status(400).json({ message: 'id is required' });
            await Promo.findByIdAndDelete(id);
            return res.status(200).json({ message: 'Promo deleted' });
        }

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('Promo API Error:', error.message);
        return res.status(500).json({ error: error.message });
    }
};
