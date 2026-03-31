const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    iconName: {
        type: String, // String representation of icon (e.g. "Plane", "Building", "Globe")
        required: true,
    },
    features: [String],
    category: {
        type: String, // "Main", "Secondary"
        default: "Main",
    },
    image: String,
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Service', ServiceSchema);
