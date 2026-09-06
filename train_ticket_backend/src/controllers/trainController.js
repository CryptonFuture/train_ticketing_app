const Train = require('../models/Train');
const axios = require('axios');

exports.getTrains = async (req, res) => {
  try {
    const { source, destination, date } = req.query;
    let query = { isActive: true };

    if (source) {
      query.source = { $regex: source, $options: 'i' };
    }
    if (destination) {
      query.destination = { $regex: destination, $options: 'i' };
    }

    const trains = await Train.find(query).sort({ departureTime: 1 });

    res.json({
      success: true,
      count: trains.length,
      trains
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTrainById = async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);
    if (!train) {
      return res.status(404).json({ success: false, message: 'Train not found' });
    }
    res.json({ success: true, train });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createTrain = async (req, res) => {
  try {
    const trainData = req.body;
    if (!trainData.availableSeats) {
      trainData.availableSeats = trainData.totalSeats;
    }

    // Default classes if not provided
    if (!trainData.classes || trainData.classes.length === 0) {
      trainData.classes = [
        { name: 'Sleeper', seats: Math.floor(trainData.totalSeats * 0.5), fareMultiplier: 1 },
        { name: 'AC3', seats: Math.floor(trainData.totalSeats * 0.3), fareMultiplier: 1.8 },
        { name: 'AC2', seats: Math.floor(trainData.totalSeats * 0.15), fareMultiplier: 2.5 },
        { name: 'AC1', seats: Math.floor(trainData.totalSeats * 0.05), fareMultiplier: 3.5 }
      ];
    }

    const train = await Train.create(trainData);
    res.status(201).json({ success: true, train });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateTrain = async (req, res) => {
  try {
    const train = await Train.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!train) {
      return res.status(404).json({ success: false, message: 'Train not found' });
    }
    res.json({ success: true, train });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteTrain = async (req, res) => {
  try {
    const train = await Train.findByIdAndDelete(req.params.id);
    if (!train) {
      return res.status(404).json({ success: false, message: 'Train not found' });
    }
    res.json({ success: true, message: 'Train deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Call Python service for fare calculation
exports.calculateFare = async (req, res) => {
  try {
    const { trainId, classType, passengers, journeyDate } = req.body;
    const train = await Train.findById(trainId);
    if (!train) {
      return res.status(404).json({ success: false, message: 'Train not found' });
    }

    const pythonUrl = process.env.PYTHON_SERVICE_URL || 'http://localhost:8000';
    
    try {
      const response = await axios.post(`${pythonUrl}/calculate-fare`, {
        base_fare: train.baseFare,
        class_type: classType || 'Sleeper',
        passengers: passengers || 1,
        journey_date: journeyDate,
        source: train.source,
        destination: train.destination
      });
      return res.json({ success: true, ...response.data });
    } catch (pyError) {
      // Fallback if Python service is down
      const multipliers = { Sleeper: 1, AC3: 1.8, AC2: 2.5, AC1: 3.5, Chair: 0.8 };
      const mult = multipliers[classType] || 1;
      const total = train.baseFare * mult * (passengers || 1);
      return res.json({
        success: true,
        base_fare: train.baseFare,
        multiplier: mult,
        passengers: passengers || 1,
        total_fare: Math.round(total),
        note: 'Calculated locally (Python service unavailable)'
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
