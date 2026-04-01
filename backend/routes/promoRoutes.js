const express = require('express');
const router = express.Router();
const Promo = require('../models/Promo');

// GET all active promos
router.get('/', async (req, res) => {
    try {
        const promos = await Promo.find({ active: true }).sort({ createdAt: -1 });
        res.json(promos);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST new promo
router.post('/', async (req, res) => {
    try {
        const newPromo = new Promo({
            imageUrl: req.body.imageUrl,
            title: req.body.title
        });
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
