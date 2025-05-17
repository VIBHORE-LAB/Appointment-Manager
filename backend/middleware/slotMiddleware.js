const Business = require("../models/businessModel");
const Appointment = require("../models/appointmentModel");

const generateTimeSlots = (start, end) => {
    let slots = [];
    let currentTime = new Date(`2023-01-01T${start}:00`);
    let endTime = new Date(`2023-01-01T${end}:00`);

    while (currentTime < endTime) {
        let slotTime = currentTime.toTimeString().split(" ")[0].substring(0, 5);
        slots.push({ time: slotTime, status: "available" });
        currentTime.setMinutes(currentTime.getMinutes() + 30);
    }
    return slots;
};


const getAvailableSlotsMiddleware = async (req, res, next) => {
    try {
        const { businessId, date } = req.params;

        const business = await Business.findById(businessId);
        if (!business) {
            return res.status(404).json({ message: "Business Not Found" });
        }

        // Generate available time slots based on business hours
        let generatedSlots = generateTimeSlots(business.openHours.start, business.openHours.end);

        // Retrieve booked appointments for the given date
        const bookedAppointments = await Appointment.find({ businessId, date }).select("time");

        console.log("Generated Slots:", generatedSlots);
        console.log("Booked Appointments:", bookedAppointments);

        req.availableSlots = generatedSlots.map(slot => ({
            time: slot.time,
            status: bookedAppointments.some(appt => {
                return appt.time === slot.time; // Fix: Directly compare strings instead of using Date conversion
            }) ? "booked" : "available"
        }));

        next(); 
    } catch (error) {
        console.error("Error fetching available slots:", error);
        res.status(500).json({ message: "Error fetching slots", error });
    }
};



module.exports = { getAvailableSlotsMiddleware };
