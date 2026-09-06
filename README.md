# 🚂 Train Ticketing App

Complete full-stack Train Ticket Booking System with:

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js + MongoDB (Mongoose)
- **Python Service**: FastAPI microservice for dynamic fare calculation & seat suggestions

## Features

- User Registration & Login (JWT Auth)
- Admin Panel to manage trains
- Search trains by source, destination & date
- Book tickets with passenger details
- View & Cancel bookings
- Dynamic fare calculation via Python service
- Responsive modern UI

## Project Structure

```
train-ticketing-app/
├── backend/                 # Node.js + Express + MongoDB
├── frontend/                # React + Vite
├── python-service/          # FastAPI (fare & suggestions)
└── README.md
```

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Python 3.9+
- npm / yarn

## Setup Instructions

### 1. MongoDB
Make sure MongoDB is running locally, or use MongoDB Atlas connection string.

### 2. Backend (Node.js)

```bash
cd backend
npm install
# Create .env file (see below)
npm run dev
```

Backend runs on: `http://localhost:5000`

**.env** (backend/.env):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/train_ticketing
JWT_SECRET=your_super_secret_jwt_key_change_this
PYTHON_SERVICE_URL=http://localhost:8000
```

### 3. Python Service

```bash
cd python-service
python -m venv venv
# Windows: venv\Scripts\activate
# Linux/Mac: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Python service runs on: `http://localhost:8000`

### 4. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

## Default Admin

Register any user. To make admin, update role in MongoDB to "admin".

For demo, any email containing "admin" gets admin role on registration.

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Trains
- GET /api/trains (search with query params)
- GET /api/trains/:id
- POST /api/trains (Admin)
- PUT /api/trains/:id (Admin)
- DELETE /api/trains/:id (Admin)

### Bookings
- POST /api/bookings
- GET /api/bookings/my
- GET /api/bookings/:id
- PUT /api/bookings/:id/cancel

### Python Service
- POST /calculate-fare
- POST /suggest-seats

## Tech Stack

| Layer          | Technology |
|----------------|------------|
| Frontend       | React 18, Vite, Tailwind, React Router, Axios |
| Backend        | Node.js, Express, Mongoose, JWT, bcrypt |
| Database       | MongoDB |
| Python Service | FastAPI, Uvicorn |

## License

MIT
# train_ticketing_app
