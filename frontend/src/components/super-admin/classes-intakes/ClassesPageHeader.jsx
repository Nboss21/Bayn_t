import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ClassesPageHeader({
  title = 'Classes & Intakes',
  description = '',
  activeCount = 0,
  activeLabel = 'active classes',
  addClassPath = '/super-admin/classes/add',
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-[28px] font-semibold text-[#111827] tracking-tight">{title}</h1>
        <p className="text-[14px] text-[#6b7280] mt-1 font-medium">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-[#f3f4f6] text-[#4b5563] text-[13px] font-medium px-3 py-1.5 rounded-full border border-[#e5e7eb]">
          {activeCount} {activeLabel}
        </div>
        <button
          onClick={() => navigate(addClassPath)}
          className="flex items-center gap-2 bg-[#27272a] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#3f3f46] transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Class
        </button>
      </div>
    </div>
  );
}