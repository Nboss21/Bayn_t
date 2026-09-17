import React from 'react';

const CurriculumHeader = ({ header }) => {
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#1A1A1A] mb-1">{header.title}</h1>
          <p className="text-[15px] text-gray-500">{header.subtitle}</p>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F9F9F9] border border-gray-100 rounded-full">
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <span className="text-[13px] font-medium text-gray-700">{header.termBadge}</span>
        </div>
      </div>
    </div>
  );
};

export default CurriculumHeader;