import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const CurriculumFilter = ({
  programs,
  activeProgramId,
  onProgramChange,
  filterTabs,
  tabCounts,
  activeType,
  onTypeChange,
  searchQuery,
  onSearchChange,
}) => {
  const [programOpen, setProgramOpen] = useState(false);
  const activeProgramLabel = programs.find((p) => p.id === activeProgramId)?.label || programs[0]?.label;

  return (
    <div className="mb-8 relative z-10">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">Program</span>
        <div className="relative">
          <button
            onClick={() => setProgramOpen((prev) => !prev)}
            className="flex items-center gap-2 bg-[#F5F5F5] px-3 py-1.5 rounded-md text-[13px] font-medium text-gray-800 hover:bg-gray-200 transition-colors"
          >
            {activeProgramLabel}
            <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${programOpen ? 'rotate-180' : ''}`} />
          </button>
          {programOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setProgramOpen(false)} />
              <div className="absolute left-0 z-20 mt-2 w-[260px] bg-white border border-gray-200 rounded-xl shadow-lg py-1.5">
                {programs.map((prog) => (
                  <button
                    key={prog.id}
                    onClick={() => { onProgramChange(prog.id); setProgramOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-[13px] transition-colors ${
                      prog.id === activeProgramId
                        ? 'bg-[#F0F4EC] text-[#4A5D37] font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {prog.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="w-px h-6 bg-gray-200 ml-2"></div>
      </div>

      <div className="flex items-center justify-between border-b border-gray-100 pb-px">
        <div className="flex items-center gap-1 bg-[#F5F5F5] p-1 rounded-lg">
          {filterTabs.map((tab) => {
            const count = tabCounts[tab.id] ?? 0;
            const isActive = activeType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTypeChange(tab.id)}
                className={`px-4 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
                  isActive
                    ? 'bg-white shadow-sm text-gray-900 border border-gray-100'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative w-[320px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search curriculum, topics, or briefs..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F5F5F5] border-none rounded-lg text-[13px] focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-gray-500"
          />
        </div>
      </div>
    </div>
  );
};

export default CurriculumFilter;