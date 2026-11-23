import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, AlertCircle, Wrench, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const AskQuestionPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [models, setModels] = useState([]);

  const [categoryId, setCategoryId] = useState('');
  const [manufacturerId, setManufacturerId] = useState('');
  const [modelId, setModelId] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [osVersion, setOsVersion] = useState('');
  const [biosVersion, setBiosVersion] = useState('');
  const [symptomsInput, setSymptomsInput] = useState('');
  const [errorCodesInput, setErrorCodesInput] = useState('');
  const [troubleshootingAttempted, setTroubleshootingAttempted] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/questions/ask' } } });
      return;
    }

    const loadMetadata = async () => {
      try {
        const [catRes, mfgRes] = await Promise.all([
          api.get('/devices/categories'),
          api.get('/devices/manufacturers')
        ]);
        if (catRes.success) setCategories(catRes.data);
        if (mfgRes.success) setManufacturers(mfgRes.data);
      } catch (err) {
        console.error('Failed to load form metadata:', err);
      }
    };
    loadMetadata();
  }, [isAuthenticated]);

  useEffect(() => {
    if (manufacturerId) {
      api.get(`/devices/models?manufacturerId=${manufacturerId}`)
        .then((res) => {
          if (res.success) setModels(res.data);
        })
        .catch(console.error);
    } else {
      setModels([]);
    }
  }, [manufacturerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !description.trim() || !categoryId) {
      setError('Please provide title, category, and full description of the problem.');
      return;
    }

    setLoading(true);
    try {
      const symptoms = symptomsInput.split(',').map((s) => s.trim()).filter(Boolean);
      const errorCodes = errorCodesInput.split(',').map((c) => c.trim()).filter(Boolean);
      const tags = tagsInput.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean);

      const res = await api.post('/questions', {
        title: title.trim(),
        description: description.trim(),
        categoryId,
        manufacturerId: manufacturerId || undefined,
        modelId: modelId || undefined,
        osVersion: osVersion.trim(),
        biosVersion: biosVersion.trim(),
        symptoms,
        errorCodes,
        troubleshootingAttempted: troubleshootingAttempted.trim(),
        tags
      });

      if (res.success && res.data) {
        navigate(`/questions/${res.data._id}`);
      }
    } catch (err) {
      setError(err.message || 'Failed to submit question.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 bg-[#F5F8FC] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card">
          <div className="space-y-1 mb-6">
            <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
              Service Intake
            </span>
            <h1 className="text-2xl font-bold text-[#172033] tracking-tight">
              Post a Problem Docket
            </h1>
            <p className="text-xs text-slate-500">
              Provide specific hardware indicators so the Wilson ranking algorithm and technician community can match proven fixes.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            {/* Device Hierarchy Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Device Category *
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Select Category...</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Manufacturer
                </label>
                <select
                  value={manufacturerId}
                  onChange={(e) => setManufacturerId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Brand...</option>
                  {manufacturers.map((m) => (
                    <option key={m._id} value={m._id}>{m.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Model Profile
                </label>
                <select
                  value={modelId}
                  onChange={(e) => setModelId(e.target.value)}
                  disabled={!models.length}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                >
                  <option value="">Select Model...</option>
                  {models.map((m) => (
                    <option key={m._id} value={m._id}>{m.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Problem Title */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Problem Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Dell Inspiron 15 5567 power light flashes 3 amber, 2 white with black screen"
                className="w-full px-3.5 py-2.5 text-xs text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500"
                required
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Be specific: include brand, model, and observable symptom.
              </span>
            </div>

            {/* Diagnostic Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  LED Blink Code / Beep Code (Optional)
                </label>
                <input
                  type="text"
                  value={errorCodesInput}
                  onChange={(e) => setErrorCodesInput(e.target.value)}
                  placeholder="e.g. 3-Amber 2-White, Beep-3"
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Symptoms (Comma separated)
                </label>
                <input
                  type="text"
                  value={symptomsInput}
                  onChange={(e) => setSymptomsInput(e.target.value)}
                  placeholder="black screen, fan spinning, no post"
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* OS & BIOS version */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Operating System (Optional)
                </label>
                <input
                  type="text"
                  value={osVersion}
                  onChange={(e) => setOsVersion(e.target.value)}
                  placeholder="e.g. Windows 11 23H2 or macOS Sonoma"
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  BIOS / Firmware Version (Optional)
                </label>
                <input
                  type="text"
                  value={biosVersion}
                  onChange={(e) => setBiosVersion(e.target.value)}
                  placeholder="e.g. 1.2.8 or F.24"
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
            </div>

            {/* Troubleshooting Already Attempted */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Troubleshooting Already Attempted
              </label>
              <textarea
                rows={2}
                value={troubleshootingAttempted}
                onChange={(e) => setTroubleshootingAttempted(e.target.value)}
                placeholder="e.g. Disconnected charger, pressed power button for 10s, tried external HDMI display with no signal."
                className="w-full px-3.5 py-2 text-xs text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Full Problem Description */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Detailed Problem Description *
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain what happened immediately before the failure occurred. Did it overheat, freeze, take an update, or sustain a drop?"
                className="w-full px-3.5 py-2.5 text-xs text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="dell, ram, black-screen, power"
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all disabled:opacity-50"
            >
              {loading ? 'Submitting to Bench...' : 'Post Question to Community'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
