import React from 'react';
import { Search } from 'lucide-react';

const ClassesFilterBar = () => {
  return (
    <div className="flex items-center justify-between mb-6 gap-4">
      {/* Search Input */}
      <div className="relative flex-1 max-w-[480px]">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-[#9ca3af]" />
        </div>
        <input
          type="text"
          placeholder="Search by class name, program, or instructor"
          className="w-full pl-10 pr-4 py-2.5 border border-[#d1d5db] rounded-lg text-[14px] focus:outline-none focus:ring-1 focus:ring-[#9ca3af] focus:border-[#9ca3af] placeholder:text-[#9ca3af] bg-white"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center gap-3">
        <button className="px-5 py-2 bg-white border border-[#d1d5db] rounded-lg text-[14px] font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">
          Program
        </button>
        <button className="px-5 py-2 bg-white border border-[#d1d5db] rounded-lg text-[14px] font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">
          Intake
        </button>
        <button className="px-5 py-2 bg-white border border-[#d1d5db] rounded-lg text-[14px] font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">
          Status
        </button>
      </div>
    </div>
  );
};

export default ClassesFilterBar;
