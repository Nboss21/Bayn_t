import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentDetailHeader({ student }) {
  const navigate = useNavigate();

  const statusStyles = {
    Active: 'bg-[#d1fae5] text-[#065f46] border-[#a7f3d0]',
    Completed: 'bg-[#f3f4f6] text-[#374151] border-[#e5e7eb]',
    Pending: 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]',
  };

  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-[28px] font-semibold text-[#111827] leading-tight">
            {student.name}
          </h1>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium border ${
              statusStyles[student.status] || statusStyles.Active
            }`}
          >
            {student.status}
          </span>
        </div>
        <p className="text-[14px] text-[#6b7280] mt-1">
          {student.studentId} • {student.program} • {student.intake}
        </p>
      </div>
      <button
        onClick={() => navigate('/registrar/history')}
        className="px-4 py-2 text-[13px] font-medium text-[#374151] bg-white border border-[#d1d5db] rounded-lg hover:bg-[#f9fafb] transition-colors whitespace-nowrap"
      >
        View Enrollment History
      </button>
    </div>
  );
}
