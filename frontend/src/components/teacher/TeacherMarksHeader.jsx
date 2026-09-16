import React from 'react';
import { ChevronDown } from 'lucide-react';

const TeacherMarksHeader = () => {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="text-[24px] font-semibold text-[#1A1A1A] mb-1">Marks</h1>
        <p className="text-[14px] text-gray-500">Record and manage assessment marks for PMA Morning.</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-[14px] text-gray-500">Assessment:</span>
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-200 rounded-md py-1.5 pl-3 pr-8 text-[14px] font-medium text-[#1A1A1A] focus:outline-none focus:border-gray-300">
              <option>Midterm Assessment</option>
              <option>Final Assessment</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-[#FFF8EE] border border-[#FFDDB8] text-[#D97706] px-3 py-1.5 rounded-full text-[13px] font-medium">
          <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></div>
          Unsaved changes
        </div>
      </div>
    </div>
  );
};

export default TeacherMarksHeader;

