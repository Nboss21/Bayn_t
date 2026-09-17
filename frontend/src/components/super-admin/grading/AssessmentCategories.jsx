import React from 'react';
import { Plus, Trash2, Check } from 'lucide-react';

export default function AssessmentCategories() {
  const categories = [
    { id: 1, name: 'Practical', weight: 30, included: true },
    { id: 2, name: 'Theory', weight: 50, included: true },
    { id: 3, name: 'Professional', weight: 10, included: true },
    { id: 4, name: 'Participation', weight: 10, included: true },
  ];

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl p-6 shadow-sm">
      <div className="mb-8">
        <h2 className="text-[17px] font-semibold text-[#111827] mb-1">Assessment categories</h2>
        <p className="text-[13px] text-[#6b7280]">Set the categories used to calculate a student's overall result.</p>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 pb-3 border-b border-[#e5e7eb] mb-6">
        <div className="col-span-5 text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">CATEGORY</div>
        <div className="col-span-3 text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">WEIGHT (%)</div>
        <div className="col-span-2 text-[10px] font-bold text-[#6b7280] uppercase tracking-wider text-center">INCLUDED</div>
        <div className="col-span-2 text-[10px] font-bold text-[#6b7280] uppercase tracking-wider text-right">ACTION</div>
      </div>

      {/* Rows */}
      <div className="space-y-4 mb-6">
        {categories.map((cat) => (
          <div key={cat.id} className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-5">
              <input
                type="text"
                defaultValue={cat.name}
                className="w-full border border-[#d1d5db] rounded-md px-3 py-2 text-sm text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5]"
              />
            </div>
            <div className="col-span-3 relative flex items-center">
              <div className="relative">
                <input
                  type="text"
                  defaultValue={cat.weight}
                  className="w-[72px] border border-[#d1d5db] rounded-md pl-3 pr-6 py-2 text-sm text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5]"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[13px] text-[#9ca3af] pointer-events-none">%</span>
              </div>
            </div>
            <div className="col-span-2 flex justify-center">
              <button className="w-[36px] h-[20px] bg-[#27272a] rounded-full relative transition-colors focus:outline-none cursor-pointer">
                <div className="absolute right-1 top-[2px] w-4 h-4 bg-white rounded-full transition-transform"></div>
              </button>
            </div>
            <div className="col-span-2 flex justify-end">
              <button className="p-2 text-[#9ca3af] hover:text-[#ef4444] transition-colors rounded-md cursor-pointer">
                <Trash2 className="w-[18px] h-[18px]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="flex items-center gap-2 border border-dashed border-[#d1d5db] hover:border-[#9ca3af] hover:bg-gray-50 rounded-md px-3.5 py-1.5 text-[13px] font-medium text-[#4b5563] transition-colors mb-10 cursor-pointer">
        <Plus className="w-4 h-4" />
        Add category
      </button>

      <div className="border-t border-[#e5e7eb] pt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[15px] font-semibold text-[#111827]">Total weight</span>
          <span className="text-[22px] font-bold text-[#111827]">100%</span>
        </div>

        <div className="bg-[#ecfdf5] border border-[#a7f3d0] rounded-md px-4 py-3 flex items-center gap-2.5">
          <Check className="w-[15px] h-[15px] text-[#166534] shrink-0" strokeWidth={3} />
          <span className="text-[13px] font-medium text-[#166534]">
            Total weight is 100% — Configuration is valid and ready to save.
          </span>
        </div>
      </div>
    </div>
  );
}
