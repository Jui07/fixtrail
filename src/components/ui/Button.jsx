import React from 'react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-bench transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F766E] disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    primary: 'bg-[#0F766E] text-white hover:bg-[#115E59] shadow-sm border border-transparent',
    secondary: 'bg-white text-[#1C2321] border border-[#E5E2D9] hover:bg-[#F7F5F0] hover:border-[#D5D0C3] shadow-sm',
    ghost: 'bg-transparent text-[#525E59] hover:text-[#1C2321] hover:bg-[#E5E2D9]/40',
    danger: 'bg-[#B91C1C] text-white hover:bg-[#991B1B] shadow-sm',
    safe: 'bg-[#15803D] text-white hover:bg-[#166534] shadow-sm',
    warning: 'bg-[#B45309] text-white hover:bg-[#92400E] shadow-sm'
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-xs px-3.5 py-2 gap-2',
    lg: 'text-sm px-5 py-2.5 gap-2.5'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
