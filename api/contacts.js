const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

// Contact Schema
const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String },
    destination: { type: String },
    travelDate: { type: String },
    travelers: { type: String },
    message: { type: String },
    createdAt: { type: Date, default: Date.now }
});

let Contact;
try {
    Contact = mongoose.model('Contact');
} catch {
    Contact = mongoose.model('Contact', ContactSchema);
}

// Cache connection for serverless
let cachedConnection = null;

async function connectDB() {
    if (cachedConnection && mongoose.connection.readyState === 1) {
        return cachedConnection;
    }
    cachedConnection = await mongoose.connect(MONGODB_URI);
    return cachedConnection;
}

module.exports = async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        await connectDB();

        if (req.method === 'POST') {
            const { name, email, phone, service, message, destination, travelDate, travelers } = req.body;

            if (!name || !email || !phone) {
                return res.status(400).json({ success: false, message: 'Name, email, and phone are required.' });
            }

            const contact = await Contact.create({
                name, email, phone, service, message, destination, travelDate, travelers
            });

            // Send Email Notification
            try {
                const nodemailer = require('nodemailer');
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'saad489254@gmail.com',
                        pass: 'aqojsijkvdnwxpdw' // Removed spaces
                    }
                });

                const mailOptions = {
                    from: '"Hijrat Web Alerts" <saad489254@gmail.com>',
                    to: 'hijratinternational@gmail.com',
                    subject: `New Inquiry: ${service || 'General'} from ${name}`,
                    html: `
                        <div style="font-family: sans-serif; padding: 20px; color: #333;">
                            <h2 style="color: #1e40af;">New Customer Inquiry</h2>
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Phone:</strong> ${phone}</p>
                            <p><strong>Service:</strong> ${service || 'N/A'}</p>
                            <p><strong>Destination:</strong> ${destination || 'N/A'}</p>
                            <p><strong>Travel Date:</strong> ${travelDate || 'N/A'}</p>
                            <p><strong>Travelers:</strong> ${travelers || 'N/A'}</p>
                            ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
                        </div>
                    `
                };

                await transporter.sendMail(mailOptions);
                console.log('Email sent successfully');
            } catch (mailError) {
                console.error('Email Error:', mailError.message);
                // We still return 201 because the database save was successful
            }

            return res.status(201).json({ success: true, data: contact });
        }

        if (req.method === 'GET') {
            const contacts = await Contact.find().sort({ createdAt: -1 });
            return res.status(200).json({ success: true, data: contacts });
        }

        return res.status(405).json({ success: false, message: 'Method not allowed' });

    } catch (error) {
        console.error('API Error:', error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};
