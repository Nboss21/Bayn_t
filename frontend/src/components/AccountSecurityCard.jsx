import React from 'react';

export default function AccountSecurityCard() {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[#111827] mb-6">Account & Security</h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#6b7280]">Account status:</span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#e6f4ea] text-[#166534] border border-[#bbf7d0]">
            Active
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#6b7280]">Role:</span>
          <span className="text-sm font-medium text-[#111827]">Registrar</span>
        </div>
      </div>
    </div>
  );
}
