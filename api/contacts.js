const nodemailer = require('nodemailer');
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
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });

                const mailOptions = {
                    from: `"Hijrat Web Alerts" <${process.env.EMAIL_USER}>`,
                    to: 'hijratinternational@gmail.com',
                    subject: `New Inquiry: ${service || 'General'} | ${name}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; padding: 30px; border: 1px solid #e2e8f0; border-radius: 15px; max-width: 600px; color: #1e293b;">
                            <h2 style="color: #1e40af; border-bottom: 2px solid #f1f5f9; padding-bottom: 15px;">New Inquiry Received</h2>
                            <div style="margin-top: 20px;">
                                <p style="margin: 10px 0;"><strong>Customer Name:</strong> ${name}</p>
                                <p style="margin: 10px 0;"><strong>Phone Number:</strong> ${phone}</p>
                                <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
                                <p style="margin: 10px 0;"><strong>Service Requested:</strong> <span style="background: #eff6ff; color: #1e40af; padding: 2px 8px; border-radius: 4px;">${service || 'N/A'}</span></p>
                                <p style="margin: 10px 0;"><strong>Destination:</strong> ${destination || 'N/A'}</p>
                                <p style="margin: 10px 0;"><strong>Travel Date:</strong> ${travelDate || 'N/A'}</p>
                                <p style="margin: 10px 0;"><strong>N°. of Travelers:</strong> ${travelers || 'N/A'}</p>
                                ${message ? `<div style="margin-top: 20px; padding: 15px; background: #f8fafc; border-radius: 8px;"><strong>Message:</strong><br/>${message}</div>` : ''}
                            </div>
                            <div style="margin-top: 30px; font-size: 0.8rem; color: #94a3b8; text-align: center;">
                                This inquiry was submitted via Hijrat International Travels Website.
                            </div>
                        </div>
                    `
                };

                await transporter.sendMail(mailOptions);
                return res.status(201).json({ success: true, message: 'Email sent successfully!', data: contact });
            } catch (mailError) {
                console.error('Nodemailer Error Details:', mailError);
                return res.status(201).json({ 
                    success: true, 
                    emailError: mailError.message, 
                    data: contact, 
                    debug: 'Email failed but database saved' 
                });
            }
        }

        if (req.method === 'GET') {
            // Security check for viewing contacts
            const password = req.headers['x-admin-password'];
            const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'hijrat786';
            if (password !== ADMIN_PASSWORD) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }

            const contacts = await Contact.find().sort({ createdAt: -1 });
            return res.status(200).json({ success: true, data: contacts });
        }

        return res.status(405).json({ success: false, message: 'Method not allowed' });

    } catch (error) {
        console.error('API Handler Error:', error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};
