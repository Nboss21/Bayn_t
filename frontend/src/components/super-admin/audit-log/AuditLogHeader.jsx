import React from 'react';
import { FileDown } from 'lucide-react';

export default function AuditLogHeader() {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-[28px] font-bold text-[#111827] tracking-tight mb-1">Audit Log</h1>
        <p className="text-[15px] text-[#6b7280]">
          Review important changes made across the HOB system.
        </p>
      </div>
      <button className="flex items-center gap-2 px-4 py-2.5 bg-[#f4f5f0] text-[#4b5563] text-sm font-medium rounded-lg border border-[#e5e7eb] hover:bg-[#e8ece0] transition-colors cursor-pointer">
        <FileDown className="w-4 h-4" />
        <span>Read-only history</span>
      </button>
    </div>
  );
}
