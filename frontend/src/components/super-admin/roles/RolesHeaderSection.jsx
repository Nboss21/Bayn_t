import React from 'react';
import { ShieldCheck, Save } from 'lucide-react';

export default function RolesHeaderSection() {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-[28px] font-bold text-[#111827] leading-none">Roles & Permissions</h1>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ecfdf5] border border-[#a7f3d0] text-[11px] font-semibold text-[#059669]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#059669]"></div>
            Access Matrix Active
          </span>
        </div>
        <p className="text-[14px] text-[#6b7280] mt-2">
          Control what each staff role can access and manage across HOB.
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-wider">
            Role Governance
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <ShieldCheck className="w-4 h-4 text-[#059669]" />
            <span className="text-sm font-semibold text-[#111827]">3 system roles</span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#111827] text-white rounded-lg text-sm font-medium transition-colors shadow-sm cursor-pointer">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
