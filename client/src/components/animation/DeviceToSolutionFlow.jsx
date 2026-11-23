import React, { useState } from 'react';
import {
  Laptop,
  AlertTriangle,
  Cpu,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

export const DeviceToSolutionFlow = () => {
  const [activeStep, setActiveStep] = useState(2); // Default to AI Diagnosis

  const steps = [
    {
      num: '01',
      id: 'device',
      title: 'Device Profile',
      tagline: 'Hardware Identification',
      icon: Laptop,
      color: 'blue',
      description: 'Capture exact model revisions, motherboard schematics, CPU/RAM configurations, and screw standoff depths.',
      metrics: 'Over 14 device categories mapped',
      status: 'HARDWARE_SYNCED'
    },
    {
      num: '02',
      id: 'symptom',
      title: 'Symptom & Signal',
      tagline: 'Observable Indicators',
      icon: AlertTriangle,
      color: 'amber',
      description: 'Extract diagnostic blink rhythms (e.g. 3 Amber, 2 White), beep codes, and instant safety flags for liquid or battery bloat.',
      metrics: 'Instant Hazard Interception',
      status: 'SIGNAL_DECODED'
    },
    {
      num: '03',
      id: 'ai',
      title: 'AI Diagnostic Core',
      tagline: 'Multimodal Reasoning',
      icon: Cpu,
      color: 'cyan',
      description: 'Traverses interactive decision trees and performs visual OCR inspection on blue screens to isolate the component fault.',
      metrics: 'Decision Tree Logic Branching',
      status: 'FAULT_ISOLATED'
    },
    {
      num: '04',
      id: 'community',
      title: 'Community Knowledge',
      tagline: 'Peer Engineer Benches',
      icon: Users,
      color: 'indigo',
      description: 'Cross-references real repair dockets documented across college hostels and professional repair workstations.',
      metrics: 'Peer-Reviewed Bench Dockets',
      status: 'BENCH_MATCHED'
    },
    {
      num: '05',
      id: 'solution',
      title: 'Proven Solution',
      tagline: 'Wilson Score Validated',
      icon: CheckCircle2,
      color: 'teal',
      description: 'Calculates the statistical Wilson lower confidence bound. Multi-device tested fixes rank highest with verified outcomes.',
      metrics: 'Wilson Score: 0.5182 (14/19 Worked)',
      status: 'OUTCOME_CONFIRMED'
    }
  ];

  return (
    <div className="space-y-8">
      {/* 5-Stage Interactive Pipeline Stepper */}
      <div className="relative">
        {/* Background Connecting Glow Line */}
        <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-blue-600 via-[#38BDF8] to-[#14B8A6] -translate-y-1/2 z-0 rounded-full opacity-30" />

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 relative group flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#2563EB] shadow-xl shadow-blue-500/10 ring-2 ring-[#2563EB]/20 scale-[1.02]'
                    : 'bg-white/80 border-slate-200 hover:border-blue-300 hover:bg-white shadow-card'
                }`}
              >
                {/* Active Indicator Top Pill */}
                <div className="flex items-center justify-between w-full mb-3">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600'
                  }`}>
                    STAGE {step.num}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  )}
                </div>

                <div className="space-y-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-500'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 leading-tight">
                    {step.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 font-medium">
                    {step.tagline}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono">
                  <span className={isSelected ? 'text-blue-600 font-bold' : 'text-slate-400'}>
                    {step.status}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Deep-Dive Active Stage Highlight Card */}
      <div className="bg-gradient-to-br from-[#101B35] via-[#101B35] to-[#152347] rounded-2xl p-6 sm:p-8 text-white border border-slate-700/80 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-[#38BDF8] border border-blue-400/30 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
              STAGE {steps[activeStep].num} ARCHITECTURE INSIGHT
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-white">
              {steps[activeStep].title}: {steps[activeStep].tagline}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              {steps[activeStep].description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-teal-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#14B8A6]" /> {steps[activeStep].metrics}
              </span>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-start md:justify-end">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 font-mono text-xs space-y-2 w-full max-w-xs">
              <div className="text-slate-400 text-[10px] pb-1 border-b border-slate-800">
                PIPELINE STATE TRACE:
              </div>
              <div className="text-cyan-300 font-bold text-xs">
                &gt; {steps[activeStep].status}
              </div>
              <div className="text-slate-400 text-[11px]">
                Target: {activeStep === 4 ? 'REPAIR_CONFIRMED' : steps[(activeStep + 1) % 5].title}
              </div>
              <button
                type="button"
                onClick={() => setActiveStep((prev) => (prev + 1) % 5)}
                className="w-full mt-2 py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] flex items-center justify-center gap-1 transition-all"
              >
                Next Workflow Stage <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
