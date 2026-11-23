import React from 'react';

export function Card({
  children,
  className = '',
  padding = 'p-5',
  hover = false,
  onClick,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-bench border border-[#E5E2D9] ${padding} shadow-bench transition-all duration-150 ${
        hover ? 'hover:border-[#0F766E] hover:shadow-md cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, badge, action, className = '' }) {
  return (
    <div className={`flex items-start justify-between gap-3 pb-3 border-b border-[#E5E2D9] mb-4 ${className}`}>
      <div>
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-bold text-sm text-[#1C2321] tracking-tight">{title}</h3>
          {badge}
        </div>
        {subtitle && <p className="text-xs text-[#525E59] mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
