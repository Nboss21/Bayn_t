import React, { useEffect, useRef, useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

function FilterDropdown({ label, value, options, onSelect, accent }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const active = value != null;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg text-[14px] font-medium transition-colors ${
          active || open
            ? 'bg-[#111827] border-[#111827] text-white'
            : 'border-[#e5e7eb] text-[#374151] bg-white hover:bg-[#f9fafb]'
        }`}
      >
        {label}
        {active && <span className={`w-1.5 h-1.5 rounded-full ${accent}`}></span>}
        <ChevronDown className={`h-4 w-4 ${active || open ? 'text-white/70' : 'text-[#9ca3af]'}`} />
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-60 bg-white border border-[#e5e7eb] rounded-lg shadow-lg py-2 z-20">
          <button
            onClick={() => {
              onSelect(null);
              setOpen(false);
            }}
            className={`w-full flex items-center justify-between px-4 py-2 text-[14px] transition-colors ${
              !active ? 'bg-[#f4f7ed] text-[#111827] font-medium' : 'text-[#374151] hover:bg-[#f9fafb]'
            }`}
          >
            <span>All {label}s</span>
          </button>
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect(option);
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-2 text-[14px] transition-colors ${
                value === option ? 'bg-[#f4f7ed] text-[#111827] font-medium' : 'text-[#374151] hover:bg-[#f9fafb]'
              }`}
            >
              <span>{option}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StudentsSearchBar({
  searchValue,
  onSearchChange,
  programs,
  intakes,
  statuses,
  program,
  intake,
  status,
  onProgramChange,
  onIntakeChange,
  onStatusChange,
}) {
  const hasActiveFilter = program != null || intake != null || status != null;

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
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, student ID, email, or phone..."
          className="w-full pl-11 pr-9 py-2.5 border border-[#e5e7eb] rounded-lg text-[14px] text-[#374151] placeholder-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#9ca3af] focus:border-[#9ca3af] bg-white"
        />
        {searchValue && (
          <button
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#6b7280] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        )}
      </div>

      {/* Program Filter */}
      <FilterDropdown
        label="Program"
        value={program}
        options={programs}
        onSelect={onProgramChange}
        accent="bg-[#22c55e]"
      />

      {/* Intake Filter */}
      <FilterDropdown
        label="Intake"
        value={intake}
        options={intakes}
        onSelect={onIntakeChange}
        accent="bg-[#3b82f6]"
      />

      {/* Status Filter */}
      <FilterDropdown
        label="Status"
        value={status}
        options={statuses}
        onSelect={onStatusChange}
        accent="bg-[#f59e0b]"
      />

      {/* Clear filters */}
      {hasActiveFilter && (
        <button
          onClick={() => {
            onProgramChange(null);
            onIntakeChange(null);
            onStatusChange(null);
          }}
          className="px-3 py-2.5 text-[13px] font-medium text-[#6b7280] hover:text-[#111827] transition-colors whitespace-nowrap"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}