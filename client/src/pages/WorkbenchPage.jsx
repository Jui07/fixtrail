import React, { useState } from 'react';
import {
  Wrench,
  Layers,
  Cpu,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus
} from 'lucide-react';

export const WorkbenchPage = () => {
  const [selectedModel, setSelectedModel] = useState('dell-5567');
  const [selectedComponent, setSelectedComponent] = useState(null);

  // Screw tray bin counts
  const [screwBins, setScrewBins] = useState([
    { id: 'b1', name: 'Base Outer Shell', size: 'M2.5 × 8mm', colorHex: '#2563EB', count: 0, max: 10, warning: 'Long screw. NEVER install in internal keyboard tray!' },
    { id: 'b2', name: 'Internal Battery', size: 'M2.0 × 3mm', colorHex: '#14B8A6', count: 0, max: 4, warning: 'Wafer head. Tighten gently to avoid cracking battery tabs.' },
    { id: 'b3', name: 'Drive Caddy / Fan', size: 'M2.0 × 4mm', colorHex: '#F59E0B', count: 0, max: 3, warning: 'Fine pitch thread.' },
    { id: 'b4', name: 'Display Hinge Mount', size: 'M2.5 × 5mm', colorHex: '#8B5CF6', count: 0, max: 6, warning: 'High stress point. Check brass standoff threading.' }
  ]);

  const componentsData = {
    'dell-5567': [
      {
        id: 'ram',
        name: 'DDR4 SO-DIMM Slots (Slot 1 & Slot 2)',
        desc: 'Dual-channel memory slots. Sensitive to atmospheric oxidation in coastal and high-humidity climates.',
        guideline: 'Spread metal side retention clips outwards simultaneously. Slide stick out at 30° angle. Clean gold contact pins using a clean dry pencil eraser.',
        warning: 'Always disconnect battery first before touching RAM clips.'
      },
      {
        id: 'battery',
        name: 'Internal Battery Connector (JMB1)',
        desc: '42Wh WDX0R battery harness interface delivering 11.4V nominal.',
        guideline: 'Pry gently with non-conductive plastic probe. Do NOT pull wires directly.',
        warning: 'Metal tweezers will short pin 1 (+11V) to ground, instantly destroying the charging IC.'
      },
      {
        id: 'cmos',
        name: 'RTC / CMOS Coin Battery (2-Pin Bundled)',
        desc: 'Maintains southbridge BIOS registers and real-time clock state.',
        guideline: 'Disconnect connector and hold main power button for 35 seconds to execute complete capacitive flea power drain.',
        warning: 'Reconnection triggers a 90-second POST memory training cycle on next boot.'
      },
      {
        id: 'heatsink',
        name: 'Copper Heat-Pipe & Blower Fan',
        desc: 'Single copper tube heat-sink with 4-spring retention bracket over i5/i7 BGA chip.',
        guideline: 'Loosen captive screws in diagonal sequence 1-2-3-4. Clean dried thermal paste with 99% isopropyl alcohol.',
        warning: 'Do not bend copper tube; bending creates microscopic cracks that leak vaporized liquid.'
      }
    ]
  };

  const handleUpdateScrew = (id, delta) => {
    setScrewBins((bins) =>
      bins.map((b) => (b.id === id ? { ...b, count: Math.max(0, b.count + delta) } : b))
    );
  };

  const totalScrews = screwBins.reduce((sum, b) => sum + b.count, 0);

  return (
    <div className="py-10 bg-[#F5F8FC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
              <Layers className="w-3.5 h-3.5" /> Bench Hardware Visualizer
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#172033] tracking-tight">
              Motherboard Schematic & Screw Tray
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Component inspection guide with color-coded screw length bins to prevent motherboard puncturing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedModel}
              onChange={(e) => {
                setSelectedModel(e.target.value);
                setSelectedComponent(null);
              }}
              className="px-3.5 py-2 text-xs font-semibold border border-slate-300 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-blue-500"
            >
              <option value="dell-5567">Dell Inspiron 15 5567 (BAL20)</option>
              <option value="hp-cs">HP Pavilion 15-cs series</option>
              <option value="lenovo-ideapad">Lenovo IdeaPad 3 15ITL6</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Motherboard Schematic Visualizer (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                Interactive Board Layout: <span className="text-blue-600 font-mono">Dell Inspiron 15 5567</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">PCB Rev: BAL20 LA-D801P</span>
            </div>

            {/* Motherboard Visual Grid */}
            <div className="relative w-full h-80 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 p-4 bench-dot-grid flex flex-col justify-between">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>[DC-IN JACK TOP-LEFT]</span>
                <span>[HEATSINK EXHAUST FIN STACK]</span>
                <span>[IO PORTS TOP-RIGHT]</span>
              </div>

              {/* Hotspot Components */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedComponent(componentsData['dell-5567'][0])}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedComponent?.id === 'ram'
                      ? 'bg-blue-600 text-white border-blue-400 shadow-lg'
                      : 'bg-slate-800/90 text-slate-200 border-slate-700 hover:border-blue-400'
                  }`}
                >
                  <span className="text-xs font-bold font-mono block">DDR4 SO-DIMM Slots</span>
                  <span className="text-[10px] opacity-75">Click to inspect RAM actions</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedComponent(componentsData['dell-5567'][3])}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedComponent?.id === 'heatsink'
                      ? 'bg-blue-600 text-white border-blue-400 shadow-lg'
                      : 'bg-slate-800/90 text-slate-200 border-slate-700 hover:border-blue-400'
                  }`}
                >
                  <span className="text-xs font-bold font-mono block">Heatsink & Blower Fan</span>
                  <span className="text-[10px] opacity-75">Thermal paste diagonal torque</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedComponent(componentsData['dell-5567'][1])}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedComponent?.id === 'battery'
                      ? 'bg-blue-600 text-white border-blue-400 shadow-lg'
                      : 'bg-slate-800/90 text-slate-200 border-slate-700 hover:border-blue-400'
                  }`}
                >
                  <span className="text-xs font-bold font-mono block">Battery Header (JMB1)</span>
                  <span className="text-[10px] opacity-75">Primary 11.4V disconnect point</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedComponent(componentsData['dell-5567'][2])}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedComponent?.id === 'cmos'
                      ? 'bg-blue-600 text-white border-blue-400 shadow-lg'
                      : 'bg-slate-800/90 text-slate-200 border-slate-700 hover:border-blue-400'
                  }`}
                >
                  <span className="text-xs font-bold font-mono block">CMOS 3V Battery Latch</span>
                  <span className="text-[10px] opacity-75">Capacitive Flea drain</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>[BATTERY BOTTOM-LEFT]</span>
                <span>[2.5" SATA BAY BOTTOM-CENTER]</span>
                <span>[TRACKPAD JTP1]</span>
              </div>
            </div>

            {/* Selected Component Detail Pane */}
            {selectedComponent ? (
              <div className="p-5 rounded-xl bg-blue-50/50 border border-blue-200 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900">{selectedComponent.name}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-100 text-blue-800 font-semibold">
                    BENCH SPEC
                  </span>
                </div>
                <p className="text-xs text-slate-600">{selectedComponent.desc}</p>
                <div className="p-3 bg-white rounded-lg border border-blue-100 text-xs text-slate-800 space-y-1">
                  <strong className="block text-blue-900 font-semibold">Action Guideline:</strong>
                  <p>{selectedComponent.guideline}</p>
                </div>
                <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{selectedComponent.warning}</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 text-center py-2">
                Click any component button above to load physical repair guidelines and safety specs.
              </p>
            )}
          </div>

          {/* Right: Magnetic Screw Tray Organizer (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">Magnetic Screw Tray</h2>
                <span className="text-xs text-slate-500">Color-coded bins prevent chassis puncture</span>
              </div>
              <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                {totalScrews} Screws Stored
              </span>
            </div>

            <div className="space-y-3">
              {screwBins.map((bin) => (
                <div
                  key={bin.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: bin.colorHex }}
                      />
                      <div>
                        <span className="font-bold text-xs text-slate-800 block">{bin.name}</span>
                        <span className="text-[11px] font-mono text-slate-500 font-semibold">{bin.size}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-slate-200">
                      <button
                        onClick={() => handleUpdateScrew(bin.id, -1)}
                        className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs font-bold text-slate-900 w-5 text-center">
                        {bin.count}
                      </span>
                      <button
                        onClick={() => handleUpdateScrew(bin.id, 1)}
                        className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-snug">
                    <span className="text-amber-700 font-medium">Rule:</span> {bin.warning}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900 flex items-center justify-between">
              <span>Ready for reassembly?</span>
              <button
                onClick={() => setScrewBins((b) => b.map((x) => ({ ...x, count: 0 })))}
                className="text-[11px] font-semibold text-teal-700 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset Bins
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
