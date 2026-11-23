import React from 'react';

export function Skeleton({ className = '', rounded = 'rounded-lg' }) {
  return (
    <div className={`bg-[#E5E2D9]/60 animate-pulse ${rounded} ${className}`} />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-bench border border-[#E5E2D9] p-5 shadow-bench space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="w-32 h-4" />
        <Skeleton className="w-16 h-3" />
      </div>
      <Skeleton className="w-full h-24" />
      <div className="space-y-2">
        <Skeleton className="w-3/4 h-3" />
        <Skeleton className="w-1/2 h-3" />
      </div>
    </div>
  );
}
