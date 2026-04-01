const nodemailer = require('nodemailer');
const { connectDB, Contact } = require('./_utils/db');
const { ContactSchema } = require('./_utils/schemas');
const { setSecurityHeaders, logAudit, sanitize } = require('./_utils/auth');

module.exports = async function handler(req, res) {
    setSecurityHeaders(res);
    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        await connectDB();
        const isAdmin = req.headers['x-admin-password'] === (process.env.ADMIN_PASSWORD || 'hijrat786');

        // GET - Admin ONLY (Prevents Customer Data Leak)
        if (req.method === 'GET') {
            if (!isAdmin) {
                await logAudit('UNAUTHORIZED_DATA_ACCESS', 'CONTACTS', `Method: GET`, req);
                return res.status(401).json({ message: 'Unauthorized Access to Private Data' });
            }
            const contacts = await Contact.find().sort({ createdAt: -1 }).limit(100);
            return res.status(200).json({ success: true, data: contacts });
        }

        // POST - Public Inquiry (Hardened with Sanitization)
        if (req.method === 'POST') {
            // Input Validation & Production Logic
            const validation = ContactSchema.safeParse(req.body);
            if (!validation.success) {
                return res.status(400).json({ errors: validation.error.errors });
            }
            const sanitized = sanitize(validation.data);

            const contact = await Contact.create(sanitized);

            // Secure Email Delivery
            try {
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com', port: 465, secure: true,
                    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
                });

                const mailOptions = {
                    from: `"Hijrat Alerts" <${process.env.EMAIL_USER}>`,
                    to: 'hijratinternational@gmail.com',
                    subject: `Production Inquiry: ${sanitized.service || 'N/A'} | ${sanitized.name}`,
                    html: `
                        <div style="font-family: Arial; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                            <h2 style="color: #1e40af;">New Inquiry Received</h2>
                            <p><strong>Customer:</strong> ${sanitized.name}</p>
                            <p><strong>Phone:</strong> ${sanitized.phone}</p>
                            <p><strong>Email:</strong> ${sanitized.email}</p>
                            <p><strong>Service:</strong> ${sanitized.service || 'N/A'}</p>
                            <div style="margin-top: 15px; padding: 10px; background: #f8fafc;">
                                <strong>Message:</strong><br/>${sanitized.message || 'No message provided.'}
                            </div>
                        </div>
                    `
                };

                await transporter.sendMail(mailOptions);
                return res.status(201).json({ success: true, message: 'Inquiry Secured & Sent' });
            } catch (err) {
                // Return success anyway to user (DB was updated) but log mail error
                console.error('Mail Security Error:', err.message);
                return res.status(201).json({ success: true, message: 'Inquiry Recorded', partialFailure: 'SMTP_ERR' });
            }
        }

        return res.status(405).json({ message: 'Production API Fail-safe triggered' });

    } catch (error) {
        console.error('Contact API Error:', error.message);
        return res.status(500).json({ success: false, message: 'Internal Production Error' });
    }
};
