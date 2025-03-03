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

        
        let generatedSlots = generateTimeSlots(business.openHours.start, business.openHours.end);

        
        const bookedAppointments = await Appointment.find({ businessId, date }).select("time");

        
        req.availableSlots = generatedSlots.map(slot => ({
            time: slot.time,
            status: bookedAppointments.some(appt => appt.time === slot.time) ? "booked" : "available"
        }));

        next(); 
    } catch (error) {
        res.status(500).json({ message: "Error fetching slots", error });
    }
};

module.exports = { getAvailableSlotsMiddleware };
