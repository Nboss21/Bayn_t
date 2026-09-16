import React, { useState } from 'react';
import { Search, X, ChevronDown, ArrowDownUp } from 'lucide-react';

const FilterDropdown = ({ label, value, options, onChange, icon, showValue }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between gap-6 px-4 py-2.5 border border-gray-200 rounded-xl text-[13px] font-medium text-[#1A1A1A] hover:bg-gray-50 transition-colors bg-white w-full"
      >
        <span className="text-gray-600 font-normal whitespace-nowrap flex items-center gap-2">
          {icon}
          {label}: {showValue !== false && <span className="text-[#1A1A1A] font-medium">{value}</span>}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 right-0 z-20 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-[13px] transition-colors ${
                  opt === value
                    ? 'bg-[#EEF1EB] text-[#4A5D4E] font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const TeacherClassesFilterBar = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
  programs,
  programFilter,
  onProgramChange,
  intakes,
  intakeFilter,
  onIntakeChange,
  statuses,
  statusFilter,
  onStatusChange,
  sortOptions,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-4">
        {/* Search */}
        <div className="relative w-[340px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search classes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-colors placeholder:text-gray-400"
          />
          {searchQuery && (
            <button
              onClick={onClearSearch}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex-1"></div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="w-[200px]">
            <FilterDropdown
              label="Program"
              value={programFilter}
              options={programs}
              onChange={onProgramChange}
            />
          </div>

          <div className="w-[200px]">
            <FilterDropdown
              label="Intake"
              value={intakeFilter}
              options={intakes}
              onChange={onIntakeChange}
            />
          </div>

          <div className="w-[140px]">
            <FilterDropdown
              label="Status"
              value={statusFilter}
              options={statuses}
              onChange={onStatusChange}
            />
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sort */}
        <div className="w-[220px]">
          <FilterDropdown
            label="Sort by"
            value={sortBy}
            options={sortOptions}
            onChange={onSortChange}
            icon={<ArrowDownUp className="w-4 h-4 text-gray-400" />}
            showValue={false}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherClassesFilterBar;