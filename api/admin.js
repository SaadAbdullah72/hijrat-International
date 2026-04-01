const { connectDB, logAudit } = require('./_utils/db');
const { setSecurityHeaders, signToken, sanitize } = require('./_utils/auth');

const { LoginSchema } = require('./_utils/schemas');

module.exports = async function handler(req, res) {
    setSecurityHeaders(res);
    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method === 'POST') {
        try {
            await connectDB();
            // Brute Force Protection (Production Grade logic - simplified for serverless)
            // Ideally use Redis, but for now we rely on the secure 1s mock delay
            await new Promise(resolve => setTimeout(resolve, 800));

            const validation = LoginSchema.safeParse(req.body);
            if (!validation.success) {
                return res.status(400).json({ success: false, message: 'Invalid payload' });
            }

            const { password } = validation.data;
            const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'hijrat786';

            if (password === ADMIN_PASSWORD) {
                // Return a JWT for secure session management
                const token = signToken();
                await logAudit('ADMIN_LOGIN_SUCCESS', 'AUTH', `IP: ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`, req);
                return res.status(200).json({ success: true, token, message: 'Authenticated' });
            } else {
                await logAudit('ADMIN_LOGIN_FAILURE', 'AUTH', `Password Attempt: ${password.substring(0, 2)}...`, req);
                return res.status(401).json({ success: false, message: 'Invalid password' });
            }
        } catch (error) {
            console.error('Login Error:', error.message);
            return res.status(500).json({ message: 'Internal Fail-safe' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
};
