import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

export default function AuditLogFilters() {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] p-5 mb-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative w-[340px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#9ca3af]" />
              <input
                type="text"
                placeholder="Search user, action, or resource"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#e5e7eb] text-sm text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#c3d3ba]"
              />
            </div>
            <div className="relative">
              <select className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-[#e5e7eb] text-sm text-[#111827] bg-white hover:bg-gray-50 focus:outline-none cursor-pointer w-[160px]">
                <option>Any date</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280] pointer-events-none" />
            </div>
            <div className="relative">
              <select className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-[#e5e7eb] text-sm text-[#111827] bg-white hover:bg-gray-50 focus:outline-none cursor-pointer w-[160px]">
                <option>All areas</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280] pointer-events-none" />
            </div>
          </div>
          <div className="relative">
            <select className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-[#e5e7eb] text-sm text-[#111827] bg-white hover:bg-gray-50 focus:outline-none cursor-pointer w-[140px]">
              <option>All actions</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280] pointer-events-none" />
          </div>
        </div>
        <div className="pt-2 pr-2">
          <button className="text-sm font-medium text-[#4b5563] hover:text-[#111827] transition-colors whitespace-nowrap cursor-pointer">
            Clear filters
          </button>
        </div>
      </div>
    </div>
  );
}
