import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function RoleAccessSection() {
  return (
    <div className="mb-8 border-t border-[#e5e7eb] pt-8">
      <h2 className="text-[17px] font-semibold text-[#111827]">Role & access</h2>
      <p className="text-[14px] text-[#6b7280] mt-0.5 mb-6">Choose the staff role that matches their operational responsibilities.</p>
      
      <div>
        <label className="block text-sm font-medium text-[#111827] mb-1.5">
          Role <span className="text-[#dc2626]">*</span>
        </label>
        <div className="relative">
          <select className="w-full px-3 py-2.5 border border-[#d1d5db] rounded-lg text-sm text-[#4b5563] appearance-none focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5] bg-white cursor-pointer">
            <option value="">Select a role...</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown className="h-5 w-5 text-[#6b7280]" />
          </div>
        </div>
      </div>
    </div>
  );
}
