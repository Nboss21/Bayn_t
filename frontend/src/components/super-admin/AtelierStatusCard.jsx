import React from 'react';

export default function AtelierStatusCard() {
  return (
    <div className="bg-[#f8f9f5] rounded-xl p-6 flex items-center justify-between border border-[#e5e7eb]">
      <h3 className="text-[11px] font-bold text-[#6b7280] tracking-widest uppercase w-1/3">
        Current Atelier Status
      </h3>
      
      <div className="flex w-2/3">
        <div className="flex-1 border-r border-[#e5e7eb] px-4 text-center">
          <div className="text-xl font-bold text-[#111827]">146</div>
          <div className="text-[10px] text-[#6b7280] font-medium mt-1">Active students</div>
        </div>
        <div className="flex-1 px-4 text-center">
          <div className="text-xl font-bold text-[#111827]">8</div>
          <div className="text-[10px] text-[#6b7280] font-medium mt-1">Active classes</div>
        </div>
      </div>
    </div>
  );
}
