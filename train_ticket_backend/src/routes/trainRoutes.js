const express = require('express');
const router = express.Router();
const {
  getTrains,
  getTrainById,
  createTrain,
  updateTrain,
  deleteTrain,
  calculateFare
} = require('../controllers/trainController');
const { protect, admin } = require('../middleware/auth');

router.get('/', getTrains);
router.get('/:id', getTrainById);
router.post('/calculate-fare', protect, calculateFare);
router.post('/', protect, admin, createTrain);
router.put('/:id', protect, admin, updateTrain);
router.delete('/:id', protect, admin, deleteTrain);

module.exports = router;
