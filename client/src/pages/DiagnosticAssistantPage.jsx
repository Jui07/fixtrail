import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  Sparkles,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Camera,
  FileText,
  Search,
  Wrench,
  Layers
} from 'lucide-react';
import { api } from '../services/api';

export const DiagnosticAssistantPage = () => {
  const [activeTab, setActiveTab] = useState('tree'); // 'tree' | 'triage' | 'vision'

  // Decision tree state
  const [currentNode, setCurrentNode] = useState(null);
  const [matchedSolution, setMatchedSolution] = useState(null);
  const [history, setHistory] = useState([]);
  const [treeLoading, setTreeLoading] = useState(false);

  // Natural language triage state
  const [problemText, setProblemText] = useState('');
  const [triageResult, setTriageResult] = useState(null);
  const [triaging, setTriaging] = useState(false);

  // Vision OCR inspection state
  const [visionResult, setVisionResult] = useState(null);
  const [scanning, setScanning] = useState(false);

  // Load root decision tree node
  const fetchNode = async (nodeId, pushHistory = true) => {
    setTreeLoading(true);
    try {
      const res = await api.post('/ai/decision-tree', { nodeId });
      if (res.success) {
        if (pushHistory && currentNode) {
          setHistory((prev) => [...prev, currentNode.id]);
        }
        setCurrentNode(res.data.node);
        setMatchedSolution(res.data.matchedSolution);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTreeLoading(false);
    }
  };

  useEffect(() => {
    fetchNode('root', false);
  }, []);

  const resetTree = () => {
    setHistory([]);
    fetchNode('root', false);
  };

  const handleTriageSubmit = async (e) => {
    e.preventDefault();
    if (!problemText.trim()) return;

    setTriaging(true);
    try {
      const res = await api.post('/ai/triage', { problemText });
      if (res.success) {
        setTriageResult(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTriaging(false);
    }
  };

  const handleRunVisionDemo = async () => {
    setScanning(true);
    try {
      const res = await api.post('/ai/vision-inspect', { imageType: 'bsod' });
      if (res.success) {
        setVisionResult(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="py-10 bg-[#F5F8FC] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
              <Cpu className="w-3.5 h-3.5 text-blue-600" /> FixTrail Intelligence Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#172033] tracking-tight">
              Interactive Diagnostic Assistant
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Isolate hardware faults systematically using guided decision branches, NLP triage, and OCR vision analysis.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold self-start md:self-auto border border-slate-200">
            <button
              onClick={() => setActiveTab('tree')}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                activeTab === 'tree' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Decision Tree
            </button>
            <button
              onClick={() => setActiveTab('triage')}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                activeTab === 'triage' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              NLP Triage
            </button>
            <button
              onClick={() => setActiveTab('vision')}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                activeTab === 'vision' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Visual Scanner
            </button>
          </div>
        </div>

        {/* TAB 1: GUIDED DECISION TREE */}
        {activeTab === 'tree' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                  Hardware Diagnostic Logic Flow
                </span>
              </div>
              <button
                onClick={resetTree}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Start Over
              </button>
            </div>

            {treeLoading ? (
              <div className="py-12 text-center text-xs text-slate-500">
                Evaluating diagnostic branch...
              </div>
            ) : currentNode?.isTerminal ? (
              /* Terminal Diagnosis Card */
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/60 to-teal-50/60 border-2 border-teal-300 space-y-5 animate-in fade-in">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800 border border-teal-300">
                      Terminal Diagnosis Isolated
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">{currentNode.title}</h3>
                    <span className="text-xs font-mono text-emerald-700 font-bold block">
                      Confidence: {currentNode.confidence}
                    </span>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-teal-600 shrink-0" />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {currentNode.explanation}
                </p>

                {currentNode.safetyWarning && (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Precaution:</strong> {currentNode.safetyWarning}</span>
                  </div>
                )}

                {matchedSolution && (
                  <div className="pt-3 border-t border-teal-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] text-slate-500 block">Matched Wilson-Ranked Solution:</span>
                      <strong className="text-xs text-slate-900">{matchedSolution.title}</strong>
                      <span className="text-[11px] font-mono text-teal-700 block">
                        Wilson Bound: {matchedSolution.stats?.wilsonScore} ({matchedSolution.stats?.workedCount} verified fixes)
                      </span>
                    </div>

                    <Link
                      to={`/solutions/${matchedSolution._id}`}
                      className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all"
                    >
                      Open Repair Walkthrough <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              /* Diagnostic Question Node */
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-mono text-blue-600 font-bold block mb-1">
                    DIAGNOSTIC TEST POINT:
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {currentNode?.question}
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {currentNode?.options?.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => fetchNode(opt.next)}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/20 text-left transition-all flex items-center justify-between group shadow-sm"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-blue-700">
                        {opt.text}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: NATURAL LANGUAGE NLP TRIAGE */}
        {activeTab === 'triage' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900">Conversational Problem Intake</h2>
              <p className="text-xs text-slate-500">
                Type what happened in normal words (e.g. "Spilled tea on keyboard, screen turned off, light blinks 3 amber 2 white").
              </p>
            </div>

            <form onSubmit={handleTriageSubmit} className="space-y-4">
              <textarea
                rows={4}
                value={problemText}
                onChange={(e) => setProblemText(e.target.value)}
                placeholder="Describe symptoms, sounds, smells, or physical events..."
                className="w-full px-3.5 py-2.5 text-xs text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500"
                required
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setProblemText('Spilled hot tea on laptop while studying in hostel. Keyboard stopped responding and smells burnt.')}
                    className="text-[11px] text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded border border-blue-200"
                  >
                    Test: Liquid Spill Sample
                  </button>
                  <button
                    type="button"
                    onClick={() => setProblemText('Dell Inspiron power button led turns on and blinks 3 amber then 2 white. Screen completely black.')}
                    className="text-[11px] text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded border border-blue-200"
                  >
                    Test: 3 Amber 2 White RAM Code
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={triaging}
                  className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  {triaging ? 'Analyzing...' : 'Run Triage Analysis'}
                </button>
              </div>
            </form>

            {/* Triage Results Display */}
            {triageResult && (
              <div className="space-y-4 pt-4 border-t border-slate-100 animate-in fade-in">
                {/* Critical Safety Hazard Alert */}
                {triageResult.hazard && (
                  <div className="p-4 rounded-xl bg-red-50 border-2 border-red-400 text-red-900 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm text-red-950">
                      <ShieldAlert className="w-5 h-5 text-red-600" />
                      {triageResult.hazard.title}
                    </div>
                    <p className="text-xs text-red-800 leading-relaxed font-medium">
                      {triageResult.hazard.message}
                    </p>
                  </div>
                )}

                {/* Detected Symptoms */}
                {triageResult.detectedSymptoms?.length > 0 && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                    <strong className="text-slate-800 font-semibold block">Extracted Diagnostic Symptoms:</strong>
                    <div className="flex flex-wrap gap-1.5">
                      {triageResult.detectedSymptoms.map((sym, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-medium">
                          {sym}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommended Solutions */}
                {triageResult.matchingSolutions?.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <h3 className="text-xs font-semibold text-slate-700 uppercase">
                      Matching Proven Solutions ({triageResult.matchingSolutions.length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {triageResult.matchingSolutions.map((sol) => (
                        <div key={sol._id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
                          <h4 className="font-bold text-xs text-slate-900">
                            <Link to={`/solutions/${sol._id}`} className="hover:text-blue-600">
                              {sol.title}
                            </Link>
                          </h4>
                          <span className="text-[11px] font-mono text-teal-700 block">
                            Wilson Bound: {sol.stats?.wilsonScore}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: VISUAL SCANNER */}
        {activeTab === 'vision' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900">Visual Component & OCR Inspector</h2>
              <p className="text-xs text-slate-500">
                Upload photos of motherboard component labels, burnt MOSFETs, or blue screen stop codes.
              </p>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center space-y-3 bg-slate-50 hover:bg-slate-100/60 transition-colors">
              <Camera className="w-10 h-10 text-slate-400 mx-auto" />
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-800 block">Upload error photo or drag and drop</span>
                <span className="text-[11px] text-slate-400">PNG, JPG, WebP up to 10MB</span>
              </div>
              <button
                type="button"
                onClick={handleRunVisionDemo}
                disabled={scanning}
                className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-semibold text-xs shadow-sm transition-all"
              >
                {scanning ? 'Running OCR Inspection...' : 'Simulate Inspection on Error Screen'}
              </button>
            </div>

            {visionResult && (
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-xs font-bold text-slate-800">OCR Text Extraction Result</span>
                  <span className="text-[11px] font-mono text-emerald-700 font-bold">
                    Confidence: {Math.round(visionResult.ocrConfidence * 100)}%
                  </span>
                </div>

                <div className="p-3 bg-slate-900 text-teal-400 font-mono text-xs rounded-lg">
                  {visionResult.detectedText}
                </div>

                <div className="space-y-1 text-xs">
                  <strong className="text-slate-900 block font-semibold">Identified Root Fault:</strong>
                  <p className="text-slate-700">{visionResult.identifiedFault}</p>
                </div>

                <div className="p-3 rounded-lg bg-teal-50 border border-teal-200 text-xs text-teal-900 space-y-1">
                  <strong className="block font-semibold">Recommended Field Action:</strong>
                  <p>{visionResult.recommendedAction}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
