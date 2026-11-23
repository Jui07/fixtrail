import React, { useState } from 'react';
import { Card, CardHeader } from './ui/Card';
import { MonoTag } from './ui/MonoTag';
import { RiskBadge } from './ui/Badge';
import { BIOS_DATABASE } from '../data/biosKeys';
import { DIAGNOSTIC_BLINK_CODES } from '../data/blinkCodes';
import { Search, Zap, Play } from 'lucide-react';

export function InstantLookup({ onShowToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlink, setSelectedBlink] = useState(DIAGNOSTIC_BLINK_CODES[0]);

  const filteredBios = BIOS_DATABASE.filter(
    (b) =>
      b.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.models.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.biosKey.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.bootKey.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Search Header */}
      <Card className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-[#1C2321]">Hardware Quick-Lookup Engine</h2>
            <p className="text-xs text-[#525E59]">Instant search for BIOS hotkeys, boot menu triggers, and LED blink patterns.</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#525E59] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Dell, HP, F12, RAM..."
              className="w-full text-xs font-mono bg-[#F7F5F0] border border-[#E5E2D9] rounded-lg pl-9 pr-3 py-2 text-[#1C2321] focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
            />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Interactive LED Blink Simulator (6 cols) */}
        <Card className="lg:col-span-6 p-5 space-y-4">
          <CardHeader
            title="LED Diagnostic Blink Simulator"
            subtitle="Modern Dell and HP laptops communicate boot halts using light rhythms."
            badge={<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F7F5F0] border border-[#E5E2D9]">Real-time Pulse</span>}
          />

          {/* Simulated Laptop Front Lip with Real Diode */}
          <div className="bg-[#18231E] rounded-xl p-6 border border-[#2D3E36] flex flex-col items-center justify-center relative select-none">
            <span className="text-[10px] font-mono text-[#9CA3AF] mb-4">CHASSIS EDGE STATUS LIGHT</span>

            <div className="w-full max-w-xs h-14 bg-[#262D2A] rounded-lg border-t-2 border-[#4B5563] flex items-center justify-center relative shadow-lg">
              {/* Realistic pulsing LED diode */}
              <div
                className="w-6 h-6 rounded-full bg-[#F59E0B] border-2 border-[#111827] shadow-lg animate-pulse"
                style={{
                  boxShadow: '0 0 16px #F59E0B'
                }}
              />
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-[#FEF3C7] text-[#B45309] font-bold border border-[#FDE68A]">
                Amber: {selectedBlink.amber} Pulses
              </span>
              <span className="text-[#9CA3AF]">&rarr;</span>
              <span className="px-2.5 py-1 rounded bg-white text-[#1C2321] font-bold border border-[#E5E2D9]">
                White: {selectedBlink.white} Pulses
              </span>
            </div>

            <div className="mt-2 text-center">
              <p className="text-xs font-mono font-bold text-emerald-400">
                {selectedBlink.meaning}
              </p>
              <p className="text-[11px] text-[#9CA3AF] mt-0.5 max-w-xs">
                {selectedBlink.details}
              </p>
            </div>
          </div>

          {/* Selectable Blink Patterns */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1C2321] uppercase tracking-wide">
              Common Dell / HP Blink Library:
            </label>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {DIAGNOSTIC_BLINK_CODES.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedBlink(item);
                    onShowToast?.(`Loaded diagnostic code: ${item.pattern}`);
                  }}
                  className={`w-full p-2.5 rounded-lg border text-left text-xs font-mono transition-all flex items-center justify-between ${
                    selectedBlink.pattern === item.pattern
                      ? 'border-[#0F766E] bg-[#F0FDFA]'
                      : 'border-[#E5E2D9] hover:bg-[#F7F5F0]'
                  }`}
                >
                  <div>
                    <span className="font-bold text-[#1C2321]">{item.pattern}</span>
                    <span className="text-[#525E59] block text-[11px]">{item.meaning}</span>
                  </div>
                  <RiskBadge level={item.risk} />
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Right: Instant Search-as-You-Type BIOS & Boot Keys (6 cols) */}
        <Card className="lg:col-span-6 p-5 space-y-4">
          <CardHeader
            title="Instant BIOS & Boot Menu Keys"
            subtitle="Big mono keys to hit repeatedly right after pressing power."
            badge={<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F7F5F0] border border-[#E5E2D9]">{filteredBios.length} Brands</span>}
          />

          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {filteredBios.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-[#E5E2D9] bg-[#F7F5F0]/60 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-[#1C2321]">{item.brand}</h4>
                    <span className="text-[11px] text-[#525E59]">{item.models}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono">
                    <div className="text-center">
                      <span className="text-[9px] text-[#525E59] block uppercase">BIOS</span>
                      <MonoTag variant="key">[{item.biosKey}]</MonoTag>
                    </div>
                    <div className="text-center">
                      <span className="text-[9px] text-[#0F766E] block uppercase font-bold">BOOT</span>
                      <MonoTag variant="key" highlight={true}>[{item.bootKey}]</MonoTag>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-[#525E59] leading-snug pt-1 border-t border-[#E5E2D9]">
                  <strong>Timing Note:</strong> {item.timingNote}
                </p>
              </div>
            ))}

            {filteredBios.length === 0 && (
              <div className="p-6 text-center text-xs text-[#525E59]">
                No brand matches for "{searchTerm}". Start by trying [F2] or [F12].
              </div>
            )}
          </div>
        </Card>

      </div>
    </div>
  );
}
