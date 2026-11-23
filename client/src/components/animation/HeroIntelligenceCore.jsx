import React, { useState, useEffect } from 'react';
import {
  Cpu,
  ShieldCheck,
  Activity,
  Laptop,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Users,
  Search,
  Wrench
} from 'lucide-react';

export const HeroIntelligenceCore = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSignal, setActiveSignal] = useState(0);

  // Subtle interactive 3D perspective tilt
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Cycling active signal loop every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSignal((prev) => (prev + 1) % 4);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const signals = [
    { title: 'Symptom: 3 Amber, 2 White', source: 'Dell Inspiron 15 5567', action: 'Blink Code Decoded', color: 'text-amber-400', badge: 'DIAG_CODE' },
    { title: 'AI Triage: S3 Sleep Latch', source: 'Gemini Engine', action: 'Flea Drain Prescribed', color: 'text-[#38BDF8]', badge: 'DECISION_NODE' },
    { title: 'Peer Bench: COEP Hostel', source: '14/19 Successes', action: 'Verified Procedure', color: 'text-[#14B8A6]', badge: 'COMMUNITY_EVIDENCE' },
    { title: 'Wilson Bound: 0.5182', source: 'Mathematical Lower Bound', action: 'Bench-Verified Rank', color: 'text-emerald-400', badge: 'WILSON_RANK' }
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-lg mx-auto select-none"
      style={{
        transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
        transition: 'transform 0.15s ease-out'
      }}
    >
      {/* Background Soft Glow Aura */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/30 via-[#14B8A6]/20 to-cyan-500/30 rounded-3xl blur-2xl pointer-events-none" />

      {/* Main Container HUD Glass Card */}
      <div className="relative rounded-2xl bg-[#0D1527]/90 border border-slate-700/80 p-6 shadow-2xl backdrop-blur-xl text-white overflow-hidden space-y-6">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Top Technical Telemetry Strip */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-bold">NETWORK_LIVE</span>
            <span className="text-slate-600">|</span>
            <span>LATENCY 14ms</span>
          </div>
          <span className="text-cyan-400/90 font-semibold">DIAG_PROTOCOL v2.4</span>
        </div>

        {/* Central Architecture: Holographic Intelligence Core */}
        <div className="relative py-4 flex flex-col items-center justify-center">
          {/* Animated Concentric HUD Scanning Rings */}
          <div className="absolute w-52 h-52 rounded-full border border-blue-500/20 animate-spin [animation-duration:24s] pointer-events-none" />
          <div className="absolute w-44 h-44 rounded-full border border-dashed border-teal-500/25 animate-spin [animation-duration:18s] [animation-direction:reverse] pointer-events-none" />
          <div className="absolute w-36 h-36 rounded-full border border-cyan-400/30 animate-pulse pointer-events-none" />

          {/* Core Hardware Processor Unit */}
          <div className="relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-[#101B35] via-[#1E3A8A] to-[#0F766E] border-2 border-cyan-400/50 shadow-xl shadow-cyan-500/20 flex flex-col items-center justify-center p-3 text-center group cursor-pointer">
            <Cpu className="w-8 h-8 text-cyan-300 animate-pulse mb-1" />
            <span className="text-[10px] font-mono font-bold tracking-wider text-white">FIXTRAIL</span>
            <span className="text-[8px] font-mono text-teal-300">CORE AI</span>
          </div>

          {/* Floating Peripheral Node 1: Left (Connected Device) */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 p-2.5 rounded-xl bg-slate-900/95 border border-slate-700 shadow-lg text-[10px] font-mono flex items-center gap-2 text-slate-300">
            <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Laptop className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-white font-bold block">Inspiron 5567</span>
              <span className="text-slate-400">Node #8194</span>
            </div>
          </div>

          {/* Floating Peripheral Node 2: Right (Verified Benchmark) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 p-2.5 rounded-xl bg-slate-900/95 border border-slate-700 shadow-lg text-[10px] font-mono flex items-center gap-2 text-slate-300">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-emerald-400 font-bold block">Wilson: 0.5182</span>
              <span className="text-slate-400">14/19 Success</span>
            </div>
          </div>
        </div>

        {/* Dynamic Telemetry Event Stream */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-teal-400 font-semibold">
              <Activity className="w-3.5 h-3.5" /> LIVE DIAGNOSTIC STREAM
            </span>
            <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-400/30">
              {signals[activeSignal].badge}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pt-0.5">
            <div>
              <span className={`font-bold block ${signals[activeSignal].color}`}>
                {signals[activeSignal].title}
              </span>
              <span className="text-[11px] text-slate-400">
                {signals[activeSignal].source}
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-300 bg-slate-800 px-2 py-1 rounded border border-slate-700">
              {signals[activeSignal].action}
            </span>
          </div>
        </div>

        {/* Bottom Technical Indicators */}
        <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono text-[10px]">
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <span className="text-slate-400 block">SYMPTOM_MAP</span>
            <span className="text-cyan-400 font-bold">14 CATEGORIES</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <span className="text-slate-400 block">CONFIDENCE</span>
            <span className="text-emerald-400 font-bold">95% BOUND</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <span className="text-slate-400 block">OUTCOME_LOOP</span>
            <span className="text-teal-400 font-bold">REAL-TIME</span>
          </div>
        </div>
      </div>
    </div>
  );
};
