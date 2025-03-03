const express = require('express');
const router = express.Router();
const { bookAppointment, cancelAppointment, rescheduleAppointment, getAppointments,getAppointmentById,getAppointmentByBusinessId } = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware'); 
const { getAvailableSlotsMiddleware } = require("../middleware/slotMiddleware");


router.post('/book/:businessId', authMiddleware,getAvailableSlotsMiddleware, bookAppointment); 
router.delete('/cancel/:appointmentId', authMiddleware, cancelAppointment); 
router.put('/reschedule/:appointmentId', authMiddleware, rescheduleAppointment); 
router.get('/user/appointments', authMiddleware, getAppointments);
router.get('/get-appointment/:appointmentId',getAppointmentById);
module.exports = router;
