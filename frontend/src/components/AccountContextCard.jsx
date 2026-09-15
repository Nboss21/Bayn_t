import React from 'react';

export default function AccountContextCard() {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[#111827] mb-6">Account Context</h2>
      
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center py-2 border-b border-[#e5e7eb]">
          <span className="text-sm text-[#4b5563]">Status</span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#e6f4ea] text-[#166534] border border-[#bbf7d0]">
            Active
          </span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-[#4b5563]">Assigned Role</span>
          <span className="text-sm font-semibold text-[#111827]">Registrar</span>
        </div>
      </div>
      
      <p className="text-sm text-[#9ca3af] leading-relaxed">
        Your role is managed by an administrator. Contact system administration to request permission updates.
      </p>
    </div>
  );
}
