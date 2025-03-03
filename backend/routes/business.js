const express = require('express');
const { createBusiness, getBusiness,getBusinessById, getAppointmentByBusinessId } = require('../controllers/businessController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');

const router = express.Router();

// Protect the business creation route with authMiddleware
router.post('/create-business', authMiddleware,upload.single("image") ,createBusiness);
router.get('/get-businesses', getBusiness);
router.get('/get-business/:businessId', getBusinessById);
router.get('/get-business/appointments/:businessId',getAppointmentByBusinessId);

module.exports = router;
