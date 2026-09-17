import React from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function PaymentsFilterBar() {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-3">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[220px]">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-[#9ca3af]" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-4 py-2.5 border border-[#e5e7eb] rounded-lg text-sm bg-white placeholder-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5]"
          placeholder="Search by student name or payment reference"
        />
      </div>

      {/* All Statuses Dropdown */}
      <button className="flex items-center gap-2 px-4 py-2.5 border border-[#e5e7eb] rounded-lg text-sm text-[#374151] bg-white hover:bg-[#f9fafb] transition-colors min-w-[130px] cursor-pointer">
        <span>All Statuses</span>
        <ChevronDown className="w-4 h-4 text-[#9ca3af] ml-auto" />
      </button>

      {/* All Programs Dropdown */}
      <button className="flex items-center gap-2 px-4 py-2.5 border border-[#e5e7eb] rounded-lg text-sm text-[#374151] bg-white hover:bg-[#f9fafb] transition-colors min-w-[140px] cursor-pointer">
        <span>All Programs</span>
        <ChevronDown className="w-4 h-4 text-[#9ca3af] ml-auto" />
      </button>

      {/* All Dates Dropdown */}
      <button className="flex items-center gap-2 px-4 py-2.5 border border-[#e5e7eb] rounded-lg text-sm text-[#374151] bg-white hover:bg-[#f9fafb] transition-colors min-w-[120px] cursor-pointer">
        <span>All dates</span>
        <ChevronDown className="w-4 h-4 text-[#9ca3af] ml-auto" />
      </button>

      {/* Filter Icon Button */}
      <button className="p-2.5 border border-[#e5e7eb] rounded-lg text-[#6b7280] bg-white hover:bg-[#f9fafb] transition-colors cursor-pointer">
        <SlidersHorizontal className="w-4 h-4" />
      </button>
    </div>
  );
}
