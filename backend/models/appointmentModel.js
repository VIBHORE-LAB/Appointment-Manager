const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, 
  status: { type: String, enum: ['Upcoming', 'Completed', 'Cancelled'], default: 'Upcoming' },
  createdAt: { type: Date, default: Date.now },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
