import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ProgramsCard() {
  return (
    <div className="bg-[#f9faf6] border border-[#e5e7eb] rounded-xl p-5 flex flex-col">
      {/* Top row: icon + badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-[#eef0e8] flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 4C3 3.44772 3.44772 3 4 3H14C14.5523 3 15 3.44772 15 4V14C15 14.5523 14.5523 15 14 15H4C3.44772 15 3 14.5523 3 14V4Z" stroke="#6b7280" strokeWidth="1.5"/>
            <path d="M6 7H12M6 10H10" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <span className="text-[11px] font-medium text-[#6b7280] bg-[#eef0e8] px-2.5 py-1 rounded-full">
          4 active programs
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-[#111827] mb-1">Programs</h3>

      {/* Description */}
      <p className="text-[13px] text-[#6b7280] leading-relaxed mb-4">
        Update program syllabi, credential descriptions, and tuition details for prospective candidates.
      </p>

      {/* Program item */}
      <div className="flex items-center justify-between bg-white border border-[#e5e7eb] rounded-lg px-3 py-2.5 mb-4">
        <div>
          <p className="text-xs font-semibold text-[#111827] leading-tight">Pro Artistry Diploma</p>
          <p className="text-[11px] text-[#9ca3af]">Full-Time · London Campus</p>
        </div>
        <span className="text-[11px] font-medium text-[#16a34a] bg-[#f0fdf4] px-2 py-0.5 rounded-full">
          Open
        </span>
      </div>

      {/* Footer link */}
      <div className="flex items-center justify-between mt-auto pt-2">
        <span className="text-sm font-medium text-[#111827]">Manage Programs</span>
        <ArrowRight className="w-4 h-4 text-[#111827]" />
      </div>
    </div>
  );
}
