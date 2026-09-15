import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

export default function StudentsSearchBar({ searchValue, onSearchChange }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      {/* Search Input */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-[#9ca3af]" />
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          placeholder="Search by name, student ID, email, or phone..."
          className="w-full pl-11 pr-4 py-2.5 border border-[#e5e7eb] rounded-lg text-[14px] text-[#374151] placeholder-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#9ca3af] focus:border-[#9ca3af] bg-white"
        />
      </div>

      {/* Program Filter */}
      <button className="flex items-center gap-2 px-4 py-2.5 border border-[#e5e7eb] rounded-lg text-[14px] font-medium text-[#374151] bg-white hover:bg-[#f9fafb] transition-colors">
        Program
        <ChevronDown className="h-4 w-4 text-[#9ca3af]" />
      </button>

      {/* Intake Filter */}
      <button className="flex items-center gap-2 px-4 py-2.5 border border-[#e5e7eb] rounded-lg text-[14px] font-medium text-[#374151] bg-white hover:bg-[#f9fafb] transition-colors">
        Intake
        <ChevronDown className="h-4 w-4 text-[#9ca3af]" />
      </button>

      {/* Status Filter */}
      <button className="flex items-center gap-2 px-4 py-2.5 border border-[#e5e7eb] rounded-lg text-[14px] font-medium text-[#374151] bg-white hover:bg-[#f9fafb] transition-colors">
        Status
        <ChevronDown className="h-4 w-4 text-[#9ca3af]" />
      </button>
    </div>
  );
}
