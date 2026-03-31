const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    category: {
        type: String, // e.g. "Umrah", "Hajj", "Tour"
        required: true,
    },
    image: {
        type: String, // URL to image
        required: false,
    },
    features: [String], // ["Air Ticket", "4-Star Hotel", etc.]
    isFeatured: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Package', PackageSchema);
