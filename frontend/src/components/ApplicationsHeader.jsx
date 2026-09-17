import React from 'react';

const ApplicationsHeader = ({ statusOptions, activeStatus, onStatusChange }) => {
  return (
    <div className="mb-6">
      <h1 className="text-[28px] font-semibold text-gray-900 tracking-tight mb-1">Applications</h1>
      <p className="text-[15px] text-gray-500 mb-6">Review, verify, and manage student applications.</p>

      <div className="flex flex-wrap items-center gap-3">
        {statusOptions.map((option) => {
          const active = option.value === activeStatus;
          return (
            <button
              key={option.value}
              onClick={() => onStatusChange(option.value === 'All' ? null : option.value)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                active
                  ? 'bg-[#c6d7b9] text-gray-900'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {option.label}
              {option.showBadge && (
                <span className="bg-[#fef3c7] text-[#b45309] text-[11px] px-1.5 py-0.5 rounded-full font-bold">
                  {option.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationsHeader;