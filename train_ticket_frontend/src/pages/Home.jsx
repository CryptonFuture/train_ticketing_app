
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  Ticket,
  Shield,
  Zap,
  Train,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-primary-900 to-primary-700 text-white">

        {/* Background Glow */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-48 left-1/2 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />

        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-28 lg:py-32">

          <div className="max-w-4xl mx-auto text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-7 rounded-full border border-white/15 bg-white/10 backdrop-blur-md text-sm text-blue-100 shadow-lg">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Smart & Secure Train Booking</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-7">
              Book Your Train Tickets
              <br />

              <span className="bg-gradient-to-r from-blue-200 via-white to-cyan-200 bg-clip-text text-transparent">
                Fast, Easy & Secure
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-blue-100/90 max-w-2xl mx-auto leading-relaxed mb-10">
              Search trains, compare fares, and book your journey in seconds.
              Experience a smarter way to travel with our modern booking
              platform.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">

              <Link
                to={user ? '/search' : '/register'}
                className="group inline-flex items-center justify-center gap-2 bg-white text-primary-700 px-8 py-3.5 rounded-xl font-bold text-base sm:text-lg shadow-xl shadow-black/10 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
              >
                {user ? 'Search Trains' : 'Get Started'}

                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>

              {!user && (
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl border border-white/30 bg-white/5 backdrop-blur-md text-white font-bold text-base sm:text-lg hover:bg-white/15 hover:-translate-y-1 transition-all duration-300"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-10 text-sm text-blue-100/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-300" />
                Secure Booking
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-300" />
                Real-time Availability
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-300" />
                Easy Cancellation
              </div>
            </div>
          </div>

          {/* Floating Train Card */}
          <div className="hidden lg:flex justify-center mt-16">
            <div className="relative flex items-center gap-5 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-2xl">

              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Train className="w-6 h-6 text-blue-200" />
              </div>

              <div className="text-left">
                <p className="text-sm font-semibold text-white">
                  Your journey starts here
                </p>
                <p className="text-xs text-blue-100/70 mt-1">
                  Simple • Fast • Reliable
                </p>
              </div>

              <div className="ml-4 w-2 h-2 rounded-full bg-green-400 shadow-lg shadow-green-400/50" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="relative max-w-7xl mx-auto px-4 py-20 sm:py-24">

        <div className="text-center max-w-2xl mx-auto mb-14">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-600 text-xs font-bold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            Why Choose Us
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Everything you need for a
            <span className="text-primary-600"> better journey</span>
          </h2>

          <p className="text-slate-500 mt-4">
            A modern train booking experience designed to make your travel
            simple and stress-free.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">

          {/* Smart Search */}
          <div className="group relative bg-white border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">

            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-100/50 rounded-full blur-2xl group-hover:bg-primary-200/60 transition" />

            <div className="relative">

              <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Search className="w-7 h-7 text-primary-600" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Smart Search
              </h3>

              <p className="text-slate-500 leading-relaxed">
                Find trains quickly by source, destination and travel date
                with real-time availability.
              </p>

              <div className="flex items-center gap-2 mt-6 text-sm font-semibold text-primary-600">
                Fast & convenient
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Dynamic Pricing */}
          <div className="group relative bg-white border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">

            <div className="absolute -right-10 -top-10 w-32 h-32 bg-green-100/60 rounded-full blur-2xl" />

            <div className="relative">

              <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-green-600" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Dynamic Pricing
              </h3>

              <p className="text-slate-500 leading-relaxed">
                Python-powered fare calculations with distance and demand
                factors for smarter pricing.
              </p>

              <div className="flex items-center gap-2 mt-6 text-sm font-semibold text-green-600">
                Smart fare engine
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Secure Booking */}
          <div className="group relative bg-white border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">

            <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-100/60 rounded-full blur-2xl" />

            <div className="relative">

              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-purple-600" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Secure Booking
              </h3>

              <p className="text-slate-500 leading-relaxed">
                JWT authentication, confirmed PNR and easy cancellation keep
                your booking secure.
              </p>

              <div className="flex items-center gap-2 mt-6 text-sm font-semibold text-purple-600">
                Safe & reliable
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-4 pb-20">

        <div className="relative max-w-5xl mx-auto overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-700 via-primary-600 to-blue-600 text-white shadow-2xl">

          {/* CTA Background */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-20 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl" />

          <div className="relative px-6 py-14 sm:px-12 sm:py-16 text-center">

            <div className="mx-auto w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-5 border border-white/10">
              <Ticket className="w-7 h-7 text-white" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Ready to start your journey?
            </h2>

            <p className="text-blue-100 max-w-xl mx-auto mb-8">
              Create your account today and book your next train journey in
              less than a minute.
            </p>

            <Link
              to={user ? '/search' : '/register'}
              className="group inline-flex items-center gap-2 bg-white text-primary-700 px-8 py-3.5 rounded-xl font-bold shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
            >
              {user ? 'Search Trains' : 'Register Free'}

              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>

          </div>
        </div>
      </section>

    </div>
  );
}

