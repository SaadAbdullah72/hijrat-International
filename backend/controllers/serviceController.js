const Service = require('../models/Service');

// Get all services
exports.getServices = async (req, res) => {
    try {
        const services = await Service.find({ isActive: true });
        if (services.length > 0) {
            return res.status(200).json(services);
        }
        
        // Mock Data Fallback
        const mockServices = [
            { title: "Hajj & Umrah", description: "Expertly organized sacred journeys.", iconName: "Send", features: ["15 Days Packages", "Umrah Classes"] },
            { title: "Air Ticketing", description: "Domestic and international tickets.", iconName: "Plane", features: ["Best Fares", "Instant Booking"] },
            { title: "Tourism", description: "Customized tour packages worldwide.", iconName: "Globe", features: ["Family Packages", "Guided Tours"] }
        ];
        res.status(200).json(mockServices);
    } catch (error) {
        const mockServices = [
            { title: "Hajj & Umrah", description: "Expertly organized sacred journeys.", iconName: "Send", features: ["15 Days Packages", "Umrah Classes"] },
            { title: "Air Ticketing", description: "Domestic and international tickets.", iconName: "Plane", features: ["Best Fares", "Instant Booking"] },
            { title: "Tourism", description: "Customized tour packages worldwide.", iconName: "Globe", features: ["Family Packages", "Guided Tours"] }
        ];
        res.status(200).json(mockServices);
    }
};

// Create a service
exports.createService = async (req, res) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json(service);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
