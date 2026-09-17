import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

export default function NotificationsFilter() {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl p-4 mb-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-[320px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-[#9ca3af]" />
              </div>
              <input
                type="text"
                className="block w-full pl-9 pr-3 py-2 border border-[#e5e7eb] rounded-lg text-sm bg-white placeholder-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5]"
                placeholder="Search notifications..."
              />
            </div>

            <button className="flex items-center justify-between px-3 py-2 border border-[#e5e7eb] rounded-lg bg-white text-sm text-[#4b5563] min-w-[140px] hover:bg-gray-50 cursor-pointer">
              All types
              <ChevronDown className="w-4 h-4 text-[#9ca3af] ml-2" />
            </button>

            <button className="flex items-center justify-between px-3 py-2 border border-[#e5e7eb] rounded-lg bg-white text-sm text-[#4b5563] min-w-[140px] hover:bg-gray-50 cursor-pointer">
              All audiences
              <ChevronDown className="w-4 h-4 text-[#9ca3af] ml-2" />
            </button>

            <button className="flex items-center justify-between px-3 py-2 border border-[#e5e7eb] rounded-lg bg-white text-sm text-[#4b5563] min-w-[140px] hover:bg-gray-50 cursor-pointer">
              All statuses
              <ChevronDown className="w-4 h-4 text-[#9ca3af] ml-2" />
            </button>
          </div>
          
          <div className="flex-shrink-0">
             <button className="text-sm font-medium text-[#4b5563] hover:text-[#111827] cursor-pointer">
              Clear filters
            </button>
          </div>
        </div>

        <div>
           <button className="flex items-center justify-between px-3 py-2 border border-[#e5e7eb] rounded-lg bg-white text-sm text-[#4b5563] min-w-[140px] hover:bg-gray-50 cursor-pointer">
              Any date
              <ChevronDown className="w-4 h-4 text-[#9ca3af] ml-2" />
            </button>
        </div>
      </div>
    </div>
  );
}
