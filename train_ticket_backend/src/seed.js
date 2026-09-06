const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Train = require('./models/Train');
const User = require('./models/User');

dotenv.config();

const trains = [
  {
    trainNumber: '12951',
    trainName: 'Mumbai Rajdhani',
    source: 'New Delhi',
    destination: 'Mumbai Central',
    departureTime: '16:55',
    arrivalTime: '08:35',
    duration: '15h 40m',
    totalSeats: 200,
    availableSeats: 180,
    baseFare: 1500,
    classes: [
      { name: 'Sleeper', seats: 80, fareMultiplier: 1 },
      { name: 'AC3', seats: 60, fareMultiplier: 1.8 },
      { name: 'AC2', seats: 40, fareMultiplier: 2.5 },
      { name: 'AC1', seats: 20, fareMultiplier: 3.5 }
    ]
  },
  {
    trainNumber: '12301',
    trainName: 'Howrah Rajdhani',
    source: 'New Delhi',
    destination: 'Howrah',
    departureTime: '16:50',
    arrivalTime: '09:55',
    duration: '17h 05m',
    totalSeats: 180,
    availableSeats: 150,
    baseFare: 1400
  },
  {
    trainNumber: '12002',
    trainName: 'Shatabdi Express',
    source: 'New Delhi',
    destination: 'Bhopal',
    departureTime: '06:00',
    arrivalTime: '13:30',
    duration: '7h 30m',
    totalSeats: 120,
    availableSeats: 95,
    baseFare: 900,
    classes: [
      { name: 'Chair', seats: 80, fareMultiplier: 1 },
      { name: 'AC1', seats: 40, fareMultiplier: 2.2 }
    ]
  },
  {
    trainNumber: '12626',
    trainName: 'Kerala Express',
    source: 'New Delhi',
    destination: 'Thiruvananthapuram',
    departureTime: '11:25',
    arrivalTime: '11:00',
    duration: '47h 35m',
    totalSeats: 250,
    availableSeats: 210,
    baseFare: 1200
  },
  {
    trainNumber: '12953',
    trainName: 'August Kranti Rajdhani',
    source: 'Mumbai Central',
    destination: 'New Delhi',
    departureTime: '17:40',
    arrivalTime: '09:55',
    duration: '16h 15m',
    totalSeats: 190,
    availableSeats: 160,
    baseFare: 1550
  },
  {
    trainNumber: '12259',
    trainName: 'Sealdah Duronto',
    source: 'Sealdah',
    destination: 'New Delhi',
    departureTime: '18:30',
    arrivalTime: '11:00',
    duration: '16h 30m',
    totalSeats: 170,
    availableSeats: 140,
    baseFare: 1350
  },
  {
    trainNumber: '11077',
    trainName: 'Jhelum Express',
    source: 'Pune',
    destination: 'Jammu Tawi',
    departureTime: '17:20',
    arrivalTime: '06:00',
    duration: '36h 40m',
    totalSeats: 220,
    availableSeats: 190,
    baseFare: 1100
  },
  {
    trainNumber: '12615',
    trainName: 'Grand Trunk Express',
    source: 'Chennai Central',
    destination: 'New Delhi',
    departureTime: '19:15',
    arrivalTime: '07:40',
    duration: '36h 25m',
    totalSeats: 240,
    availableSeats: 200,
    baseFare: 1300
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Train.deleteMany({});
    console.log('Cleared existing trains');

    await Train.insertMany(trains);
    console.log(`Seeded ${trains.length} trains`);

    // Create a demo admin if not exists
    const adminExists = await User.findOne({ email: 'admin@train.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@train.com',
        password: 'admin123',
        role: 'admin',
        phone: '9999999999'
      });
      console.log('Created demo admin: admin@train.com / admin123');
    }

    console.log('Seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();
