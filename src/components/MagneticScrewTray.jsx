import React, { useState } from 'react';
import { Card, CardHeader } from './ui/Card';
import { Button } from './ui/Button';
import { MonoTag } from './ui/MonoTag';

export function MagneticScrewTray({ onShowToast }) {
  const initialBins = [
    {
      id: 'hinge',
      label: 'Rear Hinge Screws',
      size: 'M2.5 × 5mm',
      color: 'Silver',
      total: 2,
      current: 2,
      warning: 'Do NOT put into palmrest holes — will drill through plastic casing!'
    },
    {
      id: 'perimeter',
      label: 'Base Perimeter Screws',
      size: 'M2.0 × 3mm',
      color: 'Black',
      total: 8,
      current: 8,
      warning: 'Shallow holes. Standard screwdriver torque only.'
    },
    {
      id: 'battery',
      label: 'Internal Battery Mounts',
      size: 'M2.0 × 4mm',
      color: 'Wafer Head',
      total: 4,
      current: 4,
      warning: 'Flat wide heads to distribute pressure across battery bracket.'
    },
    {
      id: 'dvd',
      label: 'Optical Drive Bay Lock',
      size: 'M2.5 × 8mm',
      color: 'Long Silver',
      total: 1,
      current: 1,
      warning: 'Located under center rubber foot. Longest screw in chassis.'
    }
  ];

  const [bins, setBins] = useState(initialBins);

  const handleToggle = (id) => {
    setBins((prev) =>
      prev.map((bin) => {
        if (bin.id === id) {
          const nextVal = bin.current > 0 ? bin.current - 1 : bin.total;
          onShowToast?.(`Tray Bin [${bin.label}]: ${nextVal}/${bin.total} screws held`);
          return { ...bin, current: nextVal };
        }
        return bin;
      })
    );
  };

  const handleReset = () => {
    setBins(initialBins);
    onShowToast?.('Magnetic screw tray reset to full chassis count');
  };

  return (
    <Card className="p-5">
      <CardHeader
        title="Magnetic Bench Screw Organizer"
        subtitle="Click screws as you remove them from the laptop chassis to store in their exact length bin."
        badge={
          <span className="text-[11px] font-mono text-[#525E59] bg-[#F7F5F0] px-2 py-0.5 rounded border border-[#E5E2D9]">
            Motherboard Puncture Prevention
          </span>
        }
        action={
          <button
            onClick={handleReset}
            className="text-xs font-mono text-[#0F766E] hover:underline"
          >
            Reset Tray
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {bins.map((bin) => {
          const isEmpty = bin.current === 0;
          return (
            <div
              key={bin.id}
              onClick={() => handleToggle(bin.id)}
              className={`border-2 border-dashed rounded-lg p-3.5 cursor-pointer transition-all duration-150 select-none ${
                isEmpty
                  ? 'border-[#D5D0C3] bg-[#F7F5F0]/40'
                  : 'border-[#0F766E] bg-[#F0FDFA]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#1C2321]">{bin.label}</span>
                <span className="font-mono text-xs font-bold text-[#0F766E]">
                  {bin.current}/{bin.total}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <MonoTag variant="key">{bin.size}</MonoTag>
                <span className="text-[11px] text-[#525E59]">{bin.color}</span>
              </div>

              {/* Screw Visual Dots */}
              <div className="mt-3 flex items-center gap-1.5 flex-wrap min-h-[22px]">
                {Array.from({ length: bin.current }).map((_, i) => (
                  <span
                    key={i}
                    className="w-4 h-4 rounded-full bg-[#374151] border border-black shadow-xs inline-block animate-in fade-in zoom-in-50"
                  />
                ))}
                {Array.from({ length: bin.total - bin.current }).map((_, i) => (
                  <span
                    key={`empty-${i}`}
                    className="w-4 h-4 rounded-full border border-dashed border-[#9CA3AF] inline-block opacity-40"
                  />
                ))}
              </div>

              <p className="text-[10px] text-[#525E59] mt-2 leading-tight">
                {bin.warning}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
