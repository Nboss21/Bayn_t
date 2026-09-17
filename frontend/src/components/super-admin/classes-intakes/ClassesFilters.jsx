import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

export default function ClassesFilters() {
  return (
    <div className="flex flex-col gap-4 bg-[#fafaf9] rounded-xl mb-4">
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[#9ca3af]" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-[#e5e7eb] rounded-lg leading-5 bg-white placeholder-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#b39556] focus:border-[#b39556] sm:text-sm text-[#111827]"
            placeholder="Search classes or programs..."
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-3">
          <button className="bg-white border border-[#e5e7eb] text-[#374151] px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer">
            Status: All <ChevronDown className="w-4 h-4 text-[#9ca3af]" />
          </button>
          
          <button className="bg-white border border-[#e5e7eb] text-[#374151] px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer">
            Program: All Programs <ChevronDown className="w-4 h-4 text-[#9ca3af]" />
          </button>
          
          <button className="bg-white border border-[#e5e7eb] text-[#374151] px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer">
            Intake: All Intakes <ChevronDown className="w-4 h-4 text-[#9ca3af]" />
          </button>
        </div>

        {/* Clear filters */}
        <button className="text-[13px] font-medium text-[#6b7280] hover:text-[#374151] ml-2 cursor-pointer">
          Clear filters
        </button>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <span className="text-[13px] text-[#6b7280] font-medium">Sort by:</span>
        <button className="bg-white border border-[#e5e7eb] text-[#374151] px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">
          Class name <ChevronDown className="w-4 h-4 text-[#9ca3af]" />
        </button>
      </div>
    </div>
  );
}
