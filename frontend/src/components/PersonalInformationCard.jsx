import React from 'react';
import { Pencil, User } from 'lucide-react';

export default function PersonalInformationCard() {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-[#111827]">Personal Information</h2>
        <button className="flex items-center text-sm font-medium text-[#4b5563] hover:text-[#111827]">
          <Pencil className="w-4 h-4 mr-2" />
          Edit
        </button>
      </div>
      <div className="border-t border-[#e5e7eb] pt-6 flex items-start gap-6">
        <div className="w-24 h-24 rounded-full bg-[#d5e0d5] flex items-center justify-center shrink-0">
          <User className="w-10 h-10 text-[#6b7280]" />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold text-[#111827]">Sandra Alemu</h3>
          <div className="flex items-center gap-2 text-sm text-[#4b5563]">
            <span className="w-12 text-[#6b7280]">Email:</span>
            <span>sandra@example.com</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#4b5563]">
            <span className="w-12 text-[#6b7280]">Phone:</span>
            <span>+251 9XX XXX XXX</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#4b5563]">
            <span className="w-12 text-[#6b7280]">Role:</span>
            <span>Registrar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
