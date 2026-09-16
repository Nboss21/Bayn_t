import React from 'react';

const CurriculumHeader = () => {
  return (
    <div className="mb-6">
      <div className="text-[13px] text-gray-500 mb-2">
        <span>Teacher Workspace</span>
        <span className="mx-2">›</span>
        <span className="font-medium text-gray-900">Curriculum</span>
      </div>
      
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#1A1A1A] mb-1">Curriculum</h1>
          <p className="text-[15px] text-gray-500">
            View the modules and lessons for Professional Makeup Artistry.
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F9F9F9] border border-gray-100 rounded-full">
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <span className="text-[13px] font-medium text-gray-700">Academic Year 2026 / Term I</span>
        </div>
      </div>
    </div>
  );
};

export default CurriculumHeader;

