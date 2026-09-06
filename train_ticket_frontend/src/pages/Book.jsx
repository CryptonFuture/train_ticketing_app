
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import {
  Plus,
  Trash2,
  IndianRupee,
  Train,
  CalendarDays,
  Users,
  Clock3,
  MapPin,
  ShieldCheck,
  ArrowRight,
  UserRound,
} from 'lucide-react';

export default function Book() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [train, setTrain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [classType, setClassType] = useState('Sleeper');
  const [journeyDate, setJourneyDate] = useState(
    location.state?.date || ''
  );

  const [passengers, setPassengers] = useState([
    { name: '', age: '', gender: 'Male' },
  ]);

  const [fareInfo, setFareInfo] = useState(null);

  useEffect(() => {
    api.get(`/trains/${id}`)
      .then((res) => {
        setTrain(res.data.train);

        if (res.data.train.classes?.length) {
          setClassType(res.data.train.classes[0].name);
        }
      })
      .catch(() => toast.error('Train not found'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (train && passengers.length > 0) {
      calculateFare();
    }
  }, [train, classType, passengers.length, journeyDate]);

  const calculateFare = async () => {
    try {
      const res = await api.post('/trains/calculate-fare', {
        trainId: id,
        classType,
        passengers: passengers.length,
        journeyDate,
      });

      setFareInfo(res.data);
    } catch {
      // silent
    }
  };

  const addPassenger = () => {
    if (passengers.length >= 6) {
      toast.error('Max 6 passengers per booking');
      return;
    }

    setPassengers([
      ...passengers,
      { name: '', age: '', gender: 'Male' },
    ]);
  };

  const removePassenger = (index) => {
    if (passengers.length === 1) return;

    setPassengers(
      passengers.filter((_, i) => i !== index)
    );
  };

  const updatePassenger = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!journeyDate) {
      toast.error('Please select journey date');
      return;
    }

    for (const p of passengers) {
      if (!p.name || !p.age) {
        toast.error('Please fill all passenger details');
        return;
      }
    }

    setSubmitting(true);

    try {
      const res = await api.post('/bookings', {
        trainId: id,
        journeyDate,
        passengers: passengers.map((p) => ({
          name: p.name,
          age: Number(p.age),
          gender: p.gender,
        })),
        classType,
      });

      toast.success(
        `Booking confirmed! PNR: ${res.data.booking.pnr}`
      );

      navigate('/my-bookings');
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Booking failed'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-primary-50 flex items-center justify-center">
            <div className="w-7 h-7 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          </div>

          <p className="text-sm text-slate-500 mt-4">
            Loading train details...
          </p>
        </div>
      </div>
    );
  }

  if (!train) return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">

      {/* ================= HEADER ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-primary-900 to-primary-700 text-white">

        <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 py-10 sm:py-12">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-xl">
              <Train className="w-7 h-7 text-white" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-blue-200 font-semibold">
                Secure Booking
              </p>

              <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
                Book Your Ticket
              </h1>

              <p className="text-sm text-blue-100/80 mt-1">
                Complete your journey details below.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <main className="max-w-5xl mx-auto px-4 py-8">

        {/* ================= TRAIN CARD ================= */}
        <div className="relative overflow-hidden bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 p-6 mb-6">

          <div className="absolute top-0 right-0 w-40 h-40 bg-primary-50 rounded-full blur-3xl" />

          <div className="relative">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center">
                  <Train className="w-6 h-6 text-primary-600" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-primary-100 text-primary-700 text-xs font-bold">
                      {train.trainNumber}
                    </span>

                    <h2 className="text-xl font-extrabold text-slate-900">
                      {train.trainName}
                    </h2>
                  </div>

                  <p className="text-sm text-slate-500 mt-1">
                    Premium train booking experience
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-50 text-green-700 text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {train.availableSeats} seats available
              </div>

            </div>

            {/* Route */}
            <div className="mt-6 pt-5 border-t border-slate-100 grid sm:grid-cols-3 gap-5">

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">
                  From
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-primary-500" />
                  <span className="font-bold text-slate-800">
                    {train.source}
                  </span>
                </div>
              </div>

              <div className="flex items-center sm:justify-center">
                <div className="hidden sm:block w-full h-px bg-slate-200 relative">
                  <div className="absolute left-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary-50 border border-primary-100 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-primary-600" />
                  </div>
                </div>

                <div className="sm:hidden text-primary-500">
                  ↓
                </div>
              </div>

              <div className="sm:text-right">
                <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">
                  To
                </p>

                <div className="flex items-center sm:justify-end gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span className="font-bold text-slate-800">
                    {train.destination}
                  </span>
                </div>
              </div>

            </div>

            {/* Timing */}
            <div className="flex flex-wrap gap-3 mt-5">

              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 text-sm">
                <Clock3 className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-slate-700">
                  {train.departureTime}
                </span>
                <span className="text-slate-400">→</span>
                <span className="font-semibold text-slate-700">
                  {train.arrivalTime}
                </span>
              </div>

              {train.duration && (
                <div className="px-3 py-2 rounded-xl bg-slate-50 text-sm font-semibold text-slate-600">
                  {train.duration}
                </div>
              )}

            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ================= JOURNEY DETAILS ================= */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/30 p-6 sm:p-7">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-primary-600" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Journey Details
                </h3>

                <p className="text-sm text-slate-500">
                  Select your travel date and preferred class.
                </p>
              </div>

            </div>

            <div className="grid sm:grid-cols-2 gap-5">

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Journey Date *
                </label>

                <div className="relative">
                  <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />

                  <input
                    type="date"
                    value={journeyDate}
                    onChange={(e) => setJourneyDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 bg-slate-50/70 outline-none transition-all focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                  />
                </div>
              </div>

              {/* Class */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Travel Class
                </label>

                <select
                  value={classType}
                  onChange={(e) => setClassType(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/70 outline-none transition-all focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                >
                  {(train.classes?.length
                    ? train.classes
                    : [
                        { name: 'Sleeper' },
                        { name: 'AC3' },
                        { name: 'AC2' },
                        { name: 'AC1' },
                      ]
                  ).map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* ================= PASSENGERS ================= */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/30 p-6 sm:p-7">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Passenger Details
                  </h3>

                  <p className="text-sm text-slate-500">
                    Add up to 6 passengers.
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={addPassenger}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-primary-200 bg-primary-50 text-primary-700 font-semibold text-sm hover:bg-primary-100 transition"
              >
                <Plus className="w-4 h-4" />
                Add Passenger
              </button>

            </div>

            <div className="space-y-4">

              {passengers.map((p, i) => (
                <div
                  key={i}
                  className="relative rounded-2xl border border-slate-100 bg-slate-50/60 p-5 hover:border-primary-100 transition"
                >

                  {/* Passenger Header */}
                  <div className="flex items-center justify-between mb-4">

                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                        <UserRound className="w-4 h-4 text-primary-600" />
                      </div>

                      <span className="text-sm font-bold text-slate-700">
                        Passenger {i + 1}
                      </span>
                    </div>

                    {passengers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePassenger(i)}
                        title="Remove passenger"
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                  </div>

                  <div className="grid sm:grid-cols-4 gap-4">

                    {/* Name */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-500 mb-2">
                        Full Name *
                      </label>

                      <input
                        value={p.name}
                        onChange={(e) =>
                          updatePassenger(
                            i,
                            'name',
                            e.target.value
                          )
                        }
                        required
                        placeholder="Passenger full name"
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                      />
                    </div>

                    {/* Age */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-2">
                        Age *
                      </label>

                      <input
                        type="number"
                        value={p.age}
                        onChange={(e) =>
                          updatePassenger(
                            i,
                            'age',
                            e.target.value
                          )
                        }
                        required
                        min="1"
                        max="120"
                        placeholder="Age"
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-2">
                        Gender
                      </label>

                      <select
                        value={p.gender}
                        onChange={(e) =>
                          updatePassenger(
                            i,
                            'gender',
                            e.target.value
                          )
                        }
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>

                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* ================= FARE SUMMARY ================= */}
          {fareInfo && (
            <div className="relative overflow-hidden rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-blue-50 p-6 sm:p-7 shadow-lg shadow-primary-100/40">

              <div className="absolute -right-16 -top-16 w-40 h-40 bg-primary-200/30 rounded-full blur-3xl" />

              <div className="relative">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <IndianRupee className="w-5 h-5 text-primary-600" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Fare Summary
                    </h3>

                    <p className="text-sm text-slate-500">
                      Estimated fare for your booking
                    </p>
                  </div>

                </div>

                <div className="bg-white/70 rounded-2xl border border-white p-4 space-y-3 text-sm">

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">
                      Base Fare
                    </span>

                    <span className="font-semibold text-slate-700">
                      ₹{fareInfo.base_fare} ×{' '}
                      {fareInfo.class_multiplier}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">
                      Class
                    </span>

                    <span className="font-semibold text-slate-700">
                      {classType}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">
                      Passengers
                    </span>

                    <span className="font-semibold text-slate-700">
                      {fareInfo.passengers}
                    </span>
                  </div>

                  {fareInfo.distance_factor &&
                    fareInfo.distance_factor !== 1 && (
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">
                          Distance Factor
                        </span>

                        <span className="font-semibold text-slate-700">
                          ×{fareInfo.distance_factor}
                        </span>
                      </div>
                    )}

                  {fareInfo.weekend_surge &&
                    fareInfo.weekend_surge !== 1 && (
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">
                          Weekend Surge
                        </span>

                        <span className="font-semibold text-slate-700">
                          ×{fareInfo.weekend_surge}
                        </span>
                      </div>
                    )}

                  <div className="border-t border-slate-200 pt-4 mt-2 flex items-center justify-between">

                    <span className="font-bold text-slate-800">
                      Total Fare
                    </span>

                    <div className="flex items-center text-2xl font-extrabold text-primary-700">
                      <IndianRupee className="w-6 h-6" />
                      {fareInfo.total_fare}
                    </div>

                  </div>

                </div>

                {fareInfo.calculated_by === 'python-service' && (
                  <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-green-600">
                    <ShieldCheck className="w-4 h-4" />
                    Fare calculated by Python service
                  </div>
                )}

              </div>
            </div>
          )}

          {/* ================= CONFIRM BUTTON ================= */}
          <button
            type="submit"
            disabled={submitting}
            className="group w-full h-14 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold text-lg shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            <span className="flex items-center justify-center gap-2">

              {submitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Confirming Booking...
                </>
              ) : (
                <>
                  Confirm Booking
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </>
              )}

            </span>
          </button>

          {/* Security */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pb-4">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            Secure booking • Confirmed PNR • Easy cancellation
          </div>

        </form>
      </main>
    </div>
  );
}

