const Booking = require('../models/Booking');
const Train = require('../models/Train');
const axios = require('axios');

exports.createBooking = async (req, res) => {
  try {
    const { trainId, journeyDate, passengers, classType } = req.body;

    if (!trainId || !journeyDate || !passengers || !Array.isArray(passengers) || passengers.length === 0) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const train = await Train.findById(trainId);
    if (!train) {
      return res.status(404).json({ success: false, message: 'Train not found' });
    }

    if (train.availableSeats < passengers.length) {
      return res.status(400).json({ success: false, message: 'Not enough seats available' });
    }

    // Calculate fare (try Python, fallback local)
    let totalFare = 0;
    const pythonUrl = process.env.PYTHON_SERVICE_URL;
    
    try {
      const fareRes = await axios.post(`${pythonUrl}/calculate-fare`, {
        base_fare: train.baseFare,
        class_type: classType || 'Sleeper',
        passengers: passengers.length,
        journey_date: journeyDate,
        source: train.source,
        destination: train.destination
      });
      totalFare = fareRes.data.total_fare;
    } catch {
      const multipliers = { Sleeper: 1, AC3: 1.8, AC2: 2.5, AC1: 3.5, Chair: 0.8 };
      const mult = multipliers[classType] || 1;
      totalFare = Math.round(train.baseFare * mult * passengers.length);
    }

    // Assign simple seat numbers
    const startSeat = train.totalSeats - train.availableSeats + 1;
    passengers.forEach((p, i) => {
      p.seatNumber = `${classType || 'SL'}-${startSeat + i}`;
    });

    const booking = await Booking.create({
      user: req.user._id,
      train: trainId,
      journeyDate,
      passengers,
      totalFare,
      classType: classType || 'Sleeper',
      seatsBooked: passengers.length,
      status: 'confirmed'
    });

    // Update available seats
    train.availableSeats -= passengers.length;
    await train.save();

    const populated = await Booking.findById(booking._id)
      .populate('train')
      .populate('user', 'name email');

    res.status(201).json({
      success: true,
      message: 'Booking confirmed!',
      booking: populated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('train')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('train')
      .populate('user', 'name email phone');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Only owner or admin
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('train');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Booking already cancelled' });
    }

    booking.status = 'cancelled';
    await booking.save();

    // Restore seats
    const train = await Train.findById(booking.train._id);
    if (train) {
      train.availableSeats += booking.seatsBooked;
      await train.save();
    }

    res.json({ success: true, message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('train')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
