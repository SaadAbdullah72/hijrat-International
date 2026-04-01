const { connectDB, Promo, logAudit, ZPromo, sanitize, setHeaders } = require('./_lib');

module.exports = async function handler(req, res) {
    setHeaders(res);
    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        await connectDB();
        const isAdmin = req.headers['x-admin-password'] === (process.env.ADMIN_PASSWORD || 'hijrat786');

        if (req.method === 'GET') {
            const promos = await Promo.find({ active: true }).sort({ createdAt: -1 }).limit(20);
            return res.status(200).json(promos);
        }

        // POST/DELETE - Admin Protected
        if (!isAdmin) {
            await logAudit('UNAUTHORIZED_ACCESS', 'PROMOS', `Method: ${req.method}`, req);
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (req.method === 'POST') {
            const validation = ZPromo.safeParse(req.body);
            if (!validation.success) return res.status(400).json({ errors: validation.error.errors });
            
            const sanitized = sanitize(validation.data);
            const count = await Promo.countDocuments({ active: true });
            if (count >= 13) return res.status(400).json({ message: 'Maximum 13 posters allowed' });

            const newPromo = await Promo.create(sanitized);
            await logAudit('UPLOAD_PROMO', 'PROMOS', sanitized.title, req);
            return res.status(201).json(newPromo);
        }

        if (req.method === 'DELETE') {
            const { id } = req.query;
            if (!id) return res.status(400).json({ message: 'id required' });
            
            const promo = await Promo.findById(id);
            if (!promo) return res.status(404).json({ message: 'Not found' });
            
            await Promo.findByIdAndDelete(id);
            await logAudit('DELETE_PROMO', 'PROMOS', promo.title, req);
            return res.status(200).json({ message: 'Deleted' });
        }

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('PROMOS API FAIL:', error.message);
        return res.status(500).json({ 
            error: 'Production API Fail-safe triggered', 
            details: error.message 
        });
    }
};
