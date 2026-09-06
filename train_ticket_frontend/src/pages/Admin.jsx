
import { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import {
  Plus,
  Trash2,
  Train,
  MapPin,
  Clock3,
  Armchair,
  IndianRupee,
  X,
  Database,
} from 'lucide-react';

export default function Admin() {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    trainNumber: '',
    trainName: '',
    source: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    duration: '',
    totalSeats: 100,
    baseFare: 500,
  });

  const fetchTrains = () => {
    api.get('/trains')
      .then((res) => setTrains(res.data.trains))
      .catch(() => toast.error('Failed to load trains'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTrains();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === 'totalSeats' || name === 'baseFare'
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/trains', {
        ...form,
        availableSeats: form.totalSeats,
      });

      toast.success('Train added successfully');
      setShowForm(false);

      setForm({
        trainNumber: '',
        trainName: '',
        source: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        duration: '',
        totalSeats: 100,
        baseFare: 500,
      });

      fetchTrains();
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Failed to add train'
      );
    }
  };

  const deleteTrain = async (id) => {
    if (!confirm('Delete this train?')) return;

    try {
      await api.delete(`/trains/${id}`);
      toast.success('Train deleted');
      fetchTrains();
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Delete failed'
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-br from-slate-950 via-primary-900 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-xl">
                <Train className="w-7 h-7 text-white" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-blue-200 font-semibold mb-1">
                  Administration
                </p>

                <h1 className="text-2xl sm:text-3xl font-extrabold">
                  Manage Trains
                </h1>

                <p className="text-sm text-blue-100/80 mt-1">
                  Add, manage and monitor your train schedules.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-primary-700 font-bold shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all"
            >
              {showForm ? (
                <>
                  <X className="w-4 h-4" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Train
                </>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">
                  Total Trains
                </p>
                <p className="text-2xl font-extrabold text-slate-900 mt-1">
                  {trains.length}
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center">
                <Train className="w-5 h-5 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">
                  Available Seats
                </p>
                <p className="text-2xl font-extrabold text-slate-900 mt-1">
                  {trains.reduce(
                    (sum, train) => sum + (train.availableSeats || 0),
                    0
                  )}
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                <Armchair className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">
                  Routes
                </p>
                <p className="text-2xl font-extrabold text-slate-900 mt-1">
                  {new Set(
                    trains.map(
                      (t) => `${t.source}-${t.destination}`
                    )
                  ).size}
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">
                  System
                </p>
                <p className="text-lg font-extrabold text-green-600 mt-1">
                  Online
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                <Database className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

        </div>

        {/* ================= ADD TRAIN FORM ================= */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="relative bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-6 sm:p-8 mb-8"
          >

            <div className="flex items-center gap-3 mb-7">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <Plus className="w-5 h-5 text-primary-600" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Add New Train
                </h2>

                <p className="text-sm text-slate-500">
                  Enter the train and schedule details below.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* Train Number */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Train Number *
                </label>

                <input
                  name="trainNumber"
                  value={form.trainNumber}
                  onChange={handleChange}
                  required
                  placeholder="12345"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/70 outline-none transition focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                />
              </div>

              {/* Train Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Train Name *
                </label>

                <input
                  name="trainName"
                  value={form.trainName}
                  onChange={handleChange}
                  required
                  placeholder="Karachi Express"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/70 outline-none transition focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                />
              </div>

              {/* Source */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Source *
                </label>

                <input
                  name="source"
                  value={form.source}
                  onChange={handleChange}
                  required
                  placeholder="Karachi"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/70 outline-none transition focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                />
              </div>

              {/* Destination */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Destination *
                </label>

                <input
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  required
                  placeholder="Lahore"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/70 outline-none transition focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                />
              </div>

              {/* Departure */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Departure Time *
                </label>

                <input
                  name="departureTime"
                  value={form.departureTime}
                  onChange={handleChange}
                  required
                  placeholder="16:55"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/70 outline-none transition focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                />
              </div>

              {/* Arrival */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Arrival Time *
                </label>

                <input
                  name="arrivalTime"
                  value={form.arrivalTime}
                  onChange={handleChange}
                  required
                  placeholder="08:35"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/70 outline-none transition focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Duration
                </label>

                <input
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  placeholder="15h 40m"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/70 outline-none transition focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                />
              </div>

              {/* Seats */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Total Seats *
                </label>

                <input
                  type="number"
                  name="totalSeats"
                  value={form.totalSeats}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/70 outline-none transition focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                />
              </div>

              {/* Fare */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Base Fare (₹) *
                </label>

                <input
                  type="number"
                  name="baseFare"
                  value={form.baseFare}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/70 outline-none transition focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                />
              </div>

            </div>

            <div className="flex justify-end gap-3 mt-7 pt-6 border-t border-slate-100">

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold shadow-lg shadow-primary-500/20 hover:-translate-y-0.5 hover:shadow-primary-500/30 transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Train
              </button>

            </div>
          </form>
        )}

        {/* ================= TRAIN TABLE ================= */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">

          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Train Schedule
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {trains.length} train{trains.length !== 1 ? 's' : ''} registered
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Live Data
            </div>

          </div>

          {loading ? (
            <div className="py-20 text-center">

              <div className="w-12 h-12 mx-auto rounded-2xl bg-primary-50 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
              </div>

              <p className="text-sm text-slate-500 mt-4">
                Loading train schedules...
              </p>
            </div>
          ) : trains.length === 0 ? (
            <div className="py-20 text-center px-6">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center">
                <Train className="w-7 h-7 text-slate-400" />
              </div>

              <h3 className="text-lg font-bold text-slate-800 mt-4">
                No trains found
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Add your first train to get started.
              </p>

              <button
                onClick={() => setShowForm(true)}
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition"
              >
                <Plus className="w-4 h-4" />
                Add Train
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px]">

                <thead>
                  <tr className="bg-slate-50/80 text-left">

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Train
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Route
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Schedule
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Seats
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Fare
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {trains.map((t) => (
                    <tr
                      key={t._id}
                      className="group hover:bg-slate-50/70 transition-colors"
                    >

                      {/* Train */}
                      <td className="px-5 py-5">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                            <Train className="w-5 h-5 text-primary-600" />
                          </div>

                          <div>
                            <p className="font-bold text-slate-800">
                              {t.trainName}
                            </p>

                            <p className="text-xs font-mono text-slate-400 mt-0.5">
                              #{t.trainNumber}
                            </p>
                          </div>

                        </div>

                      </td>

                      {/* Route */}
                      <td className="px-5 py-5">

                        <div className="flex items-center gap-2">

                          <span className="font-semibold text-slate-700">
                            {t.source}
                          </span>

                          <span className="text-primary-400">
                            →
                          </span>

                          <span className="font-semibold text-slate-700">
                            {t.destination}
                          </span>

                        </div>

                        {t.duration && (
                          <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                            <Clock3 className="w-3 h-3" />
                            {t.duration}
                          </div>
                        )}

                      </td>

                      {/* Timing */}
                      <td className="px-5 py-5">

                        <div className="flex items-center gap-2 text-sm">

                          <span className="px-2.5 py-1 rounded-lg bg-green-50 text-green-700 font-semibold">
                            {t.departureTime}
                          </span>

                          <span className="text-slate-300">
                            →
                          </span>

                          <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-semibold">
                            {t.arrivalTime}
                          </span>

                        </div>

                      </td>

                      {/* Seats */}
                      <td className="px-5 py-5">

                        <div className="flex items-center gap-2">

                          <Armchair className="w-4 h-4 text-slate-400" />

                          <div>
                            <p className="text-sm font-bold text-slate-700">
                              {t.availableSeats}
                            </p>

                            <p className="text-xs text-slate-400">
                              of {t.totalSeats}
                            </p>
                          </div>

                        </div>

                      </td>

                      {/* Fare */}
                      <td className="px-5 py-5">

                        <div className="flex items-center gap-1">
                          <IndianRupee className="w-4 h-4 text-primary-500" />

                          <span className="font-bold text-slate-800">
                            {t.baseFare}
                          </span>
                        </div>

                        <p className="text-xs text-slate-400">
                          Base fare
                        </p>

                      </td>

                      {/* Action */}
                      <td className="px-5 py-5 text-right">

                        <button
                          onClick={() => deleteTrain(t._id)}
                          title="Delete train"
                          className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </td>

                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}

