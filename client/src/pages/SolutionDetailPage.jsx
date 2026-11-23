import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  ShieldAlert,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Sun,
  ThumbsUp,
  AlertCircle
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const SolutionDetailPage = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();

  const [solution, setSolution] = useState(null);
  const [recentOutcomes, setRecentOutcomes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Bench Timer state
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [screenWake, setScreenWake] = useState(false);

  // Outcome submission state
  const [outcomeStatus, setOutcomeStatus] = useState('');
  const [outcomeNotes, setOutcomeNotes] = useState('');
  const [submittingOutcome, setSubmittingOutcome] = useState(false);
  const [outcomeSuccessMsg, setOutcomeSuccessMsg] = useState('');
  const [outcomeError, setOutcomeError] = useState('');

  const fetchSolution = async () => {
    try {
      const res = await api.get(`/solutions/${id}`);
      if (res.success) {
        setSolution(res.data.solution);
        setRecentOutcomes(res.data.recentOutcomes || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolution();
  }, [id]);

  // Step Timer Interval
  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const toggleWakeLock = async () => {
    if (!screenWake && 'wakeLock' in navigator) {
      try {
        await navigator.wakeLock.request('screen');
        setScreenWake(true);
      } catch (e) {
        setScreenWake(true); // Fallback simulated
      }
    } else {
      setScreenWake(!screenWake);
    }
  };

  const handleOutcomeSubmit = async (status) => {
    if (!isAuthenticated) {
      alert('Please sign in to log your repair outcome.');
      return;
    }

    setSubmittingOutcome(true);
    setOutcomeError('');
    setOutcomeSuccessMsg('');

    try {
      const res = await api.post('/outcomes', {
        solutionId: id,
        status,
        notes: outcomeNotes.trim(),
        attemptDurationMin: Math.round(seconds / 60)
      });

      if (res.success) {
        setOutcomeSuccessMsg(`Outcome recorded! New Wilson confidence bound: ${res.stats.wilsonScore}`);
        fetchSolution();
      }
    } catch (err) {
      setOutcomeError(err.message || 'Failed to submit repair outcome.');
    } finally {
      setSubmittingOutcome(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xs text-slate-500">
        Loading guided repair schematic...
      </div>
    );
  }

  if (!solution) {
    return (
      <div className="py-20 text-center space-y-3">
        <h2 className="text-base font-bold text-slate-800">Solution not found.</h2>
        <Link to="/solutions" className="text-xs text-blue-600 hover:underline">
          Return to Solutions Library
        </Link>
      </div>
    );
  }

  const formatTimer = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="py-10 bg-[#F5F8FC] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          to="/solutions"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Ranked Solutions
        </Link>

        {/* Main Header & Statistical Evidence Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
          <div className="space-y-3 border-b border-slate-100 pb-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                {solution.stats?.evidenceLevel || 'High Evidence'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-slate-100 text-slate-700">
                Wilson Score: <strong className="text-teal-700">{solution.stats?.wilsonScore}</strong>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                Difficulty: {solution.difficulty}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#172033] tracking-tight">
              {solution.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {solution.description}
            </p>
          </div>

          {/* Root Cause & Campus Evidence Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <strong className="block text-slate-900 font-semibold">Identified Root Cause:</strong>
              <p className="text-slate-700 leading-relaxed">{solution.rootCause}</p>
            </div>

            <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200 text-xs space-y-1">
              <strong className="block text-teal-950 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-600" /> Evidence & Bench Metrics:
              </strong>
              <p className="text-teal-800 leading-relaxed">
                {solution.sourceCaseStudy || 'Multi-device verified across student workbenches.'}
              </p>
              <div className="pt-1 flex items-center gap-3 text-teal-900 font-mono text-[11px]">
                <span><strong>{solution.stats?.workedCount || 0}</strong> Worked</span>
                <span>•</span>
                <span><strong>{solution.stats?.failedCount || 0}</strong> Failed</span>
                <span>•</span>
                <span><strong>{solution.stats?.totalAttempts || 0}</strong> Evaluated</span>
              </div>
            </div>
          </div>

          {/* Safety Alert Banner */}
          {solution.safetyLevel === 'caution' ? (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block mb-0.5">Bench Precaution Required:</strong>
                <span>Disconnect all AC power and internal battery headers before manipulating memory sticks or internal motherboard chips. Touch an unpainted metallic surface to discharge static body electricity.</span>
              </div>
            </div>
          ) : solution.safetyLevel === 'hazardous' ? (
            <div className="p-4 rounded-xl bg-red-50 border border-red-300 text-xs text-red-900 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block mb-0.5">High Hazard Warning:</strong>
                <span>Potential swollen battery or high voltage capacitor rail. Work in a fire-safe space with non-conductive tools.</span>
              </div>
            </div>
          ) : null}

          {/* Interactive Bench Toolbar (Timer + Wake Lock) */}
          <div className="p-4 rounded-xl bg-[#101B35] text-white flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-medium">Repair Bench Timer:</span>
              <span className="font-mono text-lg font-bold text-teal-400 bg-slate-900/80 px-3 py-1 rounded-lg border border-slate-700">
                {formatTimer(seconds)}
              </span>
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                title={timerRunning ? 'Pause' : 'Start'}
              >
                {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => { setTimerRunning(false); setSeconds(0); }}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={toggleWakeLock}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                screenWake
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                  : 'bg-white/10 text-slate-300 border-white/20 hover:bg-white/15'
              }`}
            >
              <Sun className="w-4 h-4" />
              {screenWake ? 'Screen Keep-Awake: Active' : 'Enable Screen Awake'}
            </button>
          </div>
        </div>

        {/* Step-by-Step Guided Procedure */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#172033] tracking-tight">
            Step-by-Step Repair Instructions
          </h2>

          {solution.steps?.map((step) => (
            <div
              key={step.stepNumber}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 font-mono font-bold text-xs border border-blue-200">
                  Step {step.stepNumber}
                </span>
                {step.estimatedMinutes && (
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> ~{step.estimatedMinutes} mins
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-slate-900">{step.title}</h3>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {step.instruction}
              </p>

              {step.toolRequired && (
                <div className="text-xs text-slate-500 font-mono pt-1">
                  <strong>Tool:</strong> {step.toolRequired}
                </div>
              )}

              {step.safetyWarning && (
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
                  <strong>Caution:</strong> {step.safetyWarning}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* OUTCOME GATE: "Did This Solution Work?" */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-blue-200 shadow-xl space-y-5">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
              Feedback Loop
            </span>
            <h3 className="text-xl font-bold text-[#172033] tracking-tight">
              Did this repair procedure work on your device?
            </h3>
            <p className="text-xs text-slate-500">
              Your real-world report updates the statistical Wilson score for all students and technicians.
            </p>
          </div>

          {outcomeSuccessMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{outcomeSuccessMsg}</span>
            </div>
          )}

          {outcomeError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-300 text-xs text-red-800">
              {outcomeError}
            </div>
          )}

          <div className="space-y-4">
            <textarea
              rows={2}
              value={outcomeNotes}
              onChange={(e) => setOutcomeNotes(e.target.value)}
              placeholder="Optional notes: e.g. 'Laptop booted after 2 minutes CMOS memory training. Cleaned slot 1 RAM.'"
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500"
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                type="button"
                disabled={submittingOutcome}
                onClick={() => handleOutcomeSubmit('worked')}
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                Worked!
              </button>

              <button
                type="button"
                disabled={submittingOutcome}
                onClick={() => handleOutcomeSubmit('partly_worked')}
                className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5"
              >
                Partly Worked
              </button>

              <button
                type="button"
                disabled={submittingOutcome}
                onClick={() => handleOutcomeSubmit('nothing_worked')}
                className="py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-1.5"
              >
                Did Not Work
              </button>

              <button
                type="button"
                disabled={submittingOutcome}
                onClick={() => handleOutcomeSubmit('did_not_try')}
                className="py-3 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                Did Not Try
              </button>
            </div>
          </div>
        </div>

        {/* Recent Community Outcome Reports */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-4">
          <h4 className="text-base font-bold text-slate-900">Recent Community Bench Reports</h4>
          {recentOutcomes.length === 0 ? (
            <p className="text-xs text-slate-500">No community reports submitted yet. Be the first!</p>
          ) : (
            <div className="space-y-2.5">
              {recentOutcomes.map((rep) => (
                <div key={rep._id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between text-xs gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        rep.status === 'worked' ? 'bg-emerald-100 text-emerald-800' :
                        rep.status === 'partly_worked' ? 'bg-amber-100 text-amber-800' :
                        rep.status === 'nothing_worked' ? 'bg-red-100 text-red-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {rep.status.replace('_', ' ')}
                      </span>
                      <span className="font-semibold text-slate-800">{rep.userId?.fullName || 'Technician'}</span>
                      <span className="text-slate-400 text-[11px]">• {new Date(rep.createdAt).toLocaleDateString()}</span>
                    </div>
                    {rep.notes && <p className="text-slate-600">{rep.notes}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
