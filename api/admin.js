const { connectDB, logAudit, ZLogin, signToken, setHeaders } = require('./_lib');


module.exports = async function handler(req, res) {
    setHeaders(res);
    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        await connectDB();
        if (req.method === 'POST') {
            const validation = ZLogin.safeParse(req.body);
            if (!validation.success) return res.status(400).json({ message: 'Invalid paylod structure' });

            const { password } = validation.data;
            const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'hijrat786';

            if (password === ADMIN_PASSWORD) {
                const token = signToken();
                await logAudit('LOGIN_SUCCESS', 'AUTH', 'ADMIN_PORTAL', req);
                return res.status(200).json({ success: true, token });
            } else {
                await logAudit('LOGIN_FAIL', 'AUTH', `Attempted: ${password.substring(0, 3)}...`, req);
                return res.status(401).json({ success: false, message: 'Invalid password' });
            }
        }
        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('PROD ERROR:', error.message);
        return res.status(500).json({ 
            success: false, 
            message: 'Server Error: Check MONGODB_URI and JWT_SECRET on Vercel',
            debug: error.message 
        });
    }
};
