import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  Layers,
  Wrench,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const InteractiveComponentVisualizer = () => {
  const [activeComponent, setActiveComponent] = useState(0);

  const components = [
    {
      id: 'ram',
      name: 'SO-DIMM RAM Slots',
      subtext: 'Dual-Channel Memory Bus',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=700&auto=format&fit=crop&q=80',
      role: 'High-speed volatile system memory (DDR4 / DDR5 2400-5600MHz).',
      commonFailure: 'Gold pin contact oxidation causing POST freezes, 3-Amber 2-White blink codes, and random kernel memory dumps.',
      protocol: 'Discharge capacitive flea power (35s hold), unclip retainers, rub gold contacts with clean dry eraser.',
      safetyLevel: 'Caution: Disconnect Battery First',
      solutionSlug: 'cmos-deep-drain-and-ram-reseat'
    },
    {
      id: 'vrm',
      name: 'CPU Power VRM Rail & MOSFETs',
      subtext: '19V to 1.1V Core Buck Converter',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=700&auto=format&fit=crop&q=80',
      role: 'Steps down adapter 19.5V input voltage to processor core voltage (0.8V - 1.2V) via high-side & low-side switching MOSFETs.',
      commonFailure: 'High-side MOSFET ceramic capacitor short circuit to ground; charger status LED shuts off instantly on insertion.',
      protocol: 'Measure DC jack to ground resistance with digital multimeter. Identify shorted rail before applying injection power.',
      safetyLevel: 'Hazard: Do not force power',
      solutionSlug: 'cmos-deep-drain-and-ram-reseat'
    },
    {
      id: 'battery',
      name: 'Lithium-Ion Pouch Battery',
      subtext: '3-Cell 42Wh Internal Pack',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=700&auto=format&fit=crop&q=80',
      role: 'Direct current chemical energy storage with onboard Battery Management System (BMS) over I2C/SMBus.',
      commonFailure: 'Electrolyte pouch gas expansion (swelling), trackpad click stiffness, sudden shutdown at 30% charge level.',
      protocol: 'Disconnect JMB1 header with nylon pick. Do not bend or puncture lithium pouch cells during extraction.',
      safetyLevel: 'Hazard: Thermal runaway risk if punctured',
      solutionSlug: 'cmos-deep-drain-and-ram-reseat'
    },
    {
      id: 'ssd',
      name: 'M.2 NVMe PCIe Solid State Drive',
      subtext: 'Gen3 / Gen4 x4 Storage Interface',
      image: 'https://images.unsplash.com/photo-1597740985671-2a8a3b80532e?w=700&auto=format&fit=crop&q=80',
      role: 'Non-volatile flash storage operating at up to 7,000 MB/s over PCIe lanes direct to CPU.',
      commonFailure: 'M.2 socket dust oxidation or BCD boot corruption causing "No Bootable Device" or 0xc00000e blue screen.',
      protocol: 'Reseat M.2 drive in socket, clean gold edge with isopropyl alcohol, rebuild BCD via command prompt.',
      safetyLevel: 'Safe: Low voltage component',
      solutionSlug: 'cmos-deep-drain-and-ram-reseat'
    },
    {
      id: 'heatsink',
      name: 'Copper Heat-Pipe & Fan Assembly',
      subtext: 'Vapor-Phase Thermal Dissipation',
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=700&auto=format&fit=crop&q=80',
      role: 'Sintered copper vapor chamber transferring thermal wattage from CPU/GPU die to aluminum radiator exhaust stack.',
      commonFailure: 'Thermal paste dry-out into chalky powder; exhaust fin lint plug causing 95°C thermal throttling.',
      protocol: 'Diagonal screw torque sequence (1-2-3-4). Wipe clean with 99% IPA and apply non-conductive thermal compound.',
      safetyLevel: 'Caution: Do not bend copper heat-pipe',
      solutionSlug: 'cmos-deep-drain-and-ram-reseat'
    }
  ];

  const current = components[activeComponent];

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
            Hardware Diagnostics
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#172033] tracking-tight mt-1">
            Component Failure Mode Explorer
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Hover or tap any hardware component to inspect verified bench failure symptoms, teardown precautions, and matching fixes.
          </p>
        </div>

        <Link
          to="/workbench"
          className="text-xs font-semibold text-[#2563EB] hover:text-blue-700 flex items-center gap-1 group self-start sm:self-auto"
        >
          Open Full Motherboard Workbench <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Component Selector Tabs (5 Cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          {components.map((comp, idx) => {
            const isSelected = activeComponent === idx;
            return (
              <button
                key={comp.id}
                type="button"
                onMouseEnter={() => setActiveComponent(idx)}
                onClick={() => setActiveComponent(idx)}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'bg-blue-50/70 border-blue-500 shadow-sm ring-1 ring-blue-500/20'
                    : 'bg-slate-50/60 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-slate-300'}`} />
                    <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-600">
                      {comp.name}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono block pl-4">
                    {comp.subtext}
                  </span>
                </div>

                <ArrowRight className={`w-4 h-4 transition-transform ${
                  isSelected ? 'text-blue-600 translate-x-1' : 'text-slate-300 group-hover:text-slate-500'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Detailed Component Inspection Pane (7 Cols) */}
        <div className="lg:col-span-7 bg-[#101B35] rounded-2xl overflow-hidden text-white border border-slate-700/80 shadow-xl flex flex-col justify-between">
          <div className="h-52 overflow-hidden relative bg-slate-900">
            <img
              src={current.image}
              alt={current.name}
              className="w-full h-full object-cover opacity-85 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101B35] via-[#101B35]/40 to-transparent" />
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-slate-900/90 text-cyan-300 border border-cyan-400/30 backdrop-blur">
                {current.safetyLevel}
              </span>
            </div>
            <div className="absolute bottom-3 left-4 right-4">
              <h3 className="text-xl font-bold tracking-tight text-white">{current.name}</h3>
              <span className="text-xs text-slate-300 font-mono">{current.subtext}</span>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-1 text-xs">
              <strong className="text-cyan-400 font-mono text-[11px] uppercase block">Hardware Engineering Role:</strong>
              <p className="text-slate-300 leading-relaxed">{current.role}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
              <strong className="text-amber-400 font-semibold block flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Common Failure Mode:
              </strong>
              <p className="text-slate-300 leading-relaxed">{current.commonFailure}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-teal-950/40 border border-teal-800/60 text-xs space-y-1">
              <strong className="text-teal-400 font-semibold block flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Repair Protocol:
              </strong>
              <p className="text-slate-300 leading-relaxed">{current.protocol}</p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs">
              <span className="text-[11px] font-mono text-slate-400">BENCH_SPEC: ISO/PASSPORT</span>
              <Link
                to="/solutions"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-all"
              >
                Inspect Matching Solutions <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
