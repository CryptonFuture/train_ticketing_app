const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  trainNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  trainName: {
    type: String,
    required: true,
    trim: true
  },
  source: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    type: String,
    required: true,
    trim: true
  },
  departureTime: {
    type: String,
    required: true // e.g. "08:00"
  },
  arrivalTime: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    default: ''
  },
  totalSeats: {
    type: Number,
    required: true,
    min: 1
  },
  availableSeats: {
    type: Number,
    required: true
  },
  baseFare: {
    type: Number,
    required: true,
    min: 0
  },
  classes: [{
    name: { type: String, enum: ['Sleeper', 'AC3', 'AC2', 'AC1', 'Chair'], default: 'Sleeper' },
    seats: { type: Number, default: 50 },
    fareMultiplier: { type: Number, default: 1 }
  }],
  daysOfOperation: {
    type: [String], // ['Mon', 'Tue', ...] or empty for daily
    default: []
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Train', trainSchema);
