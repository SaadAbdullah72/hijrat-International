const express = require('express');
const router = express.Router();
const Promo = require('../models/Promo');

// Increase body size limit for base64 images
router.use(express.json({ limit: '10mb' }));

// GET all active promos
router.get('/', async (req, res) => {
    try {
        const promos = await Promo.find({ active: true }).sort({ createdAt: -1 });
        res.json(promos);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST new promo (base64 image)
router.post('/', async (req, res) => {
    try {
        const { imageData, title } = req.body;
        if (!imageData || !title) {
            return res.status(400).json({ message: 'Image and title required' });
        }
        const newPromo = new Promo({ imageData, title });
        await newPromo.save();
        res.status(201).json(newPromo);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// DELETE promo
router.delete('/', async (req, res) => {
    try {
        await Promo.findByIdAndDelete(req.query.id);
        res.json({ message: 'Promo deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
