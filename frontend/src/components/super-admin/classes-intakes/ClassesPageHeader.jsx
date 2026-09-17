import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ClassesPageHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-[28px] font-semibold text-[#111827] tracking-tight">Classes & Intakes</h1>
        <p className="text-[14px] text-[#6b7280] mt-1 font-medium">Manage class groups, schedules, intakes, and capacity.</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-[#f3f4f6] text-[#4b5563] text-[13px] font-medium px-3 py-1.5 rounded-full border border-[#e5e7eb]">
          8 active classes
        </div>
        <Link 
          to="/super-admin/classes/add"
          className="flex items-center gap-2 bg-[#252525] hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Class
        </Link>
      </div>
    </div>
  );
}
