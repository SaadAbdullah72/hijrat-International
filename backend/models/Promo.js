const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Promo', promoSchema);
