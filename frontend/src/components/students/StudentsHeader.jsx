import React from 'react';

export default function StudentsHeader({ totalCount = 184 }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-[28px] font-bold text-[#111827] leading-tight">Students</h1>
        <p className="text-[14px] text-[#6b7280] mt-1">
          Search and manage enrolled students, enrollment details, and class cohorts.
        </p>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span className="w-2 h-2 rounded-full bg-[#22c55e] inline-block"></span>
        <span className="text-[13px] font-medium text-[#374151]">
          {totalCount} enrolled students
        </span>
      </div>
    </div>
  );
}
