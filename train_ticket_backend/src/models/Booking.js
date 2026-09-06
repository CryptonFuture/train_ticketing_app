const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  seatNumber: { type: String, default: '' }
});

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  train: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Train',
    required: true
  },
  journeyDate: {
    type: Date,
    required: true
  },
  passengers: [passengerSchema],
  totalFare: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'pending'],
    default: 'confirmed'
  },
  pnr: {
    type: String,
    unique: true
  },
  classType: {
    type: String,
    default: 'Sleeper'
  },
  seatsBooked: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Generate PNR before save
bookingSchema.pre('save', function (next) {
  if (!this.pnr) {
    this.pnr = 'PNR' + Date.now().toString().slice(-8) + Math.floor(Math.random() * 100);
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
