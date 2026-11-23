import React from 'react';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

export function SafetyBanner({ type = 'liquid', onDismiss }) {
  const isLiquid = type === 'liquid';

  return (
    <div className="bg-[#FEF2F2] border-2 border-[#EF4444] rounded-bench p-4 sm:p-5 shadow-sm transition-all duration-200">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#EF4444] text-white flex items-center justify-center shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-bold text-[#991B1B] uppercase tracking-wide">
              {isLiquid ? 'CRITICAL SAFETY PROTOCOL: LIQUID INGRESS' : 'HAZARD LOCKOUT: EXPANDING LITHIUM CELL'}
            </h4>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-xs font-mono text-[#991B1B] hover:underline"
              >
                Acknowledge
              </button>
            )}
          </div>
          <p className="text-xs text-[#B91C1C] mt-1 leading-relaxed font-medium">
            {isLiquid ? (
              <>
                <strong>DO NOT plug in the charger or press the power button under any circumstances.</strong> Even if the surface feels dry, liquid bridges 19V AC rails into sensitive 1.05V CPU gates, destroying the processor silicon within seconds.
              </>
            ) : (
              <>
                <strong>FIRE HAZARD: Swollen battery pouch is pressurized with hydrogen gas.</strong> Do not apply pressure, do not pry with metal tools, and do not attempt to screw the bottom case shut against a bulging trackpad.
              </>
            )}
          </p>
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono text-[#991B1B] bg-white px-2.5 py-1 rounded border border-[#FCA5A5] font-semibold">
              {isLiquid ? 'Immediate Action: Stand laptop open in 90° inverted tent on towel' : 'Immediate Action: Discharge below 25%, store in fire-safe box'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
