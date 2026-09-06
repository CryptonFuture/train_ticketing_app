
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  Train,
  User,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(form);
      toast.success('Account created successfully!');
      navigate('/search');
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 via-white to-primary-50">

      {/* Background Decorations */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-24 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />

      {/* Main Container */}
      <div className="relative w-full max-w-lg">

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl shadow-slate-200/70 rounded-3xl p-7 sm:p-9">

          {/* Logo */}
          <div className="flex justify-center mb-5">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-2xl" />

              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
                <Train className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-7">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Create Your Account
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              Join{' '}
              <span className="font-semibold text-primary-600">
                TrainTicket
              </span>{' '}
              and start your journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>

              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Phone Number
                <span className="ml-1 text-xs font-normal text-slate-400">
                  (Optional)
                </span>
              </label>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  placeholder="Minimum 6 characters"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                />
              </div>

              <div className="flex items-center gap-2 mt-2">
                <div className="h-1 flex-1 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      form.password.length >= 10
                        ? 'w-full bg-green-500'
                        : form.password.length >= 6
                        ? 'w-2/3 bg-yellow-400'
                        : 'w-1/3 bg-slate-300'
                    }`}
                  />
                </div>

                <span className="text-[11px] text-slate-400">
                  {form.password.length >= 10
                    ? 'Strong'
                    : form.password.length >= 6
                    ? 'Good'
                    : '6+ chars'}
                </span>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full h-12 mt-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Login */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-primary-600 hover:text-primary-700 hover:underline"
            >
              Login
            </Link>
          </p>

          {/* Security Info */}
          <div className="mt-6 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 shrink-0 rounded-lg bg-white shadow-sm flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-800">
                  Your information is secure
                </p>

                <p className="text-xs text-slate-500 mt-0.5">
                  Your account details are protected with secure
                  authentication.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-center gap-2 mt-6 text-[11px] text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Secure registration
            <span>•</span>
            TrainTicket
          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-xs text-slate-400 mt-5">
          Your journey starts here 🚆
        </p>
      </div>
    </div>
  );
}

