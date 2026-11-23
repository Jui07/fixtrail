import React from 'react';

export function RiskBadge({ level = 'Safe', opensDevice = false, className = '' }) {
  const styles = {
    Safe: 'bg-[#DCFCE7] text-[#15803D] border-[#86EFAC]',
    Careful: 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]',
    Advanced: 'bg-[#FEE2E2] text-[#B91C1C] border-[#FCA5A5]'
  };

  const currentStyle = styles[level] || styles.Safe;

  return (
    <div className={`inline-flex items-center gap-1.5 flex-wrap ${className}`}>
      <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold border ${currentStyle}`}>
        Risk: {level}
      </span>
      {opensDevice && (
        <span className="px-2 py-0.5 rounded text-[11px] font-mono text-[#525E59] bg-[#F7F5F0] border border-[#E5E2D9]">
          Opens Device
        </span>
      )}
    </div>
  );
}

export function SignalBadge({ children, variant = 'neutral', className = '' }) {
  const variants = {
    neutral: 'bg-[#F7F5F0] text-[#525E59] border-[#E5E2D9]',
    teal: 'bg-[#F0FDFA] text-[#0F766E] border-[#99F6E4]',
    safe: 'bg-[#DCFCE7] text-[#15803D] border-[#86EFAC]',
    careful: 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]',
    hazard: 'bg-[#FEE2E2] text-[#B91C1C] border-[#FCA5A5]'
  };

  return (
    <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium border ${variants[variant] || variants.neutral} ${className}`}>
      {children}
    </span>
  );
}
