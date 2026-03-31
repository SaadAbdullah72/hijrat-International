const Contact = require('../models/Contact');

// Create a new contact inquiry
exports.createContact = async (req, res) => {
    try {
        const { name, email, phone, service, message, destination, travelDate, travelers } = req.body;
        const contact = await Contact.create({
            name,
            email,
            phone,
            service,
            message,
            destination,
            travelDate,
            travelers
        });
        res.status(201).json({ success: true, data: contact });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all inquiries (could be for an admin panel later)
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
