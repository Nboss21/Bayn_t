import React from 'react';
import { Clock } from 'lucide-react';

const futureMonths = (count = 36) => Array.from({ length: count }, (_, index) => {
  const date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() + index);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return { value: `${date.getFullYear()}-${month}`, label: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) };
});

export default function CurrentIntakeCard({ program = null, options = {}, value, onChange }) {
  const months = futureMonths();
  const selectedMonths = value || [];

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-6">
      <h2 className="text-[15px] font-semibold text-[#111827] mb-5">Current intake</h2>

      <div>
        <label className="block text-sm font-medium text-[#111827] mb-1.5">
          Available intake months <span className="text-[#b91c1c]">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto border border-[#e5e7eb] rounded-lg p-3 mb-5">
          {months.map((month) => (
            <label key={month.value} className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-[#374151] hover:bg-[#f9fafb] cursor-pointer">
              <input
                type="checkbox"
                checked={selectedMonths.includes(month.value)}
                onChange={() => onChange(selectedMonths.includes(month.value)
                  ? selectedMonths.filter((selected) => selected !== month.value)
                  : [...selectedMonths, month.value])}
                className="h-4 w-4 accent-[#657b63]"
              />
              {month.label}
            </label>
          ))}
        </div>
        {!selectedMonths.length && <p className="text-xs text-[#b91c1c] mb-4">Select at least one intake month.</p>}

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