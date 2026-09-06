
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import {
  Ticket,
  XCircle,
  CalendarDays,
  MapPin,
  Users,
  Train,
  Clock3,
  ShieldCheck,
  ArrowRight,
  UserRound,
  IndianRupee,
} from 'lucide-react';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    api.get('/bookings/my')
      .then(res => setBookings(res.data.bookings))
      .catch(() => toast.error('Failed to load bookings'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const cancelBooking = async (id) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await api.put(`/bookings/${id}/cancel`);
      toast.success('Booking cancelled');
      fetchBookings();
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Cancel failed'
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto">
            <div className="w-7 h-7 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          </div>

          <p className="text-sm text-slate-500 mt-4">
            Loading your bookings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-primary-900 to-primary-700 text-white">

        <div className="absolute -top-32 -right-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 py-10 sm:py-12">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-xl">
                <Ticket className="w-7 h-7" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-blue-200 font-semibold">
                  Travel Dashboard
                </p>

                <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
                  My Bookings
                </h1>

                <p className="text-sm text-blue-100/80 mt-1">
                  Manage your train journeys and tickets.
                </p>
              </div>

            </div>

            {bookings.length > 0 && (
              <div className="px-4 py-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md">
                <p className="text-xs text-blue-200">
                  Total Bookings
                </p>

                <p className="text-2xl font-extrabold">
                  {bookings.length}
                </p>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <main className="max-w-5xl mx-auto px-4 py-8">

        {bookings.length === 0 ? (

          /* ================= EMPTY STATE ================= */
          <div className="relative overflow-hidden bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 text-center py-16 px-6">

            <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary-50 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-blue-50 rounded-full blur-3xl" />

            <div className="relative">

              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-50 to-blue-50 flex items-center justify-center mx-auto mb-5">
                <Ticket className="w-9 h-9 text-primary-500" />
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900">
                No bookings yet
              </h2>

              <p className="text-slate-500 mt-2 max-w-md mx-auto">
                Your upcoming train journeys will appear here once you make a booking.
              </p>

              <Link
                to="/search"
                className="inline-flex items-center gap-2 mt-7 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold shadow-lg shadow-primary-500/25 hover:-translate-y-0.5 transition"
              >
                Search Trains
                <ArrowRight className="w-4 h-4" />
              </Link>

            </div>
          </div>

        ) : (

          <div className="space-y-5">

            {bookings.map((b) => {

              const isCancelled = b.status === 'cancelled';
              const isConfirmed = b.status === 'confirmed';

              return (
                <div
                  key={b._id}
                  className={`
                    relative overflow-hidden bg-white rounded-3xl
                    border border-slate-100
                    shadow-xl shadow-slate-200/30
                    transition-all duration-300
                    hover:shadow-2xl hover:shadow-slate-200/50
                    ${isCancelled ? 'opacity-75' : ''}
                  `}
                >

                  {/* Top Accent */}
                  <div
                    className={`h-1.5 ${
                      isConfirmed
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                        : isCancelled
                        ? 'bg-gradient-to-r from-red-400 to-rose-500'
                        : 'bg-gradient-to-r from-yellow-400 to-orange-500'
                    }`}
                  />

                  <div className="p-5 sm:p-6">

                    {/* ================= TOP ================= */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">

                      <div>

                        <div className="flex flex-wrap items-center gap-2 mb-3">

                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200">
                            <Ticket className="w-3.5 h-3.5 text-slate-500" />

                            <span className="font-mono text-xs font-bold text-slate-700">
                              {b.pnr}
                            </span>
                          </div>

                          <span
                            className={`text-xs px-3 py-1.5 rounded-xl font-bold ${
                              isConfirmed
                                ? 'bg-green-50 text-green-700 border border-green-100'
                                : isCancelled
                                ? 'bg-red-50 text-red-700 border border-red-100'
                                : 'bg-yellow-50 text-yellow-700 border border-yellow-100'
                            }`}
                          >
                            {b.status.toUpperCase()}
                          </span>

                        </div>

                        <div className="flex items-center gap-3">

                          <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center">
                            <Train className="w-5 h-5 text-primary-600" />
                          </div>

                          <div>
                            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                              {b.train?.trainName}
                            </h2>

                            <p className="text-sm text-slate-500 mt-0.5">
                              Train #{b.train?.trainNumber}
                            </p>
                          </div>

                        </div>

                      </div>

                      {/* Fare */}
                      <div className="sm:text-right">

                        <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">
                          Total Fare
                        </p>

                        <div className="flex sm:justify-end items-center text-2xl font-extrabold text-primary-700 mt-1">
                          <IndianRupee className="w-5 h-5" />
                          {b.totalFare}
                        </div>

                        <p className="text-xs text-slate-500 mt-1">
                          {b.classType} • {b.seatsBooked} seat(s)
                        </p>

                      </div>

                    </div>

                    {/* ================= ROUTE ================= */}
                    <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">

                      <div className="grid sm:grid-cols-3 gap-5 items-center">

                        {/* Source */}
                        <div>

                          <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                            Departure
                          </p>

                          <div className="flex items-center gap-2 mt-1.5">

                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                              <MapPin className="w-4 h-4 text-primary-500" />
                            </div>

                            <span className="font-bold text-slate-800">
                              {b.train?.source}
                            </span>

                          </div>

                          {b.train?.departureTime && (
                            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
                              <Clock3 className="w-3.5 h-3.5" />
                              {b.train.departureTime}
                            </div>
                          )}

                        </div>

                        {/* Route Line */}
                        <div className="hidden sm:flex items-center gap-2">

                          <div className="h-px flex-1 bg-slate-200" />

                          <div className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                            <ArrowRight className="w-4 h-4 text-primary-500" />
                          </div>

                          <div className="h-px flex-1 bg-slate-200" />

                        </div>

                        {/* Destination */}
                        <div className="sm:text-right">

                          <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                            Arrival
                          </p>

                          <div className="flex sm:justify-end items-center gap-2 mt-1.5">

                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                              <MapPin className="w-4 h-4 text-blue-500" />
                            </div>

                            <span className="font-bold text-slate-800">
                              {b.train?.destination}
                            </span>

                          </div>

                          {b.train?.arrivalTime && (
                            <div className="flex sm:justify-end items-center gap-1.5 mt-2 text-xs text-slate-500">
                              <Clock3 className="w-3.5 h-3.5" />
                              {b.train.arrivalTime}
                            </div>
                          )}

                        </div>

                      </div>

                    </div>

                    {/* ================= BOOKING DETAILS ================= */}
                    <div className="grid sm:grid-cols-2 gap-3 mt-4">

                      <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-white">

                        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                          <CalendarDays className="w-4 h-4 text-blue-600" />
                        </div>

                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-slate-400 font-bold">
                            Journey Date
                          </p>

                          <p className="text-sm font-bold text-slate-700">
                            {new Date(b.journeyDate).toLocaleDateString(
                              'en-IN',
                              {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              }
                            )}
                          </p>
                        </div>

                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-white">

                        <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                          <Users className="w-4 h-4 text-purple-600" />
                        </div>

                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-slate-400 font-bold">
                            Passengers
                          </p>

                          <p className="text-sm font-bold text-slate-700">
                            {b.passengers.length} passenger(s)
                          </p>
                        </div>

                      </div>

                    </div>

                    {/* ================= PASSENGERS ================= */}
                    <div className="mt-5 pt-5 border-t border-slate-100">

                      <div className="flex items-center gap-2 mb-3">
                        <UserRound className="w-4 h-4 text-slate-400" />

                        <p className="text-xs uppercase tracking-wide text-slate-400 font-bold">
                          Passengers & Seats
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">

                        {b.passengers.map((p, i) => (
                          <div
                            key={i}
                            className="group inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-primary-200 hover:bg-primary-50/50 transition"
                          >

                            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
                              <UserRound className="w-3.5 h-3.5 text-primary-500" />
                            </div>

                            <div>
                              <p className="text-xs font-bold text-slate-700">
                                {p.name}
                              </p>

                              <p className="text-[10px] text-slate-400">
                                {p.age}y • {p.gender} • Seat {p.seatNumber || 'N/A'}
                              </p>
                            </div>

                          </div>
                        ))}

                      </div>

                    </div>

                    {/* ================= ACTIONS ================= */}
                    {isConfirmed && (
                      <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div className="flex items-center gap-2 text-xs text-green-600 font-semibold">
                          <ShieldCheck className="w-4 h-4" />
                          Your booking is confirmed
                        </div>

                        <button
                          onClick={() => cancelBooking(b._id)}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm font-bold hover:bg-red-100 hover:border-red-300 transition"
                        >
                          <XCircle className="w-4 h-4" />
                          Cancel Booking
                        </button>

                      </div>
                    )}

                    {isCancelled && (
                      <div className="mt-5 pt-5 border-t border-slate-100">

                        <div className="flex items-center gap-2 text-sm font-semibold text-red-600">
                          <XCircle className="w-4 h-4" />
                          This booking has been cancelled.
                        </div>

                      </div>
                    )}

                  </div>
                </div>
              );
            })}

          </div>
        )}

      </main>
    </div>
  );
}

