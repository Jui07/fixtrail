import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, ArrowRight, Search, Wrench, AlertTriangle, Layers, Activity } from 'lucide-react';
import { api } from '../services/api';

export const SolutionsPage = () => {
  const [solutions, setSolutions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category') || '';
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/devices/categories')
      .then((res) => { if (res.success) setCategories(res.data); })
      .catch(console.error);
  }, []);

  const fetchSolutions = async () => {
    setLoading(true);
    try {
      let query = '?';
      if (selectedCategory) query += `categoryId=${selectedCategory}&`;
      if (selectedDifficulty) query += `difficulty=${selectedDifficulty}&`;
      if (search) query += `search=${encodeURIComponent(search)}&`;

      const res = await api.get(`/solutions${query}`);
      if (res.success) {
        setSolutions(res.data);
      }
    } catch (err) {
      console.error('Failed to load solutions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, [selectedCategory, selectedDifficulty]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchSolutions();
  };

  return (
    <div className="py-10 bg-[#F5F8FC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Bar */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Statistical Wilson Score Ranking
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#172033] tracking-tight">
              Evidence-Ranked Solution Library
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Every repair procedure is scored on actual hardware bench attempts. Zero guesswork.
            </p>
          </div>

          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 max-w-sm">
            <strong>Wilson Bound Algorithm:</strong> Requires consistent multi-device successes to achieve High / Bench-Verified evidence rank.
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by root cause, symptom (e.g. black screen)..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </form>

          <div className="flex items-center gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 bg-white rounded-2xl p-12 text-center text-xs text-slate-500 border border-slate-200">
              Loading ranked repair solutions...
            </div>
          ) : solutions.length === 0 ? (
            <div className="col-span-3 bg-white rounded-2xl p-12 text-center text-xs text-slate-500 border border-slate-200">
              No solutions found matching criteria.
            </div>
          ) : (
            solutions.map((sol) => (
              <div
                key={sol._id}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-teal-400 hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                      sol.stats?.evidenceLevel === 'Bench-Verified'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : sol.stats?.evidenceLevel === 'High'
                        ? 'bg-blue-100 text-blue-800 border-blue-300'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {sol.stats?.evidenceLevel || 'Initial'}
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

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {sol.description}
                  </p>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    <strong className="block text-slate-900 font-semibold mb-0.5">Root Cause:</strong>
                    <span className="line-clamp-2">{sol.rootCause}</span>
                  </div>

                  {/* Target Models tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {sol.targetModels?.map((m) => (
                      <span key={m._id} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700">
                        {m.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Outcome Stats Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-slate-600 space-x-1">
                    <strong className="text-emerald-700 font-bold">{sol.stats?.workedCount || 0}</strong>
                    <span>worked</span>
                    <span>/</span>
                    <span>{sol.stats?.totalAttempts || 0} tried</span>
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
          )}
        </div>
      </div>
    </div>
  );
};
