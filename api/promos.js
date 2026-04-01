const mongoose = require('mongoose');

// Define Schema
const PromoSchema = new mongoose.Schema({
    id: Number,
    imageUrl: String,
    title: String,
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

const Promo = mongoose.models.Promo || mongoose.model('Promo', PromoSchema);

// Connection logic
let cachedDb = null;
async function connectToDatabase() {
    if (cachedDb) return cachedDb;
    const db = await mongoose.connect(process.env.MONGODB_URI);
    cachedDb = db;
    return db;
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        await connectToDatabase();

        if (req.method === 'GET') {
            const promos = await Promo.find({ active: true }).sort({ createdAt: -1 });
            return res.status(200).json(promos);
        }

        if (req.method === 'POST') {
            const { imageUrl, title } = req.body;
            const newPromo = new Promo({ imageUrl, title });
            await newPromo.save();
            return res.status(201).json({ message: 'Promo added successfully', promo: newPromo });
        }

        if (req.method === 'DELETE') {
            const { id } = req.query;
            await Promo.findByIdAndDelete(id);
            return res.status(200).json({ message: 'Promo deleted' });
        }

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Server Error' });
    }
}
