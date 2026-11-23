import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wrench, Eye, EyeOff, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SignupPage = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  // Password strength calculation
  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strengthScore = getPasswordStrength();
  const strengthLabels = ['Too Weak', 'Weak', 'Fair', 'Strong', 'Excellent'];
  const strengthColors = ['bg-slate-200', 'bg-red-500', 'bg-amber-500', 'bg-blue-500', 'bg-emerald-500'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!agreeTerms) {
      setError('Please agree to the FixTrail Terms & Engineering Code of Conduct.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);
    try {
      await register(fullName.trim(), username.trim(), email.trim(), password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row bg-[#F5F8FC]">
      {/* Left Side: Brand Visual & Value Proposition */}
      <div className="md:w-1/2 bg-gradient-to-br from-[#101B35] via-[#101B35] to-[#1E3A8A] text-white p-8 md:p-14 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#14B8A6] flex items-center justify-center text-white shadow-md shadow-blue-500/25">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">FixTrail</span>
          </Link>

          <div className="pt-8 space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-teal-500/20 text-[#14B8A6] border border-teal-400/30">
              Join 500+ Engineers & Technicians
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Evidence Over Guesswork. <br />
              Join the Repair Bench.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              Create an account to register your devices, log repair dockets, access step-by-step schematics, and earn reputation by reporting real outcomes.
            </p>
          </div>
        </div>

        {/* Realistic Motherboard / Repair Photo Card */}
        <div className="relative z-10 my-8 rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900 group">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80"
            alt="Motherboard and electronics components"
            loading="eager"
            crossOrigin="anonymous"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&auto=format&fit=crop&q=80";
            }}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
          <div className="p-3.5 bg-[#101B35]/95 border-t border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-teal-400 font-medium">
              <ShieldCheck className="w-4 h-4" /> Wilson Confidence Ranking
            </span>
            <span className="text-[11px] font-mono text-slate-400">Zero Synthetic Claims</span>
          </div>
        </div>

        <div className="relative z-10 text-xs text-slate-400 flex items-center justify-between border-t border-slate-800 pt-4">
          <span>Encrypted with bcrypt & secure tokens</span>
          <span>Open community standards</span>
        </div>
      </div>

      {/* Right Side: Clean White Signup Card */}
      <div className="md:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-card">
          <div className="space-y-2 mb-6">
            <h1 className="text-2xl font-bold text-[#172033] tracking-tight">Create Account</h1>
            <p className="text-xs text-slate-500">
              Get immediate access to verified repair intelligence.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Vikram Joshi"
                className="w-full px-3.5 py-2 text-xs text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all placeholder:text-slate-400"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="vikram_tech"
                  className="w-full px-3.5 py-2 text-xs text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all placeholder:text-slate-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vikram@domain.com"
                  className="w-full px-3.5 py-2 text-xs text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 characters (letters + numbers)"
                  className="w-full px-3.5 py-2 text-xs text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all placeholder:text-slate-400 pr-10"
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

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`h-full flex-1 rounded-full transition-all ${
                          strengthScore >= step ? strengthColors[strengthScore] : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Strength: <strong className="text-slate-700">{strengthLabels[strengthScore]}</strong></span>
                    <span>Use 8+ chars, upper & symbols</span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-type password"
                className="w-full px-3.5 py-2 text-xs text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all placeholder:text-slate-400"
                required
              />
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB] w-4 h-4 mt-0.5 shrink-0"
                  required
                />
                <span className="text-xs text-slate-600 leading-snug">
                  I agree to the <a href="#terms" className="text-[#2563EB] underline">Terms of Service</a> and commit to reporting authentic repair outcomes.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            Already have a FixTrail account?{' '}
            <Link to="/login" className="text-[#2563EB] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
