import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

const CurriculumFilter = () => {
  return (
    <div className="mb-8 relative z-10">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">Program</span>
        <button className="flex items-center gap-2 bg-[#F5F5F5] px-3 py-1.5 rounded-md text-[13px] font-medium text-gray-800 hover:bg-gray-200 transition-colors">
          Professional Makeup Artistry (PMA)
          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
        </button>
        <div className="w-px h-6 bg-gray-200 ml-2"></div>
      </div>

      <div className="flex items-center justify-between border-b border-gray-100 pb-px">
        <div className="flex items-center gap-1 bg-[#F5F5F5] p-1 rounded-lg">
          <button className="px-4 py-1.5 rounded-md bg-white shadow-sm text-[13px] font-medium text-gray-900 border border-gray-100">
            All (8)
          </button>
          <button className="px-4 py-1.5 rounded-md text-[13px] font-medium text-gray-600 hover:bg-gray-200 transition-colors">
            Curriculum Modules (4)
          </button>
          <button className="px-4 py-1.5 rounded-md text-[13px] font-medium text-gray-600 hover:bg-gray-200 transition-colors">
            Teaching Briefs (4)
          </button>
        </div>

        <div className="relative w-[320px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search curriculum, topics, or briefs..."
            className="w-full pl-9 pr-4 py-2 bg-[#F5F5F5] border-none rounded-lg text-[13px] focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-gray-500"
          />
        </div>
      </div>
    </div>
  );
};

export default CurriculumFilter;

