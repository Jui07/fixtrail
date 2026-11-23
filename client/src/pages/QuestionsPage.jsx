import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, PlusCircle, CheckCircle2, Eye, MessageSquare, ThumbsUp, Filter, Search } from 'lucide-react';
import { api } from '../services/api';

export const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [sortFilter, setSortFilter] = useState('newest');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      let query = `?sort=${sortFilter}`;
      if (statusFilter) query += `&status=${statusFilter}`;
      if (search) query += `&search=${encodeURIComponent(search)}`;

      const res = await api.get(`/questions${query}`);
      if (res.success) {
        setQuestions(res.data);
      }
    } catch (err) {
      console.error('Failed to load questions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [statusFilter, sortFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchQuestions();
  };

  return (
    <div className="py-10 bg-[#F5F8FC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Bar */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#172033] tracking-tight">
              Community Hardware Questions
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Real problem dockets posted by students, technicians, and device owners.
            </p>
          </div>

          <Link
            to="/questions/ask"
            className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 self-start md:self-auto shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            Ask a Question
          </Link>
        </div>

        {/* Filter Controls & Search */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search problem titles, error codes..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </form>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="open">Open (Unresolved)</option>
              <option value="resolved">Resolved with Solution</option>
            </select>

            <select
              value={sortFilter}
              onChange={(e) => setSortFilter(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="score">Highest Voted</option>
              <option value="views">Most Viewed</option>
            </select>
          </div>
        </div>

        {/* Questions Feed */}
        <div className="space-y-4">
          {loading ? (
            <div className="bg-white rounded-2xl p-12 text-center text-xs text-slate-500 border border-slate-200">
              Loading community dockets...
            </div>
          ) : questions.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center space-y-3 border border-slate-200">
              <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="text-sm font-semibold text-slate-800">No questions found matching criteria</h3>
              <p className="text-xs text-slate-500">Be the first to post a technical problem docket!</p>
              <Link
                to="/questions/ask"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2563EB] text-white text-xs font-semibold"
              >
                Post Docket
              </Link>
            </div>
          ) : (
            questions.map((q) => (
              <div
                key={q._id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 hover:border-blue-300 hover:shadow-card-hover transition-all flex flex-col sm:flex-row gap-5 items-start"
              >
                {/* Stats / Votes Column */}
                <div className="flex sm:flex-col items-center gap-3 sm:gap-2 sm:w-20 shrink-0 text-slate-600 text-center">
                  <div className="flex items-center sm:flex-col gap-1">
                    <span className="text-base font-bold text-slate-900">{q.score}</span>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">votes</span>
                  </div>

                  <div className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                    q.acceptedAnswerId ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-50 text-slate-600'
                  }`}>
                    <span className="block font-bold">{q.answersCount || 0}</span>
                    <span className="text-[9px] uppercase">answers</span>
                  </div>

                  <div className="text-[11px] text-slate-400 hidden sm:block">
                    {q.views} views
                  </div>
                </div>

                {/* Content Column */}
                <div className="flex-1 space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    {q.status === 'resolved' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Solved
                      </span>
                    )}
                    {q.modelId && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {q.modelId.name}
                      </span>
                    )}
                    {q.errorCodes?.map((code, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        {code}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#172033] hover:text-blue-600 transition-colors">
                    <Link to={`/questions/${q._id}`}>
                      {q.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {q.description}
                  </p>

                  {/* Tags & Author Meta */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap gap-1.5">
                      {q.tags?.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-600">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 ml-auto">
                      <img
                        src={q.authorId?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                        alt={q.authorId?.username}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="font-medium text-slate-800">{q.authorId?.username || 'user'}</span>
                      <span className="text-[11px] text-teal-600 font-mono font-semibold">
                        ({q.authorId?.reputationPoints || 0} pts)
                      </span>
                      <span>•</span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(q.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
