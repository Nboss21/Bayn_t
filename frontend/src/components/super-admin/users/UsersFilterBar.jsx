import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

export default function UsersFilterBar({
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search by name or email...',
  roles = [],
  role = 'All',
  onRoleChange,
  statuses = [],
  status = 'All',
  onStatusChange,
  sorts = [],
  sort = 'recent',
  onSortChange,
  onClearFilters,
}) {
  const hasFilters = Boolean(searchValue || (role && role !== 'All') || (status && status !== 'All'));

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-white border border-[#e5e7eb] rounded-xl p-3 mb-6">
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
        <div className="relative w-full sm:w-[320px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[#9ca3af]" />
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-[#e5e7eb] rounded-lg leading-5 bg-[#f9fafb] placeholder-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5] sm:text-sm"
            placeholder={searchPlaceholder}
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative">
            <select
              value={role}
              onChange={(e) => onRoleChange && onRoleChange(e.target.value)}
              className="block w-full sm:w-[140px] pl-3 pr-10 py-2 text-sm border border-[#e5e7eb] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5] appearance-none cursor-pointer"
            >
              <option value="All">All roles</option>
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown className="h-4 w-4 text-[#6b7280]" />
            </div>
          </div>

          <div className="relative">
            <select
              value={status}
              onChange={(e) => onStatusChange && onStatusChange(e.target.value)}
              className="block w-full sm:w-[140px] pl-3 pr-10 py-2 text-sm border border-[#e5e7eb] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5] appearance-none cursor-pointer"
            >
              <option value="All">All statuses</option>
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown className="h-4 w-4 text-[#6b7280]" />
            </div>
          </div>

          <button
            onClick={onClearFilters}
            disabled={!hasFilters}
            className={`text-sm font-medium px-2 py-2 ${hasFilters ? 'text-[#6b7280] hover:text-[#111827] cursor-pointer' : 'text-[#9ca3af] cursor-not-allowed'}`}
          >
            Clear filters
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 lg:mt-0 justify-end w-full lg:w-auto">
        <span className="text-sm text-[#6b7280]">Sort by:</span>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => onSortChange && onSortChange(e.target.value)}
            className="block w-[160px] pl-3 pr-10 py-2 text-sm border border-[#e5e7eb] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5] appearance-none cursor-pointer"
          >
            {sorts.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-[#6b7280]" />
          </div>
        </div>
      </div>
    </div>
  );
}