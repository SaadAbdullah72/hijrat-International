const nodemailer = require('nodemailer');
const { connectDB, Contact, logAudit, ZContact, sanitize, setHeaders } = require('./_lib');

module.exports = async function handler(req, res) {
    setHeaders(res);
    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        await connectDB();
        
        // GET - Admin Only
        if (req.method === 'GET') {
            const isAdmin = req.headers['x-admin-password'] === (process.env.ADMIN_PASSWORD || 'hijrat786');
            if (!isAdmin) {
                await logAudit('UNAUTHORIZED_CONTACTS_READ', 'CONTACTS', 'N/A', req);
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const contacts = await Contact.find({}).sort({ createdAt: -1 });
            return res.status(200).json(contacts);
        }

        // POST - Public Inquiry
        if (req.method === 'POST') {
            const validation = ZContact.safeParse(req.body);
            if (!validation.success) return res.status(400).json({ errors: validation.error.errors });
            
            const sanitized = sanitize(validation.data);
            const contact = await Contact.create(sanitized);

            // Send Email Notification
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: 'saad489254@gmail.com',
                subject: `New Travel Inquiry: ${sanitized.name}`,
                text: `Name: ${sanitized.name}\nEmail: ${sanitized.email}\nPhone: ${sanitized.phone}\nService: ${sanitized.service}\n\nMessage: ${sanitized.message}`
            };

            await transporter.sendMail(mailOptions);
            await logAudit('CONTACT_FORM_SUBMIT', 'CONTACTS', sanitized.email, req);
            
            return res.status(201).json({ success: true, message: 'Message sent successfully!' });
        }

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('CONTACTS API FAIL:', error.message);
        return res.status(500).json({ 
            success: false, 
            message: 'An error occurred while processing your request.',
            debug: error.message 
        });
    }
};
