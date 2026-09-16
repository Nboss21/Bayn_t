import React, { useState } from 'react';

const ApplicationsFilterBar = ({ search, onSearchChange, statusOptions, activeStatus, onStatusChange, onReset }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="relative flex-1 max-w-[400px]">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, application ID, or program"
          className="w-full pl-4 pr-9 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-gray-400"
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        )}
      </div>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center px-6 py-2 bg-white border border-gray-200 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors gap-1.5"
        >
          Filters
          <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-2">
            {statusOptions.map((option) => {
              const active = option.value === activeStatus;
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    onStatusChange(option.value === 'All' ? null : option.value);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2 text-[14px] transition-colors ${
                    active ? 'bg-[#f2f4ec] text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{option.label}</span>
                  {option.showBadge && (
                    <span className="bg-[#fef3c7] text-[#b45309] text-[11px] px-1.5 py-0.5 rounded-full font-bold">
                      {option.count}
                    </span>
                  )}
                </button>
              );
            })}
            <div className="border-t border-gray-100 mt-1 pt-1">
              <button
                onClick={() => {
                  onReset();
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-[14px] text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Clear filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationsFilterBar;