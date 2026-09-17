import React from 'react';
import { Info } from 'lucide-react';

export default function CurrentGradingSetup() {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl p-6 shadow-sm">
      <h2 className="text-[17px] font-semibold text-[#111827] mb-6">Current grading setup</h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-[13px] text-[#6b7280]">Program</span>
          <span className="text-[13px] font-medium text-[#111827]">Professional Makeup Artistry</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[13px] text-[#6b7280]">Assessment</span>
          <span className="text-[13px] font-medium text-[#111827]">Midterm Assessment</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[13px] text-[#6b7280]">Grading method</span>
          <span className="text-[13px] font-medium text-[#111827]">Weighted categories</span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-[13px] text-[#6b7280]">Target total</span>
          <span className="text-[13px] font-bold text-[#111827]">100%</span>
        </div>
      </div>

      <div className="mt-6 bg-[#f4f5f0] rounded-lg p-4 flex gap-3">
        <Info className="w-4 h-4 text-[#6b7280] shrink-0 mt-0.5" fill="#6b7280" color="#f4f5f0" />
        <p className="text-[13px] text-[#4b5563] leading-[1.6]">
          Teachers enter marks using these categories. The configured weights determine the contribution of each category to the overall result.
        </p>
      </div>
    </div>
  );
}
