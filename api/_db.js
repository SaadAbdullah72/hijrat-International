const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

// Schemas
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
    action: { type: String, required: true }, // e.g., 'UPLOAD_PROMO', 'DELETE_PROMO'
    resource: { type: String },
    details: { type: String },
    ip: { type: String },
    timestamp: { type: Date, default: Date.now }
});

// Models (with caching check for serverless)
const Promo = mongoose.models.Promo || mongoose.model('Promo', PromoSchema);
const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
const AuditLog = mongoose.models.AuditLog || mongoose.model('AuditLog', AuditLogSchema);

let cachedConnection = null;

const connectDB = async () => {
    if (cachedConnection && mongoose.connection.readyState === 1) {
        return cachedConnection;
    }
    if (!MONGODB_URI) throw new Error('MONGODB_URI is not defined on Vercel');
    
    cachedConnection = await mongoose.connect(MONGODB_URI);
    return cachedConnection;
};

// Central Audit Logger (Prevents Circular Deps)
async function logAudit(action, resource, details, req) {
    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        await AuditLog.create({ action, resource, details, ip });
    } catch (err) {
        console.error('Audit Log Error:', err.message);
    }
}

module.exports = { connectDB, Promo, Contact, AuditLog, logAudit };
