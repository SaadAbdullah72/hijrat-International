const jwt = require('jsonwebtoken');
const { AuditLog } = require('./db');
const xss = require('xss');

const JWT_SECRET = process.env.JWT_SECRET || 'hijrat_jwt_secret_primary_key';

// Secure JWT sign
function signToken() {
    return jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
}

// Secure JWT verify
function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (e) {
        return null;
    }
}

// XSS Sanitizer for all inputs
function sanitize(input) {
    if (typeof input === 'string') return xss(input);
    if (typeof input === 'object' && input !== null) {
        Object.keys(input).forEach(key => {
            input[key] = sanitize(input[key]);
        });
    }
    return input;
}

// Security Header Setter for Vercel functions
function setSecurityHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Restricted by logic later
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-password');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    res.setHeader('Referrer-Policy', 'no-referrer');
}

// Audit Log Tracker
async function logAudit(action, resource, details, req) {
    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        await AuditLog.create({ action, resource, details, ip });
    } catch (err) {
        console.error('Audit Log Error:', err.message);
    }
}

module.exports = { signToken, verifyToken, sanitize, setSecurityHeaders, logAudit };
