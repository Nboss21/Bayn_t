import React from 'react';
import { Link } from 'react-router-dom';

const ApplicationHeader = () => {
  return (
    <header className="bg-[#a87b52] text-white py-6 md:py-8 px-4 sm:px-6 md:px-10 flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <Link to="/" className="text-2xl md:text-[32px] font-script italic leading-none block truncate">
          Logo
        </Link>
      </div>
      
      <div className="flex-1 text-center min-w-0">
        <h1 className="text-lg sm:text-[22px] md:text-[26px] font-serif tracking-widest uppercase leading-none whitespace-nowrap">
          Application
        </h1>
      </div>
      
      <div className="flex-1 flex justify-end min-w-0">
        <Link to="/" className="text-[11px] sm:text-[12px] flex items-center hover:text-white/80 transition whitespace-nowrap">
          <svg className="w-3.5 h-3.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="hidden sm:inline">Return to Website</span>
        </Link>
      </div>
    </header>
  );
};

export default ApplicationHeader;
