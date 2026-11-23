import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Laptop,
  AlertTriangle,
  HelpCircle,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

export const InteractiveKnowledgeNetwork = () => {
  const [selectedChain, setSelectedChain] = useState(0);

  const chains = [
    {
      id: 'dell-ram',
      title: 'Dell Inspiron POST Freeze Pathway',
      device: 'Dell Inspiron 15 5567',
      symptom: '3 Amber, 2 White Blink Code',
      diagnostic: 'Capacitive Flea Drain Test',
      action: 'SO-DIMM Gold Pin Eraser Cleaning',
      outcome: '14 of 19 Hostel Laptops Restored (Wilson: 0.5182)',
      solutionId: 'cmos-deep-drain-and-ram-reseat',
      status: 'VERIFIED_CHAIN'
    },
    {
      id: 'hp-audio',
      title: 'HP Pavilion Audio Driver Mute Pathway',
      device: 'HP Pavilion 15-cs Series',
      symptom: 'Headphone Jack Muted & Crackling',
      diagnostic: 'Device Manager Code 10 Check',
      action: 'Realtek Audio Codec Driver Rollback',
      outcome: '10 of 12 Student Laptops Restored (Wilson: 0.5638)',
      solutionId: 'realtek-audio-driver-rollback',
      status: 'DRIVER_RESOLVED'
    },
    {
      id: 'lenovo-power',
      title: 'Lenovo IdeaPad Deep S3 Hang Pathway',
      device: 'Lenovo IdeaPad 3 15ITL6',
      symptom: 'Power Button Pulses, Quiet Fan',
      diagnostic: 'Novo Button BIOS POST Check',
      action: 'Novo Pin Reset & CMOS Clear',
      outcome: '8 of 9 Engineering Laptops Restored',
      solutionId: 'cmos-deep-drain-and-ram-reseat',
      status: 'BIOS_TRAINED'
    }
  ];

  const current = chains[selectedChain];

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
            Repair Intelligence Topology
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#172033] tracking-tight mt-1">
            One Connected Network. Thousands of Possible Solutions.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            See how symptoms, diagnostic checks, and verified peer outcomes connect into proven solution trails.
          </p>
        </div>

        {/* Pathway Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold self-start sm:self-auto border border-slate-200">
          {chains.map((chain, idx) => (
            <button
              key={chain.id}
              onClick={() => setSelectedChain(idx)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedChain === idx
                  ? 'bg-white text-blue-700 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Case #{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Pathway Node Trail */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {/* Node 1: Device */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2 relative group hover:border-blue-400 transition-colors">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>NODE 1</span>
            <Laptop className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Target Device</span>
          <h4 className="font-bold text-xs text-slate-900 leading-snug">{current.device}</h4>
        </div>

        {/* Node 2: Symptom */}
        <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-2 relative group hover:border-amber-400 transition-colors">
          <div className="flex items-center justify-between text-[11px] font-mono text-amber-500">
            <span>NODE 2</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <span className="text-[10px] uppercase font-bold text-amber-800 block">Observable Symptom</span>
          <h4 className="font-bold text-xs text-amber-950 leading-snug">{current.symptom}</h4>
        </div>

        {/* Node 3: Diagnostic */}
        <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200/80 space-y-2 relative group hover:border-blue-400 transition-colors">
          <div className="flex items-center justify-between text-[11px] font-mono text-blue-500">
            <span>NODE 3</span>
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <span className="text-[10px] uppercase font-bold text-blue-800 block">Diagnostic Test</span>
          <h4 className="font-bold text-xs text-blue-950 leading-snug">{current.diagnostic}</h4>
        </div>

        {/* Node 4: Action */}
        <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-200/80 space-y-2 relative group hover:border-indigo-400 transition-colors">
          <div className="flex items-center justify-between text-[11px] font-mono text-indigo-500">
            <span>NODE 4</span>
            <Wrench className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <span className="text-[10px] uppercase font-bold text-indigo-800 block">Prescribed Action</span>
          <h4 className="font-bold text-xs text-indigo-950 leading-snug">{current.action}</h4>
        </div>

        {/* Node 5: Outcome */}
        <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-300 space-y-2 relative group shadow-sm">
          <div className="flex items-center justify-between text-[11px] font-mono text-teal-600">
            <span>NODE 5</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
          </div>
          <span className="text-[10px] uppercase font-bold text-teal-800 block">Verified Outcome</span>
          <h4 className="font-bold text-xs text-teal-950 leading-snug">{current.outcome}</h4>
        </div>
      </div>

      {/* Pathway Narrative Telemetry Card */}
      <div className="p-5 rounded-xl bg-[#101B35] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-cyan-300">{current.title}</span>
            <span className="text-slate-500 font-mono text-xs">|</span>
            <span className="text-xs font-mono text-teal-400">{current.status}</span>
          </div>
          <p className="text-xs text-slate-300">
            Connected via {current.diagnostic} across {current.device} hardware topologies.
          </p>
        </div>

        <Link
          to="/solutions"
          className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-semibold text-xs shadow-md transition-all shrink-0 flex items-center gap-1.5"
        >
          View Full Solution Trail <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
