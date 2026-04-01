
module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method === 'POST') {
        const { password } = req.body;
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'hijrat786';

        if (password === ADMIN_PASSWORD) {
            return res.status(200).json({ success: true, message: 'Authenticated' });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
};
