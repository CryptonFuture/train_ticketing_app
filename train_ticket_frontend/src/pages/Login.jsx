
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  Train,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/search');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 via-white to-primary-50">

      {/* Background Decorations */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-24 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl shadow-slate-200/70 rounded-3xl p-8 sm:p-9">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-2xl" />

              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
                <Train className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Welcome Back
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              Login to continue to{' '}
              <span className="font-semibold text-primary-600">
                TrainTicket
              </span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full h-12 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Register */}
          <p className="text-center text-sm text-slate-500 mt-7">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-primary-600 hover:text-primary-700 hover:underline"
            >
              Create an account
            </Link>
          </p>

          {/* Demo Admin */}
          <div className="relative mt-7 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-4">

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 shrink-0 rounded-lg bg-white shadow-sm flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
              </div>

             
            </div>
          </div>

          {/* Bottom */}
          <div className="flex items-center justify-center gap-2 mt-7 text-[11px] text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Secure authentication
            <span>•</span>
            TrainTicket
          </div>
        </div>

        {/* Bottom shadow text */}
        <p className="text-center text-xs text-slate-400 mt-5">
          Book your journey with confidence 🚆
        </p>
      </div>
    </div>
  );
}

