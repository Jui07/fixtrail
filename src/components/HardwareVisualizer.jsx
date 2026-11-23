import React, { useState } from 'react';
import { Card } from './ui/Card';
import { RiskBadge, SignalBadge } from './ui/Badge';
import { Button } from './ui/Button';
import { MonoTag } from './ui/MonoTag';
import { Check, ShieldAlert, Wrench, Eye, ArrowRight, AlertTriangle } from 'lucide-react';

export function HardwareVisualizer({ onLaunchWalkthrough, onShowToast }) {
  const [selectedModel, setSelectedModel] = useState('dell-5567');
  const [selectedTarget, setSelectedTarget] = useState('ram');

  const models = [
    { id: 'dell-5567', label: 'Dell Inspiron 15 5567', caseId: 'PUN-5567-09', student: 'Tanmay (COEP Tech)' },
    { id: 'hp-15cs', label: 'HP Pavilion 15-cs', caseId: 'PUN-CS30-14', student: 'Ananya (PICT)' },
    { id: 'lenovo-ideapad3', label: 'Lenovo IdeaPad 3', caseId: 'PUN-IML0-22', student: 'Rohit (MIT-WPU)' }
  ];

  // Specific hardware inspection targets
  const targets = {
    'dell-5567': {
      ram: {
        title: 'DDR4 SODIMM RAM Slot & Contacts',
        risk: 'Careful',
        opensDevice: true,
        tool: 'Clean White Eraser / #00 Phillips',
        symptom: '3 Amber, 2 White Blinks (No POST)',
        evidence: 'Worked for 14 of 19 similar Dell Inspiron 15s in COEP hostel.',
        description: 'Microscopic copper oxidation and dust accumulation across DDR4 memory fingers in Slot A interrupt clock timing signals.',
        action: 'Release silver side retention clips outward until stick pops at 30°. Wipe gold contacts firmly with eraser, clean debris, snap back in.'
      },
      battery: {
        title: '42Wh Type WDX0R Lithium Pouch & Pull-Tab',
        risk: 'Careful',
        opensDevice: true,
        tool: 'Plastic Spudger / Fingernail (NO METAL)',
        symptom: 'Battery not detected / 0V safety cutoff',
        evidence: 'Discharging to <20% before service eliminates puncture hazard.',
        description: 'The battery header cable connects to the motherboard via a horizontal slide latch. Pulling vertically breaks socket pins.',
        action: 'Slide the black pull tab horizontally 5mm towards the battery pack. Hold power button for 15s to drain residual board capacitance.'
      },
      fan: {
        title: 'Copper Heatpipe & Sunon Blower Radiator',
        risk: 'Careful',
        opensDevice: true,
        tool: '#00 Phillips / 99% IPA / Thermal Paste',
        symptom: 'CPU throttling to 0.79GHz / Fan screaming',
        evidence: 'Cleaning fin radiator restored full 3.1GHz clock on 11 hostel laptops.',
        description: 'Cotton blanket lint builds up into a felt-like carpet right in front of the exhaust radiator teeth inside the blower housing.',
        action: 'Remove 2 M2x3mm screws, lift fan housing, peel tape, extract lint carpet, apply pea-size drop of Arctic MX-4 paste.'
      },
      cmos: {
        title: 'CR2032 3V Real-Time Clock Coin Battery',
        risk: 'Safe',
        opensDevice: true,
        tool: 'Plastic Pry Pick / ₹25 Coin Cell',
        symptom: 'Clock resets every boot / Dell logo loop',
        evidence: 'Fixes endless reboot loop without motherboard replacement.',
        description: 'Maintains NVRAM boot order and hardware clock. When cell drops below 2.75V, machine struggles on boot initialization.',
        action: 'Gently pry metal retention clip to pop cell out. Wait 15 seconds to discharge NVRAM, insert fresh CR2032 positive (+) up.'
      }
    },
    'hp-15cs': {
      dcjack: {
        title: 'DC-in Barrel Power Port Harness Cable',
        risk: 'Advanced',
        opensDevice: true,
        tool: 'Drop-in Cable L25200-001 / Spudger',
        symptom: 'Charging only works at bent angle / Sparks',
        evidence: 'Direct drop-in cable requires zero soldering.',
        description: 'Center plastic pin inside the 4.5mm blue-tip barrel breaks when the power cord is tripped over in hostel dorms.',
        action: 'Unscrew right hinge bracket, unroute harness wire along perimeter channel, clip new harness into motherboard socket.'
      },
      hinge: {
        title: 'Hinge Standoff Brass Thread Anchors',
        risk: 'Advanced',
        opensDevice: true,
        tool: 'Araldite 2-Part Epoxy / Clamps',
        symptom: 'Chassis pops open when display is adjusted',
        evidence: 'Epoxy reinforcement saved 9 HP Pavilion laptops from full display assembly replacement.',
        description: 'Factory brass screw nuts pull straight out of the thin palmrest plastic housing under stiff hinge torque.',
        action: 'Clean cracked plastic fragments, mix equal parts epoxy, set brass nuts into socket, cure for 6 hours under clamp pressure.'
      }
    },
    'lenovo-ideapad3': {
      swollenbattery: {
        title: 'Swollen Lithium Polymer Battery Cells',
        risk: 'Advanced',
        opensDevice: true,
        tool: 'Metal Fire Box / Safety Glasses / #00 Phillips',
        symptom: 'Trackpad bulging / Bottom shell warped',
        evidence: 'Setting Lenovo Vantage conservation threshold (60%) prevents cell bloating.',
        description: 'Gas generated from continuous 100% trickle charging during semester finals swells the pouch against the underside of the trackpad.',
        action: 'Disconnect AC immediately. Discharge pack to below 15%. Remove 4 wafer-head perimeter screws and store pack on non-flammable tile.'
      }
    }
  };

  const currentTargets = targets[selectedModel] || targets['dell-5567'];
  const activeDetails = currentTargets[selectedTarget] || Object.values(currentTargets)[0];

  return (
    <div className="space-y-6">
      
      {/* Top Model Switcher & Realistic Case Bar */}
      <Card className="p-4 sm:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold text-[#0F766E] uppercase">Hardware Bench Inspection</span>
              <span className="text-[#525E59]">•</span>
              <span className="text-xs font-mono text-[#525E59]">Verified Student Hardware</span>
            </div>
            <h2 className="text-lg font-bold text-[#1C2321] mt-0.5">
              {models.find(m => m.id === selectedModel)?.label}
            </h2>
            <p className="text-xs text-[#525E59] mt-0.5">
              Active Hostel Case: <strong>{models.find(m => m.id === selectedModel)?.student}</strong> • Case #{models.find(m => m.id === selectedModel)?.caseId}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-[#525E59]">Switch Model:</span>
            {models.map(m => (
              <button
                key={m.id}
                onClick={() => {
                  setSelectedModel(m.id);
                  const firstKey = Object.keys(targets[m.id])[0];
                  setSelectedTarget(firstKey);
                  onShowToast(`Loaded ${m.label} bench layout`);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedModel === m.id
                    ? 'bg-[#0F766E] text-white font-bold shadow-xs'
                    : 'bg-[#F7F5F0] text-[#1C2321] border border-[#E5E2D9] hover:border-[#0F766E]'
                }`}
              >
                {m.label.split(' ')[0]} {m.label.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Main Grid: Interactive Vector Schematic + Diagnostic Inspection Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Motherboard Interactive Map (7 cols) */}
        <Card className="lg:col-span-8 p-4 sm:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E2D9] mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0F766E]" />
              <h3 className="text-sm font-bold text-[#1C2321]">Chassis Disassembly & Component Hotspots</h3>
              <span className="text-[11px] font-mono text-[#525E59] hidden sm:inline">[Bottom Shell Removed]</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]">
                Click Pin to Inspect
              </span>
            </div>
          </div>

          {/* Vector Schematic Container */}
          <div className="relative w-full bg-[#18231E] rounded-xl p-4 sm:p-6 overflow-hidden border border-[#2D3E36] shadow-inner select-none">
            <svg className="w-full h-auto max-h-[440px]" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* PCB Substrate */}
              <rect x="40" y="30" width="720" height="440" rx="12" fill="#1B2E24" stroke="#2D4D3B" stroke-width="3" />
              <path d="M60 50 H740 M60 70 H400 M500 70 H740 M60 450 H740" stroke="#253E30" stroke-width="1.5" stroke-dasharray="4 4"/>
              
              {/* Corner Screw Mounts */}
              <circle cx="65" cy="55" r="7" fill="#18231E" stroke="#525E59" stroke-width="2" />
              <circle cx="735" cy="55" r="7" fill="#18231E" stroke="#525E59" stroke-width="2" />
              <circle cx="65" cy="445" r="7" fill="#18231E" stroke="#525E59" stroke-width="2" />
              <circle cx="735" cy="445" r="7" fill="#18231E" stroke="#525E59" stroke-width="2" />

              {/* CPU & Copper Heatpipe Assembly */}
              <g className="cursor-pointer" onClick={() => setSelectedTarget('fan')}>
                <rect x="360" y="80" width="130" height="90" rx="4" fill="#2E3330" stroke="#4B5563" stroke-width="2"/>
                <text x="375" y="125" fill="#9CA3AF" font-family="monospace" font-size="11" font-weight="bold">INTEL CORE i5</text>
                <text x="375" y="142" fill="#6B7280" font-family="monospace" font-size="9">7200U 2.50GHz</text>

                <path d="M420 125 L580 125 L580 75 L670 75" stroke="#C26B38" stroke-width="14" stroke-linecap="round"/>
                <path d="M420 125 L580 125 L580 75 L670 75" stroke="#E0834B" stroke-width="6" stroke-linecap="round"/>

                <rect x="630" y="50" width="110" height="110" rx="12" fill="#1E2321" stroke="#374151" stroke-width="2"/>
                <circle cx="685" cy="105" r="42" fill="#111816" stroke="#4B5563" stroke-width="2"/>
                <circle cx="685" cy="105" r="14" fill="#374151" />
                <path d="M685 65 L685 85 M685 125 L685 145 M645 105 L665 105 M705 105 L725 105" stroke="#6B7280" stroke-width="3"/>
                <text x="645" y="150" fill="#9CA3AF" font-family="monospace" font-size="9">SUNON DC 5V</text>
              </g>

              {/* Dual DDR4 SODIMM RAM Slots */}
              <g className="cursor-pointer" onClick={() => setSelectedTarget('ram')}>
                <rect x="230" y="80" width="105" height="150" rx="4" fill="#0D3B25" stroke="#15803D" stroke-width="1.5"/>
                <rect x="238" y="90" width="89" height="130" rx="3" fill="#1E4430" stroke="#34D399" stroke-width="1"/>
                <rect x="248" y="100" width="28" height="22" rx="2" fill="#111816" />
                <rect x="288" y="100" width="28" height="22" rx="2" fill="#111816" />
                <rect x="248" y="130" width="28" height="22" rx="2" fill="#111816" />
                <rect x="288" y="130" width="28" height="22" rx="2" fill="#111816" />
                <rect x="248" y="170" width="68" height="18" rx="2" fill="#F0FDFA" />
                <text x="252" y="183" fill="#0F766E" font-family="monospace" font-size="7.5" font-weight="bold">8GB DDR4-2400</text>
                <path d="M238 220 H327" stroke="#FBBF24" stroke-width="4" stroke-dasharray="2 1"/>
                
                {/* Silver clips */}
                <rect x="228" y="100" width="4" height="24" rx="1" fill="#E5E7EB" stroke="#9CA3AF"/>
                <rect x="325" y="100" width="4" height="24" rx="1" fill="#E5E7EB" stroke="#9CA3AF"/>

                {/* Empty Slot 2 */}
                <rect x="110" y="80" width="105" height="150" rx="4" fill="#162720" stroke="#374151" stroke-width="1.5" stroke-dasharray="3 3"/>
                <text x="122" y="155" fill="#6B7280" font-family="monospace" font-size="9">DIMM B [EMPTY]</text>
              </g>

              {/* CMOS CR2032 Coin Cell */}
              <g className="cursor-pointer" onClick={() => setSelectedTarget('cmos')}>
                <circle cx="160" cy="275" r="22" fill="#374151" stroke="#9CA3AF" stroke-width="2"/>
                <circle cx="160" cy="275" r="18" fill="#D1D5DB" stroke="#4B5563"/>
                <text x="146" y="278" fill="#1F2937" font-family="monospace" font-size="8" font-weight="bold">CR2032</text>
              </g>

              {/* 2.5 SATA Drive Bay */}
              <rect x="80" y="320" width="220" height="135" rx="6" fill="#202422" stroke="#374151" stroke-width="2"/>
              <text x="110" y="380" fill="#9CA3AF" font-family="monospace" font-size="12" font-weight="bold">SEAGATE 1TB 5400RPM</text>

              {/* 42Wh Battery Assembly */}
              <g className="cursor-pointer" onClick={() => setSelectedTarget('battery')}>
                <rect x="330" y="250" width="390" height="205" rx="8" fill="#1A1F1D" stroke="#374151" stroke-width="2"/>
                <rect x="345" y="265" width="115" height="175" rx="4" fill="#262D2A" stroke="#4B5563"/>
                <rect x="470" y="265" width="115" height="175" rx="4" fill="#262D2A" stroke="#4B5563"/>
                <rect x="595" y="265" width="110" height="175" rx="4" fill="#262D2A" stroke="#4B5563"/>
                <text x="440" y="335" fill="#E5E7EB" font-family="monospace" font-size="12" font-weight="bold">DELL 42Wh Type WDX0R</text>
                
                {/* Connector Tab */}
                <path d="M345 275 L320 275 L320 220 L360 220" stroke="#111816" stroke-width="8" stroke-linecap="round"/>
                <rect x="355" y="212" width="24" height="16" fill="#EF4444" rx="2"/>
                <text x="360" y="223" fill="#FFFFFF" font-family="monospace" font-size="8" font-weight="bold">PULL</text>
              </g>

              {/* HOTSPOT PINS */}
              {/* Hotspot 1: RAM */}
              <g className="cursor-pointer" onClick={() => setSelectedTarget('ram')}>
                <circle cx="327" cy="112" r="14" fill="#0F766E" fill-opacity="0.25" className="animate-ping" />
                <circle cx="327" cy="112" r="11" fill="#0F766E" stroke="#FFFFFF" stroke-width="2" />
                <text x="324" y="116" fill="#FFFFFF" font-family="monospace" font-size="10" font-weight="bold">1</text>
              </g>

              {/* Hotspot 2: Battery */}
              <g className="cursor-pointer" onClick={() => setSelectedTarget('battery')}>
                <circle cx="367" cy="220" r="14" fill="#EF4444" fill-opacity="0.25" className="animate-ping" />
                <circle cx="367" cy="220" r="11" fill="#B91C1C" stroke="#FFFFFF" stroke-width="2" />
                <text x="364" y="224" fill="#FFFFFF" font-family="monospace" font-size="10" font-weight="bold">2</text>
              </g>

              {/* Hotspot 3: Fan */}
              <g className="cursor-pointer" onClick={() => setSelectedTarget('fan')}>
                <circle cx="685" cy="105" r="14" fill="#B45309" fill-opacity="0.25" className="animate-ping" />
                <circle cx="685" cy="105" r="11" fill="#B45309" stroke="#FFFFFF" stroke-width="2" />
                <text x="682" y="109" fill="#FFFFFF" font-family="monospace" font-size="10" font-weight="bold">3</text>
              </g>

              {/* Hotspot 4: CMOS */}
              <g className="cursor-pointer" onClick={() => setSelectedTarget('cmos')}>
                <circle cx="160" cy="275" r="14" fill="#3B82F6" fill-opacity="0.25" className="animate-ping" />
                <circle cx="160" cy="275" r="11" fill="#1E40AF" stroke="#FFFFFF" stroke-width="2" />
                <text x="157" y="279" fill="#FFFFFF" font-family="monospace" font-size="10" font-weight="bold">4</text>
              </g>
            </svg>
          </div>

          {/* Quick Select Buttons */}
          <div className="mt-4 pt-3 border-t border-[#E5E2D9] flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-[#525E59]">Select Component Hotspot:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {Object.keys(currentTargets).map((k, idx) => (
                <button
                  key={k}
                  onClick={() => setSelectedTarget(k)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                    selectedTarget === k
                      ? 'bg-[#0F766E] text-white font-bold shadow-xs'
                      : 'bg-[#F7F5F0] text-[#1C2321] border border-[#E5E2D9] hover:border-[#0F766E]'
                  }`}
                >
                  [{idx + 1}] {currentTargets[k].title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Right: Technical Diagnostic Drawer (4 cols) */}
        <Card className="lg:col-span-4 p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E2D9]">
              <RiskBadge level={activeDetails.risk} opensDevice={activeDetails.opensDevice} />
              <span className="text-[11px] font-mono text-[#525E59]">Technical Drawer</span>
            </div>

            <div>
              <h4 className="text-base font-bold text-[#1C2321] leading-snug">{activeDetails.title}</h4>
              <p className="text-xs text-[#525E59] mt-1.5 leading-relaxed">{activeDetails.description}</p>
            </div>

            {/* Realistic Macro Action Card */}
            <div className="border border-[#E5E2D9] rounded-lg p-3 bg-[#F7F5F0] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-[#1C2321]">Verified Bench Procedure</span>
                <MonoTag variant="spec">{activeDetails.symptom.split('(')[0]}</MonoTag>
              </div>

              <div className="bg-[#18231E] rounded p-3 text-center border border-[#2D3E36]">
                <p className="text-xs text-emerald-300 font-mono leading-relaxed">
                  {activeDetails.action}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#525E59] pt-1">
                <span>Required Tool:</span>
                <span className="font-bold text-[#1C2321]">{activeDetails.tool}</span>
              </div>
            </div>

            {/* Hostel Evidence Metric */}
            <div className="p-3 bg-[#F0FDFA] border border-[#99F6E4] rounded-lg">
              <p className="text-xs text-[#0F766E] leading-relaxed">
                <strong>Hostel Evidence:</strong> {activeDetails.evidence}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E5E2D9] mt-6">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={onLaunchWalkthrough}
            >
              <span>Launch Guided Walkthrough</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </Card>

      </div>
    </div>
  );
}
