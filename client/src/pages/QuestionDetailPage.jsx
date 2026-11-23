import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  Clock,
  Eye,
  MessageSquare,
  ShieldAlert,
  AlertTriangle,
  Award,
  ChevronUp,
  ChevronDown,
  Send,
  AlertCircle
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const QuestionDetailPage = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswerContent, setNewAnswerContent] = useState('');
  const [newAnswerDifficulty, setNewAnswerDifficulty] = useState('beginner');
  const [newAnswerSafety, setNewAnswerSafety] = useState('safe');
  const [newAnswerTools, setNewAnswerTools] = useState('');

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchQuestionData = async () => {
    try {
      const res = await api.get(`/questions/${id}`);
      if (res.success) {
        setQuestion(res.data.question);
        setAnswers(res.data.answers);
      }
    } catch (err) {
      console.error('Failed to load question detail:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionData();
  }, [id]);

  const handleVoteQuestion = async (value) => {
    if (!isAuthenticated) return alert('Please sign in to vote.');
    try {
      const res = await api.post(`/questions/${id}/vote`, { value });
      if (res.success) {
        setQuestion((prev) => ({ ...prev, score: res.score }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleVoteAnswer = async (answerId, value) => {
    if (!isAuthenticated) return alert('Please sign in to vote.');
    try {
      const res = await api.post(`/questions/answers/${answerId}/vote`, { value });
      if (res.success) {
        setAnswers((prev) =>
          prev.map((a) => (a._id === answerId ? { ...a, score: res.score } : a))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAcceptAnswer = async (answerId) => {
    try {
      const res = await api.post(`/questions/${id}/answers/${answerId}/accept`, {});
      if (res.success) {
        setAnswers((prev) =>
          prev.map((a) => ({ ...a, isAccepted: a._id === answerId }))
        );
        setQuestion((prev) => ({ ...prev, status: 'resolved', acceptedAnswerId: answerId }));
      }
    } catch (err) {
      alert(err.message || 'Failed to accept answer.');
    }
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (!newAnswerContent.trim()) return;

    setSubmitting(true);
    setError('');
    try {
      const tools = newAnswerTools.split(',').map((t) => t.trim()).filter(Boolean);
      const res = await api.post(`/questions/${id}/answers`, {
        content: newAnswerContent.trim(),
        difficulty: newAnswerDifficulty,
        safetyLevel: newAnswerSafety,
        requiredTools: tools
      });

      if (res.success) {
        setNewAnswerContent('');
        setNewAnswerTools('');
        fetchQuestionData();
      }
    } catch (err) {
      setError(err.message || 'Failed to submit answer.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xs text-slate-500">
        Loading problem docket and community solutions...
      </div>
    );
  }

  if (!question) {
    return (
      <div className="py-20 text-center space-y-3">
        <h2 className="text-base font-bold text-slate-800">Question not found.</h2>
        <Link to="/questions" className="text-xs text-blue-600 hover:underline">
          Return to Community Feed
        </Link>
      </div>
    );
  }

  const isAuthor = user && question.authorId && user._id === question.authorId._id;

  return (
    <div className="py-10 bg-[#F5F8FC] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Main Question Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
          {/* Header & Badges */}
          <div className="space-y-3 border-b border-slate-100 pb-5">
            <div className="flex flex-wrap items-center gap-2">
              {question.status === 'resolved' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Solved Problem
                </span>
              )}
              {question.categoryId && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                  {question.categoryId.name}
                </span>
              )}
              {question.modelId && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200">
                  {question.modelId.name}
                </span>
              )}
              {question.errorCodes?.map((code, idx) => (
                <span key={idx} className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  Code: {code}
                </span>
              ))}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#172033] tracking-tight">
              {question.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <span>Asked on {new Date(question.createdAt).toLocaleDateString()}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {question.views} views</span>
              <span>•</span>
              <span>{answers.length} community answers</span>
            </div>
          </div>

          {/* Voting & Content Layout */}
          <div className="flex gap-6 items-start">
            {/* Voting Column */}
            <div className="flex flex-col items-center gap-1 text-slate-600 shrink-0">
              <button
                onClick={() => handleVoteQuestion(1)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition-colors"
                title="Upvote technical question"
              >
                <ChevronUp className="w-6 h-6" />
              </button>
              <span className="font-bold text-base text-slate-900 font-mono">{question.score}</span>
              <button
                onClick={() => handleVoteQuestion(-1)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-red-600 transition-colors"
                title="Downvote"
              >
                <ChevronDown className="w-6 h-6" />
              </button>
            </div>

            {/* Description Body */}
            <div className="flex-1 space-y-4 text-xs sm:text-sm text-slate-800 leading-relaxed">
              <div className="whitespace-pre-line bg-slate-50/60 p-4 rounded-xl border border-slate-100 font-sans">
                {question.description}
              </div>

              {question.troubleshootingAttempted && (
                <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-900">
                  <strong className="block mb-1 text-amber-950 font-semibold">Prior Troubleshooting Attempted:</strong>
                  {question.troubleshootingAttempted}
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {question.tags?.map((tag, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded text-xs bg-slate-100 text-slate-600 font-mono">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Author Attribution Card */}
              <div className="pt-4 flex justify-end">
                <div className="p-3 bg-blue-50/40 rounded-xl border border-blue-100 text-xs flex items-center gap-3">
                  <img
                    src={question.authorId?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                    alt={question.authorId?.username}
                    className="w-8 h-8 rounded-lg object-cover ring-1 ring-blue-200"
                  />
                  <div>
                    <span className="text-[11px] text-slate-400 block">Reported by</span>
                    <span className="font-bold text-slate-900">{question.authorId?.fullName || question.authorId?.username}</span>
                    <span className="text-[11px] text-teal-600 font-mono block">
                      {question.authorId?.reputationPoints || 0} reputation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Answers Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#172033] tracking-tight">
              {answers.length} {answers.length === 1 ? 'Community Solution' : 'Community Solutions'}
            </h2>
          </div>

          {answers.map((ans) => (
            <div
              key={ans._id}
              className={`bg-white rounded-2xl p-6 border transition-all ${
                ans.isAccepted
                  ? 'border-emerald-300 ring-2 ring-emerald-500/20 shadow-md'
                  : 'border-slate-200 shadow-card'
              }`}
            >
              <div className="flex gap-5 items-start">
                {/* Answer Voting & Accepted Badge Column */}
                <div className="flex flex-col items-center gap-1 text-slate-600 shrink-0">
                  <button
                    onClick={() => handleVoteAnswer(ans._id, 1)}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-blue-600"
                  >
                    <ChevronUp className="w-5 h-5" />
                  </button>
                  <span className="font-bold text-sm text-slate-900 font-mono">{ans.score}</span>
                  <button
                    onClick={() => handleVoteAnswer(ans._id, -1)}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-red-600"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </button>

                  {ans.isAccepted && (
                    <div className="mt-2 text-emerald-600" title="Question owner accepted this solution">
                      <CheckCircle2 className="w-6 h-6 fill-emerald-100" />
                    </div>
                  )}

                  {isAuthor && !ans.isAccepted && (
                    <button
                      onClick={() => handleAcceptAnswer(ans._id)}
                      className="mt-2 text-[10px] text-slate-400 hover:text-emerald-600 font-semibold p-1 rounded hover:bg-emerald-50 text-center"
                      title="Mark as accepted fix"
                    >
                      Accept
                    </button>
                  )}
                </div>

                {/* Answer Body */}
                <div className="flex-1 space-y-4 text-xs sm:text-sm text-slate-800">
                  {ans.isAccepted && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold text-xs border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Accepted Resolution by Author
                    </div>
                  )}

                  <div className="whitespace-pre-line leading-relaxed font-sans">
                    {ans.content}
                  </div>

                  {/* Step by step guide if provided */}
                  {ans.steps && ans.steps.length > 0 && (
                    <div className="mt-4 space-y-2 border-t border-slate-100 pt-3">
                      <span className="text-xs font-semibold text-slate-700 block">Walkthrough Sequence:</span>
                      {ans.steps.map((step) => (
                        <div key={step.stepNumber} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                          <span className="font-bold text-blue-700">Step {step.stepNumber}: {step.title}</span>
                          <p className="text-slate-600">{step.instruction}</p>
                          {step.toolRequired && (
                            <span className="text-[11px] text-slate-500 font-mono block">Tool: {step.toolRequired}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Required Tools & Safety */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium capitalize">
                        Level: {ans.difficulty}
                      </span>
                      <span className={`px-2 py-0.5 rounded font-medium capitalize ${
                        ans.safetyLevel === 'safe' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        Safety: {ans.safetyLevel}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500">
                      <img
                        src={ans.authorId?.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'}
                        alt={ans.authorId?.username}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="font-semibold text-slate-900">{ans.authorId?.fullName || ans.authorId?.username}</span>
                      <span className="text-teal-600 font-mono font-semibold">({ans.authorId?.reputationPoints || 0} rep)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Post Answer Form */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">Your Technical Answer</h3>
            <p className="text-xs text-slate-500">
              Explain why this solution works, mention any safety precautions, and list required tools.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
              {error}
            </div>
          )}

          {isAuthenticated ? (
            <form onSubmit={handleAnswerSubmit} className="space-y-4 text-xs">
              <textarea
                rows={5}
                value={newAnswerContent}
                onChange={(e) => setNewAnswerContent(e.target.value)}
                placeholder="Write your diagnostic solution clearly. If possible, list step-by-step instructions..."
                className="w-full px-3.5 py-2.5 text-xs text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Difficulty</label>
                  <select
                    value={newAnswerDifficulty}
                    onChange={(e) => setNewAnswerDifficulty(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-blue-500"
                  >
                    <option value="beginner">Beginner (No opening required)</option>
                    <option value="intermediate">Intermediate (Screw driver needed)</option>
                    <option value="advanced">Advanced (Board soldering / Multimeter)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Safety Risk</label>
                  <select
                    value={newAnswerSafety}
                    onChange={(e) => setNewAnswerSafety(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-blue-500"
                  >
                    <option value="safe">Safe (Software / External)</option>
                    <option value="caution">Caution (Disconnect battery)</option>
                    <option value="hazardous">Hazardous (High voltage / Swollen cell)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Required Tools</label>
                  <input
                    type="text"
                    value={newAnswerTools}
                    onChange={(e) => setNewAnswerTools(e.target.value)}
                    placeholder="PH0, Spudger, Eraser"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="py-2.5 px-5 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                {submitting ? 'Submitting...' : 'Post Your Solution'}
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <p className="text-xs text-slate-600">Please sign in to post an answer and earn reputation.</p>
              <Link
                to="/login"
                className="inline-block px-4 py-2 rounded-lg bg-[#2563EB] text-white text-xs font-semibold"
              >
                Sign In to Answer
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
