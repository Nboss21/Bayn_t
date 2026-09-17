import React from 'react';
import { Search, ChevronDown, X } from 'lucide-react';

export default function EnrollmentHistoryFilterBar({
  search,
  onSearchChange,
  program,
  onProgramChange,
  intake,
  onIntakeChange,
  status,
  onStatusChange,
  programs,
  intakes,
  statuses,
  onReset,
}) {
  const hasActiveFilters = search || program !== 'All' || intake !== 'All' || status !== 'All';

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
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-[#e5e7eb] rounded-lg text-[14px] placeholder:text-[#9ca3af] text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#9ca3af] bg-white"
        />
      </div>

      {/* Program Filter */}
      <div className="relative">
        <select
          value={program}
          onChange={(e) => onProgramChange(e.target.value)}
          className="appearance-none flex items-center gap-1.5 px-4 py-2.5 border border-[#e5e7eb] rounded-lg text-[14px] font-medium text-[#374151] bg-white hover:bg-[#f9fafb] transition-colors whitespace-nowrap pr-9 focus:outline-none focus:ring-1 focus:ring-[#9ca3af]"
        >
          <option value="All">Program</option>
          {programs.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280] pointer-events-none" />
      </div>

      {/* Intake Filter */}
      <div className="relative">
        <select
          value={intake}
          onChange={(e) => onIntakeChange(e.target.value)}
          className="appearance-none flex items-center gap-1.5 px-4 py-2.5 border border-[#e5e7eb] rounded-lg text-[14px] font-medium text-[#374151] bg-white hover:bg-[#f9fafb] transition-colors whitespace-nowrap pr-9 focus:outline-none focus:ring-1 focus:ring-[#9ca3af]"
        >
          <option value="All">Intake</option>
          {intakes.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280] pointer-events-none" />
      </div>

      {/* Status Filter */}
      <div className="relative">
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="appearance-none flex items-center gap-1.5 px-4 py-2.5 border border-[#e5e7eb] rounded-lg text-[14px] font-medium text-[#374151] bg-white hover:bg-[#f9fafb] transition-colors whitespace-nowrap pr-9 focus:outline-none focus:ring-1 focus:ring-[#9ca3af]"
        >
          <option value="All">Status</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280] pointer-events-none" />
      </div>

      {/* Date Range (placeholder) */}
      <button className="flex items-center gap-1.5 px-4 py-2.5 border border-[#e5e7eb] rounded-lg text-[14px] font-medium text-[#374151] bg-white hover:bg-[#f9fafb] transition-colors whitespace-nowrap">
        Date range
        <ChevronDown className="w-4 h-4 text-[#6b7280]" />
      </button>

      {/* Reset Filters */}
      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-2.5 text-[13px] font-medium text-[#6b7280] hover:text-[#374151] transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          Reset
        </button>
      )}
    </div>
  );
}
