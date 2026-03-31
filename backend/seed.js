const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Package = require('./models/Package');
const Service = require('./models/Service');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const services = [
    {
        title: "Hajj & Umrah",
        description: "Organizing sacred journeys from Pakistan with expert guidance and premium facilities.",
        iconName: "Mosque",
        features: ["15 Days Packages", "Umrah Guide Classes", "Saudi Arabian Airlines", "Visa Processing"],
        category: "Main"
    },
    {
        title: "Air Ticketing",
        description: "Market leader in domestic and international airline ticketing with efficient GDS systems.",
        iconName: "Plane",
        features: ["Galileo", "Abacus", "Amadeus", "Worldspan"],
        category: "Main"
    },
    {
        title: "Tourism",
        description: "Excelled in outbound and inbound tour package sales with cost-effective price quotes.",
        iconName: "Globe",
        features: ["Dubai Tours", "Malaysia Packages", "Singapore Tours", "Inbound Tourism"],
        category: "Main"
    },
    {
        title: "Study Abroad Services",
        description: "Expert counseling and assistance for international education and student visas.",
        iconName: "GraduationCap",
        features: ["Educational Loans", "Visa Assistance", "Career Counseling", "Global Opportunities"],
        category: "Main"
    },
    {
        title: "Transport & Hotels",
        description: "Comfortable stays and smooth transfers in Mecca, Madina, and worldwide.",
        iconName: "Hotel",
        features: ["Star Hotels", "Rent a Car", "Airport Transfers", "Discounted Rates"],
        category: "Main"
    }
];

const packages = [
    {
        title: "Economy Umrah Package",
        description: "15 Days Umrah package with 3-star hotel stay and air ticket included.",
        price: "PKR 247,000",
        category: "Umrah",
        isFeatured: true,
        features: ["Return Air Ticket", "Visa Processing", "Hotel Stay", "Transport"]
    },
    {
        title: "Dubai Holidays Special",
        description: "Explore the glamour of Dubai with our all-inclusive family tour package.",
        price: "PKR 185,000",
        category: "Tour",
        isFeatured: true,
        features: ["Visa", "4-Star Hotel", "Desert Safari", "City Tour"]
    },
    {
        title: "Baku Holiday Package",
        description: "Experience the windy city of Baku with premium services and guided tours.",
        price: "PKR 275,000",
        category: "Tour",
        isFeatured: true,
        features: ["Air Ticket", "4-Star Hotel", "Breakfast", "Guided Tours"]
    },
    {
        title: "Malaysia & Singapore Combo",
        description: "A perfect dual-country tour for nature and modern city lovers.",
        price: "Price On Call",
        category: "Tour",
        isFeatured: false,
        features: ["Visa Assistance", "Hotel Transfers", "Twin Tower Visit", "Sentosa Island"]
    }
];

const importData = async () => {
    try {
        await Service.deleteMany();
        await Package.deleteMany();

        await Service.insertMany(services);
        await Package.insertMany(packages);

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error with data import:', error);
        process.exit(1);
    }
};

importData();
