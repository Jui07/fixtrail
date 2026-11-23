import React from 'react';

export function MonoTag({
  children,
  highlight = false,
  variant = 'key',
  className = ''
}) {
  const variants = {
    key: 'bg-white border border-[#D5D0C3] text-[#1C2321] font-bold shadow-xs px-2 py-0.5 rounded text-xs',
    code: 'bg-[#18231E] border border-[#2D3E36] text-[#A7F3D0] px-2 py-0.5 rounded text-[11px]',
    spec: 'bg-[#F7F5F0] border border-[#E5E2D9] text-[#525E59] px-2 py-0.5 rounded text-[11px]'
  };

  return (
    <span className={`font-mono inline-block ${variants[variant] || variants.key} ${highlight ? 'text-[#0F766E] border-[#99F6E4]' : ''} ${className}`}>
      {children}
    </span>
  );
}
