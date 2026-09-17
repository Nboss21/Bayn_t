import React from 'react';
import { Clock } from 'lucide-react';

export default function CurrentIntakeCard({ program = null, options = {}, value, onChange }) {
  const intakes = options.intakes || ['September 2026', 'January 2027', 'May 2027'];

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-6">
      <h2 className="text-[15px] font-semibold text-[#111827] mb-5">Current intake</h2>

      <div>
        <label className="block text-sm font-medium text-[#111827] mb-1.5">
          Intake
        </label>
        <div className="relative mb-5">
          <select
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="w-full pl-4 pr-10 py-2.5 border border-[#d1d5db] rounded-lg text-[#111827] appearance-none focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5] sm:text-sm bg-white cursor-pointer"
          >
            {!program && <option value="" disabled>Select intake</option>}
            {intakes.map((intake) => (
              <option key={intake}>{intake}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#6b7280]">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="flex items-start gap-2.5 text-[#6b7280] text-[13px] mt-1">
          <Clock className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Class and student assignment are managed separately.
          </p>
        </div>
      </div>
    </div>
  );
}