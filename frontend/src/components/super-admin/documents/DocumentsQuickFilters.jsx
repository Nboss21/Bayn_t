import React from 'react';

const DocumentsQuickFilters = () => {
  const filters = [
    { name: 'All', count: 8, active: true },
    { name: 'Policies', count: 2, active: false },
    { name: 'Forms', count: 2, active: false },
    { name: 'Certificates', count: 1, active: false },
    { name: 'Student documents', count: 2, active: false },
    { name: 'Other', count: 1, active: false },
  ];

  return (
    <div className="flex items-center gap-3 mb-6 pb-4 overflow-x-auto">
      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest shrink-0">QUICK FILTER:</span>
      <div className="flex items-center gap-2">
        {filters.map((filter, index) => (
          <button
            key={index}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${
              filter.active
                ? 'bg-[#EAE5DF] border-[#EAE5DF] text-gray-900'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
           className="cursor-pointer">
            {filter.name}
            <span className={filter.active ? 'text-gray-600' : 'text-gray-400'}>
              ({filter.count})
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DocumentsQuickFilters;
