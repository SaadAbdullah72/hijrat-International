const { connectDB, Promo } = require('./_utils/db');
const { PromoSchema } = require('./_utils/schemas');
const { setSecurityHeaders, logAudit, sanitize } = require('./_utils/auth');

module.exports = async function handler(req, res) {
    setSecurityHeaders(res);
    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        await connectDB();
        const isAdmin = req.headers['x-admin-password'] === (process.env.ADMIN_PASSWORD || 'hijrat786');

        // GET - Public Read (Rate limited by Vercel usually, but keep simple)
        if (req.method === 'GET') {
            const promos = await Promo.find({ active: true }).sort({ createdAt: -1 }).limit(20);
            return res.status(200).json(promos);
        }

        // POST/DELETE - Admin Protected
        if (!isAdmin) {
            await logAudit('UNAUTHORIZED_ACCESS', 'PROMQS', `Method: ${req.method}`, req);
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (req.method === 'POST') {
            // Input Validation & Sanitization (Prod Grade)
            const validation = PromoSchema.safeParse(req.body);
            if (!validation.success) {
                return res.status(400).json({ errors: validation.error.errors });
            }
            const sanitized = sanitize(validation.data);

            const count = await Promo.countDocuments({ active: true });
            if (count >= 13) return res.status(400).json({ message: 'Capacity full (13 max)' });

            const newPromo = await Promo.create(sanitized);
            await logAudit('UPLOAD_PROMO', 'PROMOS', `Title: ${sanitized.title}`, req);
            return res.status(201).json(newPromo);
        }

        if (req.method === 'DELETE') {
            const { id } = req.query;
            if (!id) return res.status(400).json({ message: 'id required' });
            
            const promo = await Promo.findById(id);
            if (!promo) return res.status(404).json({ message: 'Not found' });
            
            await Promo.findByIdAndDelete(id);
            await logAudit('DELETE_PROMO', 'PROMOS', `Title: ${promo.title}`, req);
            return res.status(200).json({ message: 'Deleted' });
        }

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('API Error:', error.message);
        return res.status(500).json({ error: 'Production API Fail-safe triggered' });
    }
};
