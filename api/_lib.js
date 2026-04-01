const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const xss = require('xss');

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'hijrat_jwt_secret_primary_key';

// SCHEMAS
const PromoSchema = new mongoose.Schema({
    imageData: { type: String, required: true },
    title: { type: String, required: true },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

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

const AuditLogSchema = new mongoose.Schema({
    action: { type: String, required: true },
    resource: { type: String },
    details: { type: String },
    ip: { type: String },
    timestamp: { type: Date, default: Date.now }
});

// MODELS (Cached for serverless)
const Promo = mongoose.models.Promo || mongoose.model('Promo', PromoSchema);
const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
const AuditLog = mongoose.models.AuditLog || mongoose.model('AuditLog', AuditLogSchema);

// VALIDATION SCHEMAS (ZOD)
const ZPromo = z.object({
    imageData: z.string().min(1),
    title: z.string().min(2).max(100)
});

const ZContact = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    phone: z.string().min(5).max(20),
    service: z.string().optional(),
    destination: z.string().optional(),
    travelDate: z.string().optional(),
    travelers: z.string().optional(),
    message: z.string().optional()
});

const ZLogin = z.object({
    password: z.string().min(1)
});

// UTILITIES
let cachedConnection = null;
const connectDB = async () => {
    if (cachedConnection && mongoose.connection.readyState === 1) return cachedConnection;
    if (!MONGODB_URI) throw new Error('MONGODB_URI NOT FOUND ON SERVER');
    cachedConnection = await mongoose.connect(MONGODB_URI);
    return cachedConnection;
};

const signToken = () => jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });

const sanitize = (input) => {
    if (typeof input === 'string') return xss(input);
    if (typeof input === 'object' && input !== null) {
        Object.keys(input).forEach(key => input[key] = sanitize(input[key]));
    }
    return input;
};

const setHeaders = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-password');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
};

const logAudit = async (action, resource, details, req) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
        await AuditLog.create({ action, resource, details, ip });
    } catch (err) {
        console.error('Audit Error:', err.message);
    }
};

module.exports = { connectDB, Promo, Contact, AuditLog, ZPromo, ZContact, ZLogin, signToken, sanitize, setHeaders, logAudit };
