import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, TrendingUp, Cpu, Award, Wrench, Layers } from 'lucide-react';

export const HowItWorksPage = () => {
  return (
    <div className="py-12 bg-[#F5F8FC] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
            Evidence-Based Methodology
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#172033] tracking-tight">
            How FixTrail Ranks Solutions
          </h1>
          <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            FixTrail is built on one core principle: The most successful real-world solution must receive more importance than a solution that is simply popular on social media.
          </p>
        </div>

        {/* Section 1: The Wilson Score Engine */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">The Wilson Lower Confidence Bound</h2>
              <span className="text-xs text-slate-500">Eliminating the single-sample 100% fallacy</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Most community websites rank solutions by raw upvotes or unweighted percentages. If Solution B has 1 vote and 1 success, traditional algorithms rank it at 100%, ranking it above Solution A, which has 14 verified successes out of 19 attempts on real hostel benches.
          </p>

          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto space-y-2 border border-slate-800">
            <div className="text-teal-400 font-bold">// Wilson Lower Bound (95% Confidence, z = 1.96)</div>
            <div>S_wilson = (p + z²/(2N) - z * sqrt((p(1-p) + z²/(4N)) / N)) / (1 + z²/N)</div>
            <div className="text-slate-400">// Where N = Total Evaluated Attempts, p = (Worked + 0.5 * Partial) / N</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
              <strong className="text-emerald-950 font-bold block">Solution A: 14 / 19 Worked</strong>
              <span className="text-emerald-800 block">Wilson Bound: <strong>0.5182</strong></span>
              <p className="text-slate-600 text-[11px]">Ranked as Bench-Verified. High statistical certainty.</p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
              <strong className="text-amber-950 font-bold block">Solution B: 1 / 1 Worked</strong>
              <span className="text-amber-800 block">Wilson Bound: <strong>0.2065</strong></span>
              <p className="text-slate-600 text-[11px]">Ranked as Initial Evidence. Sample size too small.</p>
            </div>
          </div>
        </div>

        {/* Section 2: 4-Layer Diagnostic Protocol */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
          <h2 className="text-lg font-bold text-slate-900">The 4-Layer Repair Protocol</h2>
          <div className="space-y-4">
            {[
              {
                title: '1. Symptom Fingerprinting',
                desc: 'Captures exact hardware specs (CPU, RAM type, board revisions), OS versions, and diagnostic blink/beep codes.'
              },
              {
                title: '2. Gemini Multimodal OCR Diagnosis',
                desc: 'Scans device photos and error screens to isolate component codes, swollen lithium-ion pouch cells, or liquid oxidation.'
              },
              {
                title: '3. Guided Safety-Gated Walkthrough',
                desc: 'Presents instructions one step at a time with live timers, required tools, and screen awake locks.'
              },
              {
                title: '4. Direct Outcome Recalibration',
                desc: 'Users report whether the procedure Worked, Partly Worked, or Failed. Out-of-spec attempts update the global database.'
              }
            ].map((p, idx) => (
              <div key={idx} className="flex gap-3 items-start text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-slate-900 block">{p.title}</strong>
                  <span className="text-slate-600">{p.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] text-white font-bold text-xs shadow-md shadow-blue-500/20"
          >
            <Wrench className="w-4 h-4" />
            Explore Proven Solutions
          </Link>
        </div>
      </div>
    </div>
  );
};
