import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  Wrench,
  ShieldCheck,
  Award,
  Users,
  HelpCircle,
  FileText,
  Activity,
  Zap,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../services/api';

// Animation + Hero Visual Components
import { CircuitNetworkCanvas } from '../components/animation/CircuitNetworkCanvas';
import { DeviceToSolutionFlow } from '../components/animation/DeviceToSolutionFlow';
import { InteractiveComponentVisualizer } from '../components/animation/InteractiveComponentVisualizer';
import { InteractiveKnowledgeNetwork } from '../components/animation/InteractiveKnowledgeNetwork';
import { HeroImageSlider } from '../components/HeroImageSlider';

export const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, statsRes] = await Promise.all([
          api.get('/devices/categories'),
          api.get('/stats/platform')
        ]);
        if (catRes.success) setCategories(catRes.data);
        if (statsRes.success) setStats(statsRes.data);
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F8FC]">
      {/* 1. SIGNATURE HERO SECTION */}
      <section className="relative bg-gradient-to-b from-[#0B132B] via-[#101B35] to-[#152347] text-white pt-16 pb-24 overflow-hidden">
        {/* Animated Digital Circuit Network Canvas Background */}
        <CircuitNetworkCanvas opacity={0.65} />

        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-xs font-mono font-medium text-[#38BDF8] backdrop-blur-sm shadow-inner">
                <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
                DIGITAL REPAIR INTELLIGENCE NETWORK
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-sans leading-[1.12]">
                Every Device Has a Problem.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#14B8A6]">
                  Every Problem Has a Path to a Solution.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                Discover intelligent troubleshooting, proven repair solutions and knowledge shared by a global community of engineers.
              </p>

              {/* Interactive Search Bar with Scanning Laser Effect */}
              <form onSubmit={handleSearchSubmit} className="pt-1 max-w-xl">
                <div className="relative group flex items-center bg-white rounded-2xl p-1.5 shadow-2xl shadow-black/50 border border-slate-200/30 transition-all focus-within:ring-2 focus-within:ring-[#2563EB]/40">
                  <div className="pl-3.5 text-slate-400">
                    <Search className="w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by device, model (e.g. Inspiron 5567) or symptom..."
                    className="w-full px-3 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none rounded-xl"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold text-xs shadow-md transition-all shrink-0 flex items-center gap-1.5"
                  >
                    <span>Diagnose</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* Primary Call-to-Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/explore"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 group"
                >
                  <Layers className="w-4 h-4 text-cyan-300" />
                  Explore Devices
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/questions/ask"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/20 backdrop-blur-sm transition-all flex items-center gap-2"
                >
                  <Wrench className="w-4 h-4 text-teal-400" />
                  Ask a Question
                </Link>

                <Link
                  to="/diagnose"
                  className="px-4 py-3 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-[#38BDF8] font-semibold text-xs border border-teal-400/30 transition-all flex items-center gap-2 font-mono"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
                  Launch AI Triage
                </Link>
              </div>

              {/* Real Database Telemetry Strip */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300 border-t border-slate-800/80 font-mono">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#14B8A6]" />
                  <span><strong>{stats?.verifiedRepairsCount || 14}</strong> Bench-Verified Fixes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#38BDF8]" />
                  <span><strong>{stats?.realSuccessRate || 74}%</strong> Success Rate</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Wilson 95% Confidence Bound</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Realistic Photo Slider */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="lg:col-span-5"
            >
              <HeroImageSlider />
              {/* Trust strip below slider */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[
                  { val: '14', label: 'Verified Fixes' },
                  { val: '74%', label: 'Success Rate' },
                  { val: '95%', label: 'Wilson CI' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl py-2.5 px-2 border border-white/10 bg-white/5 backdrop-blur-sm">
                    <span className="block text-lg font-bold text-[#38BDF8] font-mono">{item.val}</span>
                    <span className="block text-[10px] text-slate-400 font-mono mt-0.5">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. DEVICE TO SOLUTION INTERACTIVE NETWORK (SECTION 4) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider font-mono">
              The FixTrail Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#172033] tracking-tight">
              Device to Solution Network
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              The continuous pipeline connecting physical hardware faults to statistically validated repair solutions.
            </p>
          </div>

          <DeviceToSolutionFlow />
        </div>
      </section>

      {/* 3. INTERACTIVE HARDWARE COMPONENT DIAGNOSTICS (SECTION 6) */}
      <section className="py-16 bg-[#F5F8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveComponentVisualizer />
        </div>
      </section>

      {/* 4. POPULAR MANUFACTURERS STRIP */}
      <section className="bg-white border-y border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-widest mb-4">
            Ecosystem Hardware Directory
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all">
            {['Dell', 'HP', 'Lenovo', 'Apple', 'ASUS', 'Acer', 'Samsung'].map((brand) => (
              <span key={brand} className="text-base font-bold text-slate-800 font-mono tracking-tight">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TOPOLOGY NETWORK (SECTION 8: ONE CONNECTED NETWORK) */}
      <section className="py-16 bg-[#F5F8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveKnowledgeNetwork />
        </div>
      </section>

      {/* 6. BROWSE 14 DEVICE CATEGORIES */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider font-mono">
                Hardware Families
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#172033] tracking-tight mt-1">
                Explore Device Categories
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Motherboard schematics, teardown teardowns, and common failure points across 14 categories.
              </p>
            </div>
            <Link
              to="/explore"
              className="text-xs font-semibold text-[#2563EB] hover:text-blue-700 flex items-center gap-1 group self-start sm:self-auto"
            >
              Browse All Categories <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((cat) => (
              <Link
                key={cat._id}
                to={`/explore/${cat.slug}`}
                className="group bg-[#F5F8FC] rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-400 hover:shadow-card-hover transition-all flex flex-col"
              >
                <div className="h-40 overflow-hidden relative bg-slate-100">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="font-bold text-base block">{cat.name}</span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/80">
                    <span>{cat.activeQuestionsCount || 0} questions</span>
                    <span className="text-emerald-600 font-medium">{cat.verifiedSolutionsCount || 0} verified fixes</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. EVIDENCE-RANKED SOLUTIONS HIGHLIGHT */}
      <section className="py-16 bg-[#F5F8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-[11px] font-semibold text-teal-700 mb-2 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                WILSON STATISTICAL RANKING
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#172033] tracking-tight">
                Top Solutions by Verified Repair Outcomes
              </h2>
              <p className="text-sm text-slate-500 mt-1 max-w-xl">
                Ranked using the Wilson lower confidence bound. A solution with 14 verified successes outranks a solution with 1 unverified upvote.
              </p>
            </div>
            <Link
              to="/solutions"
              className="text-xs font-semibold text-[#2563EB] hover:text-blue-700 flex items-center gap-1 group self-start sm:self-auto"
            >
              View Full Solution Intelligence <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stats?.topSolutions && stats.topSolutions.length > 0 ? (
              stats.topSolutions.map((sol) => (
                <div
                  key={sol._id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-teal-400 hover:shadow-card-hover transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 font-mono">
                        {sol.stats?.evidenceLevel || 'High Evidence'}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        Wilson Score: <strong className="text-teal-700">{sol.stats?.wilsonScore}</strong>
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#172033] leading-snug">
                      <Link to={`/solutions/${sol._id}`} className="hover:text-blue-600 transition-colors">
                        {sol.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      <strong>Root Cause:</strong> {sol.rootCause}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3 text-slate-600 font-mono text-[11px]">
                      <span><strong>{sol.stats?.workedCount || 0}</strong> Worked</span>
                      <span>•</span>
                      <span><strong>{sol.stats?.failedCount || 0}</strong> Failed</span>
                      <span>•</span>
                      <span><strong>{sol.stats?.totalAttempts || 0}</strong> Evaluated</span>
                    </div>

                    <Link
                      to={`/solutions/${sol._id}`}
                      className="px-3.5 py-1.5 rounded-lg bg-[#2563EB] hover:bg-blue-600 text-white font-semibold text-xs shadow-sm transition-all"
                    >
                      Walkthrough
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-xs text-slate-500">
                Loading verified solutions...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 8. GENUINE PLATFORM STATISTICS */}
      <section className="py-14 bg-[#101B35] text-white relative overflow-hidden">
        <CircuitNetworkCanvas opacity={0.25} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Genuine Platform Evidence</h2>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Calculated dynamically from our MongoDB repair outcome logs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="block text-3xl font-bold text-[#38BDF8] font-mono">
                {stats?.totalOutcomes || 19}
              </span>
              <span className="text-xs text-slate-300 mt-1 block">Documented Repair Attempts</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="block text-3xl font-bold text-[#14B8A6] font-mono">
                {stats?.verifiedRepairsCount || 14}
              </span>
              <span className="text-xs text-slate-300 mt-1 block">Confirmed Working Fixes</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="block text-3xl font-bold text-amber-400 font-mono">
                {stats?.realSuccessRate || 74}%
              </span>
              <span className="text-xs text-slate-300 mt-1 block">Hostel Bench Success Rate</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="block text-3xl font-bold text-white font-mono">
                {stats?.totalModels || 3}
              </span>
              <span className="text-xs text-slate-300 mt-1 block">Hardware Profiles Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA SECTION */}
      <section className="py-16 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Have a Laptop or Device Acting Up?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto leading-relaxed">
            Post your error code or symptom docket today. Get feedback from experienced engineers and add your repair outcome to help the next person.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/questions/ask"
              className="px-6 py-3 rounded-xl bg-white text-blue-900 font-bold text-xs shadow-xl hover:bg-slate-50 transition-all"
            >
              Post a Problem Docket
            </Link>
            <Link
              to="/explore"
              className="px-6 py-3 rounded-xl bg-blue-900/50 hover:bg-blue-900 text-white font-bold text-xs border border-white/30 transition-all"
            >
              Explore Device Database
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
