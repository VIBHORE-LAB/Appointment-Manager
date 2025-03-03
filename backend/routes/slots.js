const express = require('express');
const router = express.Router();
const { getAvailableSlotsMiddleware } = require('../middleware/slotMiddleware');

router.get('/:businessId/:date', getAvailableSlotsMiddleware, (req, res) => {
    res.status(200).json({ availableSlots: req.availableSlots });
});

module.exports = router;
