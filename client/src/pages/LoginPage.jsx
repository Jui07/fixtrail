import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Wrench, Eye, EyeOff, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!emailOrUsername.trim() || !password) {
      setError('Please enter both your email/username and password.');
      return;
    }

    setLoading(true);
    try {
      await login(emailOrUsername.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row bg-[#F5F8FC]">
      {/* Left Side: Deep Navy / Blue Gradient Visual & Value Proposition */}
      <div className="md:w-1/2 bg-gradient-to-br from-[#101B35] via-[#101B35] to-[#1E3A8A] text-white p-8 md:p-14 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle dot matrix */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#14B8A6] flex items-center justify-center text-white shadow-md shadow-blue-500/25">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">FixTrail</span>
          </Link>

          <div className="pt-8 space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-500/20 text-[#38BDF8] border border-blue-400/30">
              Community Repair Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Your Device Deserves a Smarter Solution.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              Sign in to track your registered hardware repair passports, post problem dockets, access Wilson-ranked solutions, and earn community reputation.
            </p>
          </div>
        </div>

        {/* Realistic Hardware Workstation Photo Card */}
        <div className="relative z-10 my-8 rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900 group">
          <img
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
            alt="Device repair technician bench"
            loading="eager"
            crossOrigin="anonymous"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80";
            }}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
          <div className="p-3.5 bg-[#101B35]/95 border-t border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-teal-400 font-medium">
              <ShieldCheck className="w-4 h-4" /> Statistically Defensible Solutions
            </span>
            <span className="text-[11px] font-mono text-slate-400">Bench Tested</span>
          </div>
        </div>

        <div className="relative z-10 text-xs text-slate-400 flex items-center justify-between border-t border-slate-800 pt-4">
          <span>Protected by HttpOnly session tokens</span>
          <span>Zero synthetic metrics</span>
        </div>
      </div>

      {/* Right Side: Clean White Login Card */}
      <div className="md:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-card">
          <div className="space-y-2 mb-8">
            <h1 className="text-2xl font-bold text-[#172033] tracking-tight">Welcome Back</h1>
            <p className="text-xs text-slate-500">
              Enter your credentials to access your FixTrail workbench.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address or Username
              </label>
              <input
                type="text"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder="e.g. rajesh.sharma@fixtrail.tech or admin"
                className="w-full px-3.5 py-2.5 text-xs text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all placeholder:text-slate-400"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset: Demo accounts available: admin / AdminPass123! or rajesh.sharma@fixtrail.tech / ExpertPass123!'); }} className="text-xs text-[#2563EB] hover:underline font-medium">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 text-xs text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all placeholder:text-slate-400 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB] w-4 h-4"
                />
                <span className="text-slate-600">Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <span>Sign In to Workbench</span>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Assistant */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-xs space-y-1.5 text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="font-semibold text-slate-700 block">Pre-seeded Test Credentials:</span>
            <div className="flex justify-between items-center text-[11px]">
              <span>Admin: <strong className="text-slate-800">admin</strong> / <code>AdminPass123!</code></span>
              <button
                type="button"
                onClick={() => { setEmailOrUsername('admin'); setPassword('AdminPass123!'); }}
                className="text-[#2563EB] hover:underline font-medium text-[10px]"
              >
                Auto-fill
              </button>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span>Expert: <strong className="text-slate-800">rajesh_tech</strong> / <code>ExpertPass123!</code></span>
              <button
                type="button"
                onClick={() => { setEmailOrUsername('rajesh_tech'); setPassword('ExpertPass123!'); }}
                className="text-[#2563EB] hover:underline font-medium text-[10px]"
              >
                Auto-fill
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-slate-500">
            Don't have a FixTrail account?{' '}
            <Link to="/signup" className="text-[#2563EB] font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
