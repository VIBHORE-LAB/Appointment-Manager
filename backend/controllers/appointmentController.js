const Appointment = require('../models/appointmentModel');
const Business = require('../models/businessModel');
const nodemailer = require('../config/nodemailer');
const { getAvailableSlotsMiddleware } = require('../middleware/slotMiddleware');
const mongoose = require('mongoose');
const bookAppointment = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }
        console.log("User Data:", req.user);  
        const { time, date } = req.body;
        const userId = req.user.id;
        const userEmail = req.user.email;
        const name = req.user.name;
        const businessId = req.params.businessId;

        const business = await Business.findById(businessId);
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }

        // Check available slots from middleware
        const availableSlots = req.availableSlots || [];
        const isSlotAvailable = availableSlots.some(slot => slot.time === time && slot.status === "available");
        if (!isSlotAvailable) {
            return res.status(400).json({ message: "Selected time slot is not available" });
        }

        // Create appointment
        const appointment = new Appointment({ userId, name, email: userEmail, businessId, time, date });
        await appointment.save();

        res.status(201).json({ message: "Appointment booked successfully", appointment });
    } catch (error) {
        console.error("Booking Error:", error);
        res.status(500).json({ message: "Error booking appointment", error: error.message });
    }
};

const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        await Appointment.findByIdAndDelete(appointmentId);
        res.status(200).json({ message: "Appointment canceled successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error canceling appointment", error: error.message });
    }
};

const rescheduleAppointment = async (req, res, next) => {
    try {
        const { appointmentId } = req.params;
        const { time: newTime, date: newDate } = req.body; // Destructure time and date from req.body

        // Log the request body for debugging
        console.log("Request Body:", req.body);

        // Find the appointment by ID
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        // Set businessId and date for the getAvailableSlotsMiddleware
        req.params.businessId = appointment.businessId;
        req.params.date = newDate;

        // Fetch available slots for the new date
        await getAvailableSlotsMiddleware(req, res, async () => {
            const availableSlots = req.availableSlots;
            console.log("Available Slots:", availableSlots); // Log available slots for debugging
            console.log("New Time:", newTime); // Log the new time being requested

            // Check if the new time is available
            const isNewSlotAvailable = availableSlots.some((slot) => {
                console.log(`Comparing ${slot.time} (${slot.status}) with ${newTime}`); // Debugging log
                return slot.time === newTime && slot.status === "available";
            });

            if (!isNewSlotAvailable) {
                return res.status(400).json({ message: "New slot is not available" });
            }

            // Update the appointment with the new time and date
            const updatedAppointment = await Appointment.findByIdAndUpdate(
                appointmentId,
                { time: newTime, date: newDate },
                { new: true }
            );

            // Return success response
            res.status(200).json({ message: "Appointment rescheduled", updatedAppointment });
        });
    } catch (error) {
        console.error("Error rescheduling appointment:", error);
        res.status(500).json({ message: "Error rescheduling appointment", error: error.message });
    }
};

const sendAppointmentReminders = async () => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const upcomingAppointments = await Appointment.find({ date: today, status: 'Upcoming' });

        for (const appointment of upcomingAppointments) {
            const mailOptions = {
                from: process.env.EMAIL,
                to: appointment.email,
                subject: "Appointment Reminder",
                text: `Dear ${appointment.name},\n\nThis is a reminder for your appointment at ${appointment.time} today.\n\nThank you!`
            };

            nodemailer.sendMail(mailOptions, (err, info) => {
                if (err) console.error(`Error sending reminder to ${appointment.email}:`, err);
                else console.log(`Reminder sent to ${appointment.email}:`, info.response);
            });
        }
    } catch (error) {
        console.error("Error sending reminders:", error);
    }
};



const getAppointments = async (req, res) => {
    try {
        console.log('Authenticated User:', req.user); // ✅ Debugging
        const userId = req.user.id; // Use `id` instead of `_id`

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized Access" });
        }

        const appointments = await Appointment.find({ userId: new mongoose.Types.ObjectId(userId) })
            .populate("businessId", "name googleMapsUrl address");

        if (appointments.length === 0) {
            return res.status(404).json({ message: "No appointments found for this user." });
        }

        console.log("Appointments fetched:", appointments);
        res.status(200).json(appointments);
    } catch (err) {
        console.error("Error fetching appointments:", err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};


const getAppointmentById= async(req,res) =>{
    try{
        const {appointmentId} = req.params;
        const appointment= await Appointment.findById(appointmentId);
        if(!appointment){
            return res.status(404).json({message:"Appointment Not Found"});

        }

        return res.status(200).json(appointment);

    }

    catch(err){
        console.error(err);
        return res.status(500).json({message:"Server Error"});
    }
}



module.exports = { bookAppointment, cancelAppointment, rescheduleAppointment, sendAppointmentReminders, getAppointments, getAppointmentById };
