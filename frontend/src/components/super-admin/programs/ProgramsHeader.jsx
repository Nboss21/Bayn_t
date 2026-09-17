import React from 'react';
import { Plus } from 'lucide-react';

export default function ProgramsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Programs</h1>
        <p className="text-sm text-[#6b7280] mt-1">Manage the programs offered by HOB.</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#f0f2ea] text-[#4b5563]">
          4 active programs
        </span>
        <button className="inline-flex items-center px-4 py-2 bg-[#27272a] text-white text-sm font-medium rounded-lg hover:bg-[#3f3f46] transition-colors cursor-pointer">
          <Plus className="w-4 h-4 mr-2" />
          Add Program
        </button>
      </div>
    </div>
  );
}
