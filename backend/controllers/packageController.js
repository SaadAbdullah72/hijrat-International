const Package = require('../models/Package');

// Get all packages
exports.getPackages = async (req, res) => {
    try {
        const pkg = await Package.find().sort({ createdAt: -1 });
        if (pkg.length > 0) {
            return res.status(200).json(pkg);
        }
        
        // Mock Data Fallback
        const mockPackages = [
            { title: "15 Days Umrah Package", description: "Economy Umrah with flight and hotel.", price: "Price on Call", category: "Umrah", isFeatured: true, features: ["Flight", "3-Star Hotel"] },
            { title: "Baku Holidays Special", description: "Guided tour through the city of winds.", price: "Price on Call", category: "Tour", isFeatured: true, features: ["City Tour", "4-Star Hotel"] },
            { title: "Dubai Luxury Tour", description: "The ultimate Dubai experience.", price: "Price on Call", category: "Tour", isFeatured: true, features: ["Desert Safari", "Dhow Cruise"] }
        ];
        res.status(200).json(mockPackages);
    } catch (error) {
        // Fallback on error too
        const mockPackages = [
            { title: "15 Days Umrah Package", description: "Economy Umrah with flight and hotel.", price: "Price on Call", category: "Umrah", isFeatured: true, features: ["Flight", "3-Star Hotel"] },
            { title: "Baku Holidays Special", description: "Guided tour through the city of winds.", price: "Price on Call", category: "Tour", isFeatured: true, features: ["City Tour", "4-Star Hotel"] },
            { title: "Dubai Luxury Tour", description: "The ultimate Dubai experience.", price: "Price on Call", category: "Tour", isFeatured: true, features: ["Desert Safari", "Dhow Cruise"] }
        ];
        res.status(200).json(mockPackages);
    }
};

// Get featured packages
exports.getFeaturedPackages = async (req, res) => {
    try {
        const pkg = await Package.find({ isFeatured: true }).limit(6);
        res.status(200).json(pkg);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a package (for management, but currently for seed)
exports.createPackage = async (req, res) => {
    try {
        const pkg = await Package.create(req.body);
        res.status(201).json(pkg);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
