import React from 'react';
import { Search, X, ChevronDown, ArrowDownUp } from 'lucide-react';

const TeacherClassesFilterBar = () => {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-4">
        {/* Search */}
        <div className="relative w-[340px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search classes..."
            className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-colors placeholder:text-gray-400"
          />
          <button className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1"></div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-between gap-6 px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] font-medium text-[#1A1A1A] hover:bg-gray-50 transition-colors min-w-[200px]">
            <span className="text-gray-600 font-normal">Program: <span className="text-[#1A1A1A] font-medium">All Programs</span></span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          <button className="flex items-center justify-between gap-6 px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] font-medium text-[#1A1A1A] hover:bg-gray-50 transition-colors min-w-[200px]">
            <span className="text-gray-600 font-normal">Intake: <span className="text-[#1A1A1A] font-medium">September 2026</span></span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          <button className="flex items-center justify-between gap-6 px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] font-medium text-[#1A1A1A] hover:bg-gray-50 transition-colors min-w-[140px]">
            <span className="text-gray-600 font-normal">Status: <span className="text-[#1A1A1A] font-medium">All</span></span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sort */}
        <button className="flex items-center justify-between gap-8 px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] font-medium text-[#1A1A1A] hover:bg-gray-50 transition-colors min-w-[220px]">
          <div className="flex items-center gap-2">
            <ArrowDownUp className="w-4 h-4 text-gray-400" />
            <span className="text-[#1A1A1A]">Sort by Schedule</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default TeacherClassesFilterBar;

