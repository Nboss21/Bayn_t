import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

export default function UsersFilterBar() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-white border border-[#e5e7eb] rounded-xl p-3 mb-6">
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
        <div className="relative w-full sm:w-[320px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[#9ca3af]" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-[#e5e7eb] rounded-lg leading-5 bg-[#f9fafb] placeholder-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5] sm:text-sm"
            placeholder="Search by name or email..."
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative">
            <select className="block w-full sm:w-[140px] pl-3 pr-10 py-2 text-sm border border-[#e5e7eb] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5] appearance-none cursor-pointer">
              <option>All roles</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown className="h-4 w-4 text-[#6b7280]" />
            </div>
          </div>

          <div className="relative">
            <select className="block w-full sm:w-[140px] pl-3 pr-10 py-2 text-sm border border-[#e5e7eb] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5] appearance-none cursor-pointer">
              <option>All statuses</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown className="h-4 w-4 text-[#6b7280]" />
            </div>
          </div>

          <button className="text-sm font-medium text-[#6b7280] hover:text-[#111827] px-2 py-2 cursor-pointer">
            Clear filters
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 lg:mt-0 justify-end w-full lg:w-auto">
        <span className="text-sm text-[#6b7280]">Sort by:</span>
        <div className="relative">
          <select className="block w-[160px] pl-3 pr-10 py-2 text-sm border border-[#e5e7eb] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5] appearance-none cursor-pointer">
            <option>Recently added</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-[#6b7280]" />
          </div>
        </div>
      </div>
    </div>
  );
}
