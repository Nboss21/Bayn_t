import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

const filterButtons = [
  { label: 'Program' },
  { label: 'Intake' },
  { label: 'Status' },
  { label: 'Date range' },
];

export default function EnrollmentHistoryFilterBar() {
  return (
    <div className="flex items-center gap-3 mb-5">
      {/* Search Input */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-[#9ca3af]" />
        </div>
        <input
          type="text"
          placeholder="Search by student name, student ID, or application ID"
          className="w-full pl-10 pr-4 py-2.5 border border-[#e5e7eb] rounded-lg text-[14px] placeholder:text-[#9ca3af] text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#9ca3af] bg-white"
        />
      </div>

      {/* Filter Buttons */}
      {filterButtons.map((filter) => (
        <button
          key={filter.label}
          className="flex items-center gap-1.5 px-4 py-2.5 border border-[#e5e7eb] rounded-lg text-[14px] font-medium text-[#374151] bg-white hover:bg-[#f9fafb] transition-colors whitespace-nowrap"
        >
          {filter.label}
          <ChevronDown className="w-4 h-4 text-[#6b7280]" />
        </button>
      ))}
    </div>
  );
}
