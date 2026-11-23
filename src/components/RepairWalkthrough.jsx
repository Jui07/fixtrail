import React, { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { RiskBadge } from './ui/Badge';
import { MonoTag } from './ui/MonoTag';
import { ArrowLeft, ArrowRight, Clock, HelpCircle, CheckCircle2, ShieldCheck, Moon, Sun } from 'lucide-react';

export function RepairWalkthrough({ onCompleteWalkthrough, onShowToast }) {
  const steps = [
    {
      id: 1,
      title: 'Power Isolation & AC Disconnect',
      risk: 'Safe',
      tool: 'No tools needed',
      durationSeconds: 30,
      instruction: 'Unplug the charger barrel connector completely from the laptop and the wall socket.',
      caution: 'Never open a laptop with the AC power brick connected. 19.5V line shorting kills processor chips instantly.',
      checks: [
        'Charger barrel cable removed from DC jack',
        'External USB drives, mouse dongles, and headphone cables detached'
      ],
      svgDiagram: (
        <svg className="w-full max-w-sm h-36" viewBox="0 0 360 140" fill="none">
          <rect x="20" y="20" width="320" height="100" rx="8" fill="#1F2937" stroke="#374151" stroke-width="2" />
          <path d="M50 70 H150" stroke="#EF4444" stroke-width="6" stroke-linecap="round" />
          <rect x="140" y="58" width="30" height="24" rx="3" fill="#E5E7EB" />
          <path d="M190 70 H250" stroke="#10B981" stroke-width="4" stroke-dasharray="4 2" />
          <text x="70" y="105" fill="#9CA3AF" font-family="monospace" font-size="9">PULL CHARGER OUT &larr;</text>
        </svg>
      )
    },
    {
      id: 2,
      title: 'Disconnect Internal Battery Header',
      risk: 'Careful',
      tool: 'Plastic Spudger or Fingernail',
      durationSeconds: 45,
      instruction: 'Locate the black battery cable ribbon at the top edge of the 42Wh battery pouch. Slide the plastic plug parallel to the board.',
      caution: 'SLIDE HORIZONTALLY. Do NOT pry or lift vertically — you will pull the surface-mount socket solder pads straight off the motherboard!',
      checks: [
        'Plastic battery connector pulled back 5mm out of its header',
        'Hold power button for 15 seconds to discharge residual capacitor voltage'
      ],
      svgDiagram: (
        <svg className="w-full max-w-sm h-36" viewBox="0 0 360 140" fill="none">
          <rect x="20" y="20" width="320" height="100" rx="8" fill="#1F2937" stroke="#374151" stroke-width="2" />
          <rect x="50" y="40" width="100" height="60" rx="4" fill="#374151" />
          <rect x="180" y="40" width="130" height="60" rx="4" fill="#111827" />
          <path d="M150 70 L180 70" stroke="#EF4444" stroke-width="6" />
          <rect x="155" y="58" width="18" height="24" rx="2" fill="#E5E7EB" />
          <text x="195" y="75" fill="#FFFFFF" font-family="monospace" font-size="9" font-weight="bold">HEADER PLUG</text>
          <path d="M130 95 H180 M165 88 L180 95 L165 102" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Release RAM Spring Clips & Clean Gold Pins',
      risk: 'Careful',
      tool: 'Clean White Pencil Eraser',
      durationSeconds: 60,
      instruction: 'Use two thumbs to spread the two silver metal retaining clips simultaneously outward. The memory stick will spring up at a 30° angle.',
      caution: 'Handle stick strictly by the green fiberglass edges. Do not touch gold pins with sweaty fingers.',
      checks: [
        'RAM module sprang up to 30° naturally without force',
        'Both sides of gold contact fingers cleaned with eraser until bright shiny gold',
        'Wiped away all rubber eraser crumbs before re-inserting'
      ],
      svgDiagram: (
        <svg className="w-full max-w-sm h-36" viewBox="0 0 360 140" fill="none">
          <rect x="20" y="20" width="320" height="100" rx="8" fill="#1B2E24" stroke="#2D4D3B" stroke-width="2" />
          <g transform="translate(100, 30) rotate(-10)">
            <rect x="0" y="0" width="160" height="55" rx="3" fill="#1E4430" stroke="#34D399" stroke-width="1.5" />
            <rect x="15" y="10" width="25" height="20" fill="#000000" />
            <rect x="50" y="10" width="25" height="20" fill="#000000" />
            <rect x="85" y="10" width="25" height="20" fill="#000000" />
            <rect x="120" y="10" width="25" height="20" fill="#000000" />
            <path d="M0 50 H160" stroke="#FBBF24" stroke-width="3" stroke-dasharray="2 1" />
          </g>
          <text x="50" y="115" fill="#A7F3D0" font-family="monospace" font-size="9">POPS UP AT 30° ANGLE &uarr;</text>
        </svg>
      )
    },
    {
      id: 4,
      title: 'Firm Re-seating & Snap Verification',
      risk: 'Careful',
      tool: 'Finger Pressure',
      durationSeconds: 30,
      instruction: 'Insert the module back into Slot A at 30° all the way until gold pins disappear, then press downwards until you hear a loud, crisp mechanical CLICK.',
      caution: 'If it doesn’t click on both left and right sides simultaneously, pull it out and re-align notch.',
      checks: [
        'Center alignment notch correctly seated in socket keyway',
        'Heard crisp dual-side click from silver metal spring locks'
      ],
      svgDiagram: (
        <svg className="w-full max-w-sm h-36" viewBox="0 0 360 140" fill="none">
          <rect x="20" y="20" width="320" height="100" rx="8" fill="#1B2E24" stroke="#2D4D3B" stroke-width="2" />
          <rect x="80" y="45" width="200" height="50" rx="3" fill="#1E4430" stroke="#34D399" stroke-width="2" />
          <text x="120" y="75" fill="#FFFFFF" font-family="monospace" font-size="11" font-weight="bold">* CLICK SOUND *</text>
          <path d="M65 70 H78 M282 70 H295" stroke="#E5E7EB" stroke-width="4" />
        </svg>
      )
    }
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
    const saved = localStorage.getItem('fixtrail_step');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [screenAwake, setScreenAwake] = useState(true);
  const [checkedItems, setCheckedItems] = useState({});
  const [showOutcomeGate, setShowOutcomeGate] = useState(false);

  const currentStep = steps[currentStepIndex];

  // Step timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Offline caching
  useEffect(() => {
    localStorage.setItem('fixtrail_step', currentStepIndex.toString());
  }, [currentStepIndex]);

  const formatTimer = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleToggleCheck = (index) => {
    const key = `${currentStepIndex}-${index}`;
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isCurrentStepReady = () => {
    return currentStep.checks.every((_, i) => checkedItems[`${currentStepIndex}-${i}`]);
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      onShowToast?.(`Advanced to Step ${currentStepIndex + 2}`);
    } else {
      setShowOutcomeGate(true);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleOutcomeSelect = (outcome) => {
    setShowOutcomeGate(false);
    localStorage.removeItem('fixtrail_step');
    onCompleteWalkthrough(outcome);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Progress & Header */}
      <Card className="p-4 sm:p-5">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-mono font-bold text-[#0F766E]">
            Step {currentStepIndex + 1} of {steps.length}
          </span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[#525E59] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTimer(secondsElapsed)}</span>
            </span>
            <button
              onClick={() => {
                setScreenAwake(!screenAwake);
                onShowToast?.(`Keep Screen Awake: ${!screenAwake ? 'ON' : 'OFF'}`);
              }}
              className="text-[11px] font-mono px-2 py-0.5 rounded border border-[#E5E2D9] bg-[#F7F5F0] hover:bg-white text-[#525E59]"
            >
              Keep Screen Awake: {screenAwake ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full h-2 bg-[#F7F5F0] rounded-full overflow-hidden border border-[#E5E2D9]">
          <div
            className="h-full bg-[#0F766E] transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
          />
        </div>
      </Card>

      {/* Step Card (One Step per Screen) */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <RiskBadge level={currentStep.risk} opensDevice={true} />
            <h2 className="text-xl font-bold text-[#1C2321] mt-2">
              {currentStep.title}
            </h2>
          </div>
          <MonoTag variant="spec">Tool: {currentStep.tool}</MonoTag>
        </div>

        {/* Step Diagram / Macro SVG */}
        <div className="border border-[#E5E2D9] rounded-xl p-4 bg-[#F7F5F0] flex flex-col items-center justify-center">
          {currentStep.svgDiagram}
          <p className="text-xs text-[#525E59] mt-3 font-medium text-center max-w-md">
            {currentStep.instruction}
          </p>
        </div>

        {/* Red Warning / Caution Box */}
        <div className="p-3.5 rounded-lg border-l-4 border-l-[#B91C1C] bg-[#FEF2F2] border border-[#FCA5A5]/40">
          <div className="flex items-start gap-2">
            <span className="text-xs font-mono font-bold text-[#B91C1C] uppercase shrink-0">CAUTION:</span>
            <p className="text-xs text-[#B91C1C] leading-relaxed">
              {currentStep.caution}
            </p>
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-[#1C2321] uppercase tracking-wide">
            Verification Checklist Before Next Step:
          </h4>
          {currentStep.checks.map((chk, i) => {
            const isChecked = !!checkedItems[`${currentStepIndex}-${i}`];
            return (
              <label
                key={i}
                onClick={() => handleToggleCheck(i)}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer text-xs ${
                  isChecked
                    ? 'border-[#0F766E] bg-[#F0FDFA]'
                    : 'border-[#E5E2D9] hover:bg-[#F7F5F0]'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  readOnly
                  className="w-4 h-4 mt-0.5 accent-[#0F766E] rounded"
                />
                <span className={isChecked ? 'text-[#0F766E] font-medium' : 'text-[#1C2321]'}>
                  {chk}
                </span>
              </label>
            );
          })}
        </div>

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-[#E5E2D9] flex items-center justify-between gap-3 flex-wrap">
          <Button
            variant="secondary"
            size="md"
            disabled={currentStepIndex === 0}
            onClick={handleBack}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Back</span>
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="warning"
              size="md"
              onClick={() => onShowToast?.("Hostel Senior Help triggered: Pinging senior bench in Block D!")}
            >
              <HelpCircle className="w-4 h-4 mr-1" />
              <span>I'm Stuck Here</span>
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={handleNext}
              className={isCurrentStepReady() ? 'ring-2 ring-offset-2 ring-[#0F766E]' : ''}
            >
              <span>{currentStepIndex === steps.length - 1 ? 'Finish & Check Outcome' : 'Next Step'}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Outcome Gate Modal / Full View */}
      {showOutcomeGate && (
        <Card className="p-6 sm:p-8 text-center border-2 border-[#0F766E]">
          <div className="w-12 h-12 rounded-full bg-[#DCFCE7] text-[#15803D] inline-flex items-center justify-center mb-3">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#1C2321]">Did it work?</h3>
          <p className="text-xs text-[#525E59] mt-1 max-w-md mx-auto">
            Your honest feedback updates the live repair statistics for other engineering students.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 text-left">
            <button
              onClick={() => handleOutcomeSelect('fixed')}
              className="p-4 rounded-xl border-2 border-[#15803D] bg-[#DCFCE7]/40 hover:bg-[#DCFCE7] transition-all"
            >
              <span className="font-bold text-xs text-[#15803D] block">Yes, Completely Fixed!</span>
              <span className="text-[11px] text-[#525E59] mt-0.5 block">Display turned on, booted straight into Windows or Ubuntu.</span>
            </button>

            <button
              onClick={() => handleOutcomeSelect('partial')}
              className="p-4 rounded-xl border-2 border-[#B45309] bg-[#FEF3C7]/40 hover:bg-[#FEF3C7] transition-all"
            >
              <span className="font-bold text-xs text-[#B45309] block">Helped, but issue remains</span>
              <span className="text-[11px] text-[#525E59] mt-0.5 block">Display worked once, but fan is still loud or rebooted.</span>
            </button>

            <button
              onClick={() => handleOutcomeSelect('unsolved')}
              className="p-4 rounded-xl border-2 border-[#E5E2D9] hover:border-[#1C2321] transition-all"
            >
              <span className="font-bold text-xs text-[#1C2321] block">Didn't solve it</span>
              <span className="text-[11px] text-[#525E59] mt-0.5 block">Still black screen or same LED blink rhythm.</span>
            </button>

            <button
              onClick={() => handleOutcomeSelect('unsafe')}
              className="p-4 rounded-xl border-2 border-[#EF4444] bg-[#FEE2E2]/40 hover:bg-[#FEE2E2] transition-all"
            >
              <span className="font-bold text-xs text-[#B91C1C] block">Got stuck / Felt unsafe</span>
              <span className="text-[11px] text-[#525E59] mt-0.5 block">Tight screw stripped or clip felt too fragile to force.</span>
            </button>
          </div>
        </Card>
      )}

    </div>
  );
}
