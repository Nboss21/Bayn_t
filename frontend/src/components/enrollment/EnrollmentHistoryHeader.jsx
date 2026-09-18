import React from 'react';
import { Download } from 'lucide-react';

export default function EnrollmentHistoryHeader({ exportUrl }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-[28px] font-bold text-[#111827] leading-tight">
          Enrollment History
        </h1>
        <p className="text-[14px] text-[#6b7280] mt-1">
          View and export student enrollment records and status changes.
        </p>
      </div>
      {exportUrl && (
        <a
          href={exportUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-[#e5e7eb] rounded-lg text-[#4b5563] hover:bg-[#f9fafb] transition-colors"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </a>
      )}
    </div>
  );
}

