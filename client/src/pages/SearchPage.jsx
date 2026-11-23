import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, HelpCircle, Wrench, Layers, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [questions, setQuestions] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    const runSearch = async () => {
      setLoading(true);
      try {
        const [qRes, sRes, mRes] = await Promise.all([
          api.get(`/questions?search=${encodeURIComponent(query)}`),
          api.get(`/solutions?search=${encodeURIComponent(query)}`),
          api.get(`/devices/models?search=${encodeURIComponent(query)}`)
        ]);

        if (qRes.success) setQuestions(qRes.data);
        if (sRes.success) setSolutions(sRes.data);
        if (mRes.success) setModels(mRes.data);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    runSearch();
  }, [query]);

  return (
    <div className="py-10 bg-[#F5F8FC] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card">
          <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
            Search Results
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#172033] tracking-tight mt-1">
            Results for "{query}"
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Found {solutions.length} verified solutions, {questions.length} community questions, and {models.length} hardware profiles.
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl p-12 text-center text-xs text-slate-500 border border-slate-200">
            Searching FixTrail intelligence database...
          </div>
        ) : (
          <div className="space-y-8">
            {/* Matching Solutions */}
            {solutions.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-teal-600" />
                  Matching Ranked Solutions ({solutions.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {solutions.map((sol) => (
                    <div key={sol._id} className="bg-white rounded-xl p-5 border border-slate-200 hover:border-teal-400 transition-all space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {sol.stats?.evidenceLevel || 'High'}
                        </span>
                        <span className="font-mono text-slate-500">Wilson: {sol.stats?.wilsonScore}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        <Link to={`/solutions/${sol._id}`} className="hover:text-blue-600">
                          {sol.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2">{sol.rootCause}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Matching Questions */}
            {questions.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  Community Questions ({questions.length})
                </h2>
                <div className="space-y-3">
                  {questions.map((q) => (
                    <div key={q._id} className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-400 transition-all flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">
                          <Link to={`/questions/${q._id}`} className="hover:text-blue-600">
                            {q.title}
                          </Link>
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{q.description}</p>
                      </div>
                      <span className="text-xs font-mono font-semibold text-slate-600 shrink-0">
                        {q.score} votes
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {solutions.length === 0 && questions.length === 0 && models.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center text-xs text-slate-500 border border-slate-200">
                No results found for "{query}". Try searching for terms like "black screen", "RAM", or "Dell".
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
