import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

export default function ClassesFilters({
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search classes or programs...',
  statuses = [],
  status = 'All',
  onStatusChange,
  programs = [],
  program = 'All',
  onProgramChange,
  intakes = [],
  intake = 'All',
  onIntakeChange,
  sorts = [],
  sort = 'name-asc',
  onSortChange,
  onClearFilters,
}) {
  const hasFilters = Boolean(
    searchValue ||
      (status && status !== 'All') ||
      (program && program !== 'All') ||
      (intake && intake !== 'All'),
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-white p-4 rounded-xl border border-[#e5e7eb] justify-between items-center">
      <div className="flex flex-col sm:flex-row gap-4 flex-1 items-center">
        <div className="relative w-full sm:w-[280px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[#9ca3af]" />
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-[#e5e7eb] rounded-lg text-sm placeholder-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#c6dbb6] focus:border-[#c6dbb6]"
            placeholder={searchPlaceholder}
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
          <div className="relative">
            <select
              value={status}
              onChange={(e) => onStatusChange && onStatusChange(e.target.value)}
              className="appearance-none block w-full pl-3 pr-10 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#4b5563] focus:outline-none focus:ring-1 focus:ring-[#c6dbb6] focus:border-[#c6dbb6] bg-white cursor-pointer"
            >
              <option value="All">Status: All</option>
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-[#6b7280]">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>

          <div className="relative">
            <select
              value={program}
              onChange={(e) => onProgramChange && onProgramChange(e.target.value)}
              className="appearance-none block w-full pl-3 pr-10 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#4b5563] focus:outline-none focus:ring-1 focus:ring-[#c6dbb6] focus:border-[#c6dbb6] bg-white cursor-pointer"
            >
              <option value="All">Program: All Programs</option>
              {programs.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-[#6b7280]">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>

          <div className="relative">
            <select
              value={intake}
              onChange={(e) => onIntakeChange && onIntakeChange(e.target.value)}
              className="appearance-none block w-full pl-3 pr-10 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#4b5563] focus:outline-none focus:ring-1 focus:ring-[#c6dbb6] focus:border-[#c6dbb6] bg-white cursor-pointer"
            >
              <option value="All">Intake: All Intakes</option>
              {intakes.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-[#6b7280]">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>

          <button
            onClick={onClearFilters}
            disabled={!hasFilters}
            className={`text-sm font-medium whitespace-nowrap ${hasFilters ? 'text-[#6b7280] hover:text-[#111827] cursor-pointer' : 'text-[#9ca3af] cursor-not-allowed'}`}
          >
            Clear filters
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-[#6b7280]">Sort by:</span>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => onSortChange && onSortChange(e.target.value)}
            className="appearance-none block w-full pl-3 pr-10 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#111827] font-medium focus:outline-none focus:ring-1 focus:ring-[#c6dbb6] focus:border-[#c6dbb6] bg-white cursor-pointer"
          >
            {sorts.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-[#6b7280]">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}