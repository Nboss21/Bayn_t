import React from 'react';

export default function ClassesStatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Active Classes Card */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <h3 className="text-[11px] font-semibold text-[#6b7280] tracking-widest uppercase">Active Classes</h3>
          <div className="w-2 h-2 rounded-full bg-[#10b981]"></div>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-4xl font-semibold text-[#111827]">8</span>
          <span className="text-[13px] text-[#6b7280] font-medium">Currently running</span>
        </div>
      </div>

      {/* Upcoming Intakes Card */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <h3 className="text-[11px] font-semibold text-[#6b7280] tracking-widest uppercase">Upcoming Intakes</h3>
          <div className="w-2 h-2 rounded-full bg-[#d97706]"></div>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-4xl font-semibold text-[#111827]">2</span>
          <span className="text-[13px] text-[#6b7280] font-medium">Scheduled to start</span>
        </div>
      </div>

      {/* Classes at Capacity Card */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <h3 className="text-[11px] font-semibold text-[#6b7280] tracking-widest uppercase">Classes at Capacity</h3>
          <div className="flex items-center gap-1.5 bg-[#fef3c7] text-[#92400e] px-2 py-0.5 rounded-full text-[11px] font-medium border border-[#fde68a]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#d97706]"></div>
            Needs attention
          </div>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-4xl font-semibold text-[#111827]">1</span>
          <span className="text-[13px] text-[#6b7280] font-medium">100% capacity</span>
        </div>
      </div>
    </div>
  );
}
