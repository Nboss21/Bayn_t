import React from 'react';

const ProgramCardButton = ({ label = 'View Details', to = '#', className = '' }) => {
  return (
    <a
      href={to}
      className={`inline-flex items-center justify-between bg-[#dfbe53] hover:bg-[#d4b044] text-[#1a1a1a] text-[11px] sm:text-[12px] font-bold py-1.5 px-3 transition-colors rounded-none ${className}`}
    >
      <span>{label}</span>
      <svg
        className="w-3.5 h-3.5 ml-2 text-[#1a1a1a]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
        />
      </svg>
    </a>
  );
};

export default ProgramCardButton;
