from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime, date
import random

app = FastAPI(
    title="Train Ticketing Python Service",
    description="Dynamic fare calculation & seat suggestions",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CLASS_MULTIPLIERS = {
    "Sleeper": 1.0,
    "Chair": 0.85,
    "AC3": 1.8,
    "AC2": 2.5,
    "AC1": 3.5,
}

# Distance-based rough multipliers (demo)
CITY_DISTANCE_FACTOR = {
    ("New Delhi", "Mumbai Central"): 1.2,
    ("Mumbai Central", "New Delhi"): 1.2,
    ("New Delhi", "Howrah"): 1.15,
    ("New Delhi", "Bhopal"): 0.9,
    ("New Delhi", "Thiruvananthapuram"): 1.4,
    ("Chennai Central", "New Delhi"): 1.3,
}

class FareRequest(BaseModel):
    base_fare: float
    class_type: str = "Sleeper"
    passengers: int = 1
    journey_date: Optional[str] = None
    source: Optional[str] = None
    destination: Optional[str] = None

class SeatSuggestRequest(BaseModel):
    total_seats: int
    available_seats: int
    passengers: int
    class_type: str = "Sleeper"
    preferred_side: Optional[str] = None  # window / aisle

@app.get("/")
def root():
    return {
        "service": "Train Ticketing Python Microservice",
        "status": "running",
        "endpoints": ["/calculate-fare", "/suggest-seats", "/health"]
    }

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/calculate-fare")
def calculate_fare(req: FareRequest):
    """
    Dynamic fare calculation based on:
    - Class multiplier
    - Number of passengers
    - Day of week / weekend surge
    - Rough distance factor
    - Last-minute booking surge (if date is soon)
    """
    try:
        mult = CLASS_MULTIPLIERS.get(req.class_type, 1.0)
        
        # Distance factor
        dist_factor = 1.0
        if req.source and req.destination:
            key = (req.source, req.destination)
            dist_factor = CITY_DISTANCE_FACTOR.get(key, 1.0)
            # try reverse
            if dist_factor == 1.0:
                dist_factor = CITY_DISTANCE_FACTOR.get((req.destination, req.source), 1.0)

        # Weekend surge
        weekend_surge = 1.0
        if req.journey_date:
            try:
                jdate = datetime.strptime(req.journey_date[:10], "%Y-%m-%d").date()
                if jdate.weekday() >= 5:  # Sat/Sun
                    weekend_surge = 1.15
                # Last minute (within 2 days)
                days_diff = (jdate - date.today()).days
                if 0 <= days_diff <= 2:
                    weekend_surge *= 1.1
            except Exception:
                pass

        total = req.base_fare * mult * req.passengers * dist_factor * weekend_surge
        total = round(total)

        return {
            "base_fare": req.base_fare,
            "class_type": req.class_type,
            "class_multiplier": mult,
            "passengers": req.passengers,
            "distance_factor": round(dist_factor, 2),
            "weekend_surge": round(weekend_surge, 2),
            "total_fare": total,
            "currency": "INR",
            "calculated_by": "python-service"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/suggest-seats")
def suggest_seats(req: SeatSuggestRequest):
    """
    Suggest seat numbers based on availability and preference.
    """
    if req.passengers > req.available_seats:
        raise HTTPException(status_code=400, detail="Not enough seats available")

    prefix = {
        "Sleeper": "S",
        "Chair": "C",
        "AC3": "B",
        "AC2": "A",
        "AC1": "H"
    }.get(req.class_type, "X")

    # Simulate available seat pool
    occupied = req.total_seats - req.available_seats
    available = list(range(occupied + 1, req.total_seats + 1))

    # Prefer window seats if requested (odd numbers as window for demo)
    if req.preferred_side == "window":
        available = sorted(available, key=lambda x: 0 if x % 2 == 1 else 1)
    elif req.preferred_side == "aisle":
        available = sorted(available, key=lambda x: 0 if x % 2 == 0 else 1)

    selected = available[:req.passengers]
    seats = [f"{prefix}-{s}" for s in selected]

    return {
        "suggested_seats": seats,
        "class_type": req.class_type,
        "count": len(seats),
        "note": "Seats are suggestions only. Final allocation happens at booking."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
