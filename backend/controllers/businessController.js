const Business = require("../models/businessModel");
const Appointment = require("../models/appointmentModel");
const cloudinary = require("../config/cloudinary");
const mongoose = require('mongoose');

exports.createBusiness = async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'Manager') {
            return res.status(403).json({ message: "Only managers can create a business" });
        }

        const { name, category, description, address, contact, email, website, availableSlots, googleMapsUrl } = req.body;
        const userEmail = req.user.email;
        console.log("File received:", req.file);

        // Ensure description has at least 30 words
        if (description.trim().split(/\s+/).length < 30) {
            return res.status(400).json({ message: "Description must be at least 30 words long" });
        }

        // Check if a business already exists with this email or user
        const existingBusiness = await Business.findOne({
            $or: [{ email }, { userEmail }]
        });

        if (existingBusiness) {
            return res.status(400).json({ message: "A business with this email already exists" });
        }

        let openHours;
        try {
            openHours = JSON.parse(req.body.openHours);
        } catch (error) {
            return res.status(400).json({ message: "Invalid openHours format" });
        }

        console.log("File received:", req.file);

        // Upload image to Cloudinary
        let imageUrl = "";
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "business_images",
                width: 500,
                height: 500,
                crop: "limit"
            });
            imageUrl = result.secure_url;
        }

        // Create new business entry
        const business = new Business({
            name,
            category,
            description,
            address,
            contact,
            email,
            userEmail,
            openHours,
            availableSlots,
            website,
            imageUrl,
            googleMapsUrl
        });

        await business.save();
        res.status(201).json({ message: "Business Created Successfully", business });
        console.log("Business created successfully:", business);
    } catch (err) {
        console.error("Error creating business:", err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

exports.getBusiness = async (req, res) => {
    try {
        const businesses = await Business.find().select("name address contact email openHours availableSlots imageUrl description googleMapsUrl category");
        res.status(200).json(businesses);
    } catch (err) {
        console.error("Error fetching Business:", err);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getBusinessById = async (req,res) => {
    try{
        const {businessId} = req.params;
        const business= await Business.findById(businessId);
        if(!business){
            return res.status(404).json({message:"Business Not Found"});

        }

        return res.status(200).json(business);
    }

    catch(err){
        console.error(err);
        return res.status(500).json({message:"Server Error"});
    }
};



exports.getAppointmentByBusinessId = async (req, res) => {
    try {
        const { businessId } = req.params;

        if (!businessId) {
            return res.status(400).json({ message: 'Business ID is required' });
        }

        if (!mongoose.Types.ObjectId.isValid(businessId)) {
            return res.status(400).json({ message: 'Invalid Business ID format' });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const appointments = await Appointment.find({
            businessId: new mongoose.Types.ObjectId(businessId),
            date: { $gte: today } // 
        })
        .populate('userId', 'name email'); 

        if (appointments.length === 0) {
            return res.status(404).json({ message: 'No upcoming appointments found' });
        }

        return res.status(200).json(appointments);
    } catch (err) {
        console.error('Error fetching appointments:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
