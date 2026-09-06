
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import {
  Search as SearchIcon,
  Clock3,
  MapPin,
  IndianRupee,
  Train,
  CalendarDays,
  ArrowRight,
  Sparkles,
  Armchair,
} from 'lucide-react';

export default function Search() {
  const [filters, setFilters] = useState({
    source: '',
    destination: '',
    date: '',
  });

  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const navigate = useNavigate();

  const popularRoutes = [
    { source: 'New Delhi', destination: 'Mumbai Central' },
    { source: 'New Delhi', destination: 'Howrah' },
    { source: 'Chennai Central', destination: 'New Delhi' },
    { source: 'Mumbai Central', destination: 'New Delhi' },
  ];

  const handleSearch = async (e) => {
    e?.preventDefault();

    setLoading(true);
    setSearched(true);

    try {
      const params = {};

      if (filters.source) params.source = filters.source;
      if (filters.destination) params.destination = filters.destination;

      const res = await api.get('/trains', { params });

      setTrains(res.data.trains);
    } catch (err) {
      toast.error('Failed to fetch trains');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const selectRoute = (route) => {
    setFilters({
      ...filters,
      source: route.source,
      destination: route.destination,
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-primary-900 to-primary-700 text-white">

        <div className="absolute -top-32 -right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-10 sm:py-14">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-xs font-semibold text-blue-100 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Smart Train Search
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Find Your Perfect
              <span className="block text-blue-200">
                Train Journey
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-blue-100/80 max-w-2xl">
              Search trains, compare timings and fares, and book your
              journey with a few simple clicks.
            </p>

          </div>

        </div>
      </section>

      {/* ================= SEARCH SECTION ================= */}
      <main className="max-w-7xl mx-auto px-4 -mt-7 relative z-10 pb-12">

        <form
          onSubmit={handleSearch}
          className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white shadow-2xl shadow-slate-300/40 p-5 sm:p-7"
        >

          <div className="flex items-center gap-3 mb-6">

            <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center">
              <SearchIcon className="w-5 h-5 text-primary-600" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Search Trains
              </h2>

              <p className="text-sm text-slate-500">
                Enter your journey details
              </p>
            </div>

          </div>

          <div className="grid md:grid-cols-4 gap-4">

            {/* From */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
                From
              </label>

              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-500 pointer-events-none" />

                <input
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 bg-slate-50/70 outline-none transition-all focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                  placeholder="Source city"
                  value={filters.source}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      source: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* To */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
                To
              </label>

              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500 pointer-events-none" />

                <input
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 bg-slate-50/70 outline-none transition-all focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                  placeholder="Destination city"
                  value={filters.destination}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      destination: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
                Journey Date
              </label>

              <div className="relative">
                <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500 pointer-events-none" />

                <input
                  type="date"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 bg-slate-50/70 outline-none transition-all focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                  value={filters.date}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      date: e.target.value,
                    })
                  }
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">

              <button
                type="submit"
                disabled={loading}
                className="group w-full h-12 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                <span className="flex items-center justify-center gap-2">

                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <SearchIcon className="w-4 h-4" />
                      Search Trains
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}

                </span>
              </button>

            </div>

          </div>

          {/* Popular Routes */}
          <div className="mt-6 pt-5 border-t border-slate-100">

            <div className="flex flex-wrap items-center gap-2">

              <span className="text-xs font-bold uppercase tracking-wide text-slate-400 mr-1">
                Popular Routes
              </span>

              {popularRoutes.map((r, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectRoute(r)}
                  className="group inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition"
                >
                  <MapPin className="w-3.5 h-3.5" />

                  {r.source}

                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-primary-500" />

                  {r.destination}
                </button>
              ))}

            </div>
          </div>

        </form>

        {/* ================= RESULTS HEADER ================= */}
        {!loading && trains.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-10 mb-5">

            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-primary-600">
                Available Trains
              </p>

              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                {trains.length} train{trains.length !== 1 ? 's' : ''} found
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-500 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Live Availability
            </div>

          </div>
        )}

        {/* ================= LOADING ================= */}
        {loading ? (

          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/30 py-16 text-center">

            <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto">
              <div className="w-7 h-7 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
            </div>

            <h3 className="font-bold text-slate-800 mt-5">
              Finding trains...
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Searching the best available journeys for you.
            </p>

          </div>

        ) : trains.length === 0 && searched ? (

          /* ================= EMPTY STATE ================= */
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/30 py-16 px-6 text-center">

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-50 to-blue-50 flex items-center justify-center mx-auto">
              <Train className="w-9 h-9 text-primary-500" />
            </div>

            <h2 className="text-xl font-extrabold text-slate-900 mt-5">
              No trains found
            </h2>

            <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
              We couldn't find any trains matching your search.
              Try different source or destination cities.
            </p>

          </div>

        ) : (

          /* ================= RESULTS ================= */
          <div className="space-y-5">

            {trains.map((train) => {

              const noSeats = train.availableSeats === 0;

              return (
                <div
                  key={train._id}
                  className="group relative overflow-hidden bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/30 hover:shadow-2xl hover:shadow-slate-300/40 hover:-translate-y-0.5 transition-all duration-300"
                >

                  {/* Accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-blue-500" />

                  <div className="p-5 sm:p-6">

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                      {/* Train Details */}
                      <div className="flex-1">

                        <div className="flex flex-wrap items-center gap-3 mb-5">

                          <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center">
                            <Train className="w-5 h-5 text-primary-600" />
                          </div>

                          <div>

                            <div className="flex flex-wrap items-center gap-2">

                              <span className="px-2.5 py-1 rounded-lg bg-primary-100 text-primary-700 text-xs font-bold">
                                {train.trainNumber}
                              </span>

                              <h3 className="font-extrabold text-lg text-slate-900">
                                {train.trainName}
                              </h3>

                            </div>

                            <p className="text-xs text-slate-400 mt-1">
                              Comfortable & secure journey
                            </p>

                          </div>

                        </div>

                        {/* Route */}
                        <div className="grid sm:grid-cols-3 gap-4 items-center">

                          <div>

                            <p className="text-[11px] uppercase tracking-wide font-bold text-slate-400">
                              Departure
                            </p>

                            <p className="font-bold text-slate-800 mt-1">
                              {train.source}
                            </p>

                          </div>

                          <div className="hidden sm:flex items-center gap-2">

                            <div className="h-px bg-slate-200 flex-1" />

                            <div className="w-9 h-9 rounded-full bg-primary-50 border border-primary-100 flex items-center justify-center">
                              <ArrowRight className="w-4 h-4 text-primary-600" />
                            </div>

                            <div className="h-px bg-slate-200 flex-1" />

                          </div>

                          <div className="sm:text-right">

                            <p className="text-[11px] uppercase tracking-wide font-bold text-slate-400">
                              Arrival
                            </p>

                            <p className="font-bold text-slate-800 mt-1">
                              {train.destination}
                            </p>

                          </div>

                        </div>

                        {/* Time */}
                        <div className="flex flex-wrap gap-2 mt-4">

                          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 text-sm">

                            <Clock3 className="w-4 h-4 text-primary-500" />

                            <span className="font-bold text-slate-700">
                              {train.departureTime}
                            </span>

                            <span className="text-slate-400">
                              →
                            </span>

                            <span className="font-bold text-slate-700">
                              {train.arrivalTime}
                            </span>

                          </div>

                          {train.duration && (
                            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-500">
                              <Clock3 className="w-3.5 h-3.5" />
                              {train.duration}
                            </div>
                          )}

                        </div>

                      </div>

                      {/* Divider */}
                      <div className="hidden lg:block w-px h-28 bg-slate-100" />

                      {/* Fare & Booking */}
                      <div className="lg:min-w-[190px]">

                        <div className="flex lg:block items-center justify-between gap-5">

                          <div>

                            <p className="text-xs uppercase tracking-wide font-bold text-slate-400">
                              Starting From
                            </p>

                            <div className="flex items-center text-2xl font-extrabold text-primary-700 mt-1">

                              <IndianRupee className="w-5 h-5" />

                              {train.baseFare}

                            </div>

                          </div>

                          <div
                            className={`flex items-center gap-2 text-xs font-bold mt-2 ${
                              noSeats
                                ? 'text-red-600'
                                : 'text-green-600'
                            }`}
                          >
                            <Armchair className="w-4 h-4" />

                            {noSeats
                              ? 'Sold Out'
                              : `${train.availableSeats} seats left`}
                          </div>

                        </div>

                        <button
                          onClick={() =>
                            navigate(`/book/${train._id}`, {
                              state: { date: filters.date },
                            })
                          }
                          disabled={noSeats}
                          className={`group/btn w-full mt-5 h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                            noSeats
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              : 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 hover:-translate-y-0.5'
                          }`}
                        >
                          {noSeats ? (
                            'Sold Out'
                          ) : (
                            <>
                              Book Now
                              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                            </>
                          )}
                        </button>

                      </div>

                    </div>

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
