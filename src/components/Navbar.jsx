import React from 'react';
import { Cpu, Search, CheckSquare, Zap, FileText, Wrench } from 'lucide-react';

export function Navbar({ activeTab, onSelectTab, resolvedCount = 14, totalCases = 19 }) {
  const tabs = [
    { id: 'visualizer', label: 'Hardware Bench', icon: Cpu },
    { id: 'triage', label: 'Symptom Triage', icon: Search },
    { id: 'walkthrough', label: 'Walkthrough', icon: CheckSquare },
    { id: 'lookup', label: 'Blink & BIOS', icon: Zap },
    { id: 'docket', label: 'Service Docket', icon: FileText }
  ];

  return (
    <>
      {/* Top Header for Desktop & Tablet */}
      <header className="border-b border-[#E5E2D9] bg-[#F7F5F0]/95 backdrop-blur sticky top-0 z-40 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-bench bg-[#0F766E] flex items-center justify-center text-white font-mono font-bold text-sm shadow-sm">
              FT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-lg leading-none text-[#1C2321]">FixTrail</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[#E5E2D9] bg-white text-[#525E59]">
                  Pune Tech Edition
                </span>
              </div>
              <p className="text-xs text-[#525E59] mt-0.5 hidden sm:block">
                Trusted student repair bench • Written like a senior who has fixed 50 laptops
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E5E2D9] text-xs font-medium shadow-xs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all duration-150 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#0F766E] text-white font-semibold shadow-sm'
                      : 'text-[#525E59] hover:text-[#1C2321] hover:bg-[#F7F5F0]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Live Campus Verified Ticker */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E5E2D9] rounded-lg shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#15803D] animate-ping" />
              <span className="font-mono font-bold text-[#1C2321]">{resolvedCount}/{totalCases}</span>
              <span className="text-[#525E59] hidden lg:inline">Hostel Inspiron 15s Fixed</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile-First Bottom Navigation (360px optimized) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#F7F5F0] border-t border-[#E5E2D9] px-2 py-1 flex items-center justify-around shadow-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg text-[10px] font-medium transition-all ${
                isActive
                  ? 'text-[#0F766E] font-bold'
                  : 'text-[#525E59] hover:text-[#1C2321]'
              }`}
            >
              <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.75px]'}`} />
              <span className="tracking-tight">{tab.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
