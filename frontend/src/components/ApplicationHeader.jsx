import React from 'react';
import { Link } from 'react-router-dom';

const ApplicationHeader = () => {
  return (
    <header className="bg-[#a87b52] text-white py-8 px-10 flex items-center justify-between">
      <div className="flex-1">
        <Link to="/" className="text-[32px] font-script italic leading-none" style={{ fontFamily: 'cursive' }}>
          Logo
        </Link>
      </div>
      
      <div className="flex-1 text-center">
        <h1 className="text-[26px] font-serif tracking-widest uppercase leading-none" style={{ fontFamily: 'Georgia, serif' }}>
          Application
        </h1>
      </div>
      
      <div className="flex-1 flex justify-end">
        <Link to="/" className="text-[12px] flex items-center hover:text-white/80 transition">
          <svg className="w-3.5 h-3.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to Website
        </Link>
      </div>
    </header>
  );
};

export default ApplicationHeader;
