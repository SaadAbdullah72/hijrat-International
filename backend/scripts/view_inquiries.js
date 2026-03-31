const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Contact = require('../models/Contact');

dotenv.config({ path: path.join(__dirname, '../.env') });

const viewInquiries = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('--- Current Inquiries ---');
        const inquiries = await Contact.find().sort({ createdAt: -1 });
        
        if (inquiries.length === 0) {
            console.log('No inquiries found yet.');
        } else {
            inquiries.forEach((iq, i) => {
                console.log(`\n[${i+1}] From: ${iq.name} (${iq.phone})`);
                console.log(`    Service: ${iq.service} | Destination: ${iq.destination}`);
                console.log(`    Date: ${iq.travelDate} | Travelers: ${iq.travelers}`);
                console.log(`    Email: ${iq.email}`);
                console.log(`    Message: ${iq.message || 'N/A'}`);
            });
        }
        
        await mongoose.connection.close();
    } catch (error) {
        console.error('Error fetching inquiries:', error.message);
        process.exit(1);
    }
};

viewInquiries();
