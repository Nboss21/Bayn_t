import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

export default function ProgramsFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-white p-4 rounded-xl border border-[#e5e7eb] justify-between items-center">
      <div className="flex flex-col sm:flex-row gap-4 flex-1 items-center">
        <div className="relative w-full sm:w-[300px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[#9ca3af]" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-[#e5e7eb] rounded-lg text-sm placeholder-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#c6dbb6] focus:border-[#c6dbb6]"
            placeholder="Search programs..."
          />
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative">
            <select className="appearance-none block w-full pl-3 pr-10 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#4b5563] focus:outline-none focus:ring-1 focus:ring-[#c6dbb6] focus:border-[#c6dbb6] bg-white cursor-pointer">
              <option>Status: All</option>
              <option>Open</option>
              <option>Upcoming</option>
              <option>Closed</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-[#6b7280]">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>

          <div className="relative">
            <select className="appearance-none block w-full pl-3 pr-10 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#4b5563] focus:outline-none focus:ring-1 focus:ring-[#c6dbb6] focus:border-[#c6dbb6] bg-white cursor-pointer">
              <option>Level: All</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-[#6b7280]">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
          
          <button className="text-sm font-medium text-[#6b7280] hover:text-[#111827] whitespace-nowrap cursor-pointer">
            Clear filters
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-[#6b7280]">Sort by:</span>
        <div className="relative">
          <select className="appearance-none block w-full pl-3 pr-10 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#111827] font-medium focus:outline-none focus:ring-1 focus:ring-[#c6dbb6] focus:border-[#c6dbb6] bg-white cursor-pointer">
            <option>Recently updated</option>
            <option>Name A-Z</option>
            <option>Name Z-A</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-[#6b7280]">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
