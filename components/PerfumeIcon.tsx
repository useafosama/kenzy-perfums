import React from 'react';

export const PerfumeIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    className={className}
    strokeWidth="1.2"
  >
    <path 
      d="M12 2L10 6H14L12 2Z" 
      className="text-brand-gold" 
      fill="currentColor" 
      fillOpacity="0.1"
      stroke="currentColor"
    />
    <rect 
      x="7" 
      y="6" 
      width="10" 
      height="14" 
      rx="3" 
      className="text-brand-gold"
      fill="currentColor"
      fillOpacity="0.05"
      stroke="currentColor"
    />
    <path 
      d="M10 11H14" 
      stroke="currentColor" 
      strokeOpacity="0.4"
    />
    <circle cx="12" cy="15" r="1.5" fill="currentColor" className="text-brand-gold" />
  </svg>
);