const { z } = require('zod');

// Schema for promotional poster uploads
const PromoSchema = z.object({
    imageData: z.string().min(1, "Image is required"), // Contains the base64 or link
    title: z.string().min(2, "Title too short").max(100, "Title too long")
});

// Schema for customer contact inquiries
const ContactSchema = z.object({
    name: z.string().min(2, "Invalid name").max(50, "Name too long"),
    email: z.string().email("Invalid email format"),
    phone: z.string().min(5, "Invalid phone number").max(20, "Phone too long"),
    service: z.string().optional(),
    destination: z.string().optional(),
    travelDate: z.string().optional(),
    travelers: z.string().optional(),
    message: z.string().optional()
});

// Schema for Admin Authentication
const LoginSchema = z.object({
    password: z.string().min(1, "Password is required")
});

module.exports = { PromoSchema, ContactSchema, LoginSchema };
