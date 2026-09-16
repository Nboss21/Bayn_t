import React from 'react';

export default function EnrollmentHistoryHeader() {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        {/* Title */}
        <h1 className="text-[28px] font-bold text-[#111827] leading-tight">
          Enrollment History
        </h1>
        {/* Subtitle */}
        <p className="text-[14px] text-[#6b7280] mt-1">
          View student enrollment records and status changes.
        </p>
      </div>
      {/* Right side note */}
      <p className="text-[12px] text-[#9ca3af] text-right max-w-[220px] mt-1 leading-snug italic">
        A workspace in comfortable information density and strong readability
      </p>
    </div>
  );
}
