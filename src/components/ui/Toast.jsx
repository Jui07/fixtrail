import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export function Toast({ message, visible, onHide }) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 bg-[#1C2321] text-white px-4 py-3 rounded-xl shadow-xl text-xs font-mono flex items-center gap-3 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2">
      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
      <span className="leading-snug">{message}</span>
    </div>
  );
}
