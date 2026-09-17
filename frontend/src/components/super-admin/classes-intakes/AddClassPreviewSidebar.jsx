import React from 'react';

export default function AddClassPreviewSidebar() {
  return (
    <div className="bg-white rounded-lg border border-[#e5e7eb] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] sticky top-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[#6b7280] font-semibold text-[12px] uppercase tracking-wider">
          LIVE TIMETABLE PREVIEW
        </h2>
        <span className="bg-[#f0f9f4] text-[#168a4a] border border-[#a2deb7] text-[11px] font-medium px-2 py-0.5 rounded-sm flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#168a4a]"></span>
          Validated
        </span>
      </div>

      <div className="mb-6">
        <h3 className="text-[#1a1a1a] text-[17px] font-semibold mb-1">
          Mastering Editorial & Runway Beauty
        </h3>
        <p className="text-[#6b7280] text-[13px]">
          Diploma in Professional Makeup Artistry (Level 4)
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-start border-b border-[#f3f4f6] pb-3">
          <span className="text-[#6b7280] text-[13px]">Assigned Educator</span>
          <span className="text-[#1a1a1a] text-[13px] font-medium">Charlotte Dupont</span>
        </div>
        <div className="flex justify-between items-start border-b border-[#f3f4f6] pb-3">
          <span className="text-[#6b7280] text-[13px]">Schedule</span>
          <span className="text-[#1a1a1a] text-[13px] font-medium text-right">Mon, Wed, Fri • 09:00 - 13:00</span>
        </div>
        <div className="flex justify-between items-start border-b border-[#f3f4f6] pb-3">
          <span className="text-[#6b7280] text-[13px]">Weekly Commitment</span>
          <span className="text-[#1a1a1a] text-[13px] font-medium">12 Hours / Week</span>
        </div>
        <div className="flex justify-between items-start border-b border-[#f3f4f6] pb-3">
          <span className="text-[#6b7280] text-[13px]">Assigned Studio</span>
          <span className="text-[#1a1a1a] text-[13px] font-medium text-right">Studio 101 (Kensington)</span>
        </div>
        <div className="flex justify-between items-start border-b border-[#f3f4f6] pb-3">
          <span className="text-[#6b7280] text-[13px]">Cohort Duration</span>
          <span className="text-[#1a1a1a] text-[13px] font-medium text-right leading-tight">
            May 12 - Aug 22, 2025 (15<br />Wks)
          </span>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-[#1a1a1a] text-[14px] font-semibold">Studio Capacity Limit</span>
          <span className="text-[#1a1a1a] text-[13px] font-semibold">0 / 20 Enrolled</span>
        </div>
        <div className="w-full bg-[#e5e7eb] h-[5px] rounded-full mb-3">
          <div className="bg-[#aab89b] h-[5px] rounded-full w-[2%]"></div>
        </div>
        <p className="text-[12px] text-[#6b7280] leading-relaxed">
          Maximum cap set according to health, vanity illumination, and sanitization standards.
        </p>
      </div>
    </div>
  );
}
