
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Train,
  LogOut,
  User,
  LayoutDashboard,
  Ticket,
  Search,
} from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">

          {/* ================= LOGO ================= */}
          <Link
            to="/"
            className="group flex items-center gap-3"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500/20 rounded-xl blur-md group-hover:blur-lg transition-all" />

              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center shadow-md shadow-primary-500/20 group-hover:scale-105 transition-transform duration-200">
                <Train className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="hidden sm:block">
              <span className="block text-lg font-extrabold tracking-tight text-slate-900 leading-none">
                Train<span className="text-primary-600">Ticket</span>
              </span>

              <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                SMART TRAVEL
              </span>
            </div>
          </Link>

          {/* ================= RIGHT ================= */}
          <div className="flex items-center gap-2 sm:gap-3">

            {user ? (
              <>
                {/* Search */}
                <Link
                  to="/search"
                  className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-all"
                >
                  <Search className="w-4 h-4" />
                  Search Trains
                </Link>

                {/* My Bookings */}
                <Link
                  to="/my-bookings"
                  className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-all"
                >
                  <Ticket className="w-4 h-4" />
                  <span className="hidden lg:inline">
                    My Bookings
                  </span>
                </Link>

                {/* Admin */}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-purple-600 bg-purple-50 hover:bg-purple-100 transition-all"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Admin
                  </Link>
                )}

                {/* User Profile */}
                <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-200">

                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-600 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-primary-500/20">
                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>

                  <div className="hidden lg:block">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-800 max-w-[120px] truncate">
                        {user.name}
                      </span>

                      {isAdmin && (
                        <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold">
                          ADMIN
                        </span>
                      )}
                    </div>

                    <span className="text-[10px] text-slate-400">
                      {isAdmin ? 'Administrator' : 'Passenger'}
                    </span>
                  </div>

                  {/* Small user icon for mobile/tablet */}
                  <User className="w-4 h-4 text-slate-400 lg:hidden" />
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="group flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-all duration-200 shadow-sm"
                >
                  <LogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />

                  <span className="hidden sm:inline">
                    Logout
                  </span>
                </button>
              </>
            ) : (
              <>
                {/* Login */}
                <Link
                  to="/login"
                  className="px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-all"
                >
                  Login
                </Link>

                {/* Register */}
                <Link
                  to="/register"
                  className="group flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-bold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/35 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Register
                  <span className="hidden sm:inline group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

