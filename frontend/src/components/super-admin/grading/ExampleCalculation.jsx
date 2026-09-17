import React from 'react';

export default function ExampleCalculation() {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl p-6 shadow-sm">
      <h2 className="text-[17px] font-semibold text-[#111827] mb-1">Example calculation</h2>
      <p className="text-[13px] text-[#6b7280] mb-6">Visual illustration of how weights apply to sample student marks (Not live data).</p>

      <div className="space-y-4 mb-8">
        {/* Practical */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-[13px] font-medium text-[#111827]">Practical</span>
            <span className="text-[13px] text-[#111827]">
              24 / 30 <span className="text-[#6b7280] font-normal">(80%)</span>
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#e5e7eb] rounded-full overflow-hidden">
            <div className="h-full bg-[#c1d0b5] w-[80%] rounded-full"></div>
          </div>
        </div>

        {/* Theory */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-[13px] font-medium text-[#111827]">Theory</span>
            <span className="text-[13px] text-[#111827]">
              42 / 50 <span className="text-[#6b7280] font-normal">(84%)</span>
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#e5e7eb] rounded-full overflow-hidden">
            <div className="h-full bg-[#c1d0b5] w-[84%] rounded-full"></div>
          </div>
        </div>

        {/* Professional */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-[13px] font-medium text-[#111827]">Professional</span>
            <span className="text-[13px] text-[#111827]">
              8 / 10 <span className="text-[#6b7280] font-normal">(80%)</span>
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#e5e7eb] rounded-full overflow-hidden">
            <div className="h-full bg-[#c1d0b5] w-[80%] rounded-full"></div>
          </div>
        </div>

        {/* Participation */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-[13px] font-medium text-[#111827]">Participation</span>
            <span className="text-[13px] text-[#111827]">
              9 / 10 <span className="text-[#6b7280] font-normal">(90%)</span>
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#e5e7eb] rounded-full overflow-hidden">
            <div className="h-full bg-[#c1d0b5] w-[90%] rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-[#e5e7eb]">
        <p className="text-[10px] uppercase font-bold text-[#6b7280] tracking-wider mb-2">OVERALL RESULT</p>
        <div className="flex justify-between items-center">
          <div className="text-[22px] font-bold text-[#111827]">
            83 / 100 <span className="text-[15px] text-[#6b7280] font-normal ml-1">(83%)</span>
          </div>
          <div className="bg-[#ecfdf5] text-[#166534] px-3 py-1 rounded-full text-[11px] font-semibold border border-[#d1fae5]">
            Passing Grade
          </div>
        </div>
      </div>
    </div>
  );
}
