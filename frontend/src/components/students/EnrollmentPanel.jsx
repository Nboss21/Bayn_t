import React from 'react';

function PanelRow({ label, value, valueClassName = '' }) {
  return (
    <div className="flex items-start justify-between py-2">
      <span className="text-[13px] text-[#6b7280]">{label}</span>
      <span className={`text-[13px] text-[#111827] font-medium text-right ${valueClassName}`}>
        {value}
      </span>
    </div>
  );
}

export default function EnrollmentPanel({ enrollment }) {
  const statusStyles = {
    Active: 'text-[#065f46] bg-[#d1fae5] border-[#a7f3d0]',
    Completed: 'text-[#374151] bg-[#f3f4f6] border-[#e5e7eb]',
    Pending: 'text-[#92400e] bg-[#fef3c7] border-[#fde68a]',
  };

  return (
    <div className="mb-6">
      <h3 className="text-[15px] font-semibold text-[#111827] mb-3">Enrollment</h3>
      <div className="space-y-0">
        <PanelRow label="Student ID" value={enrollment.studentId} />
        <PanelRow label="Program" value={enrollment.program} />
        <PanelRow label="Intake" value={enrollment.intake} />
        <PanelRow label="Class" value={enrollment.class} />
        <PanelRow label="Enrollment Date" value={enrollment.enrollmentDate} />
        <div className="flex items-start justify-between py-2">
          <span className="text-[13px] text-[#6b7280]">Status</span>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
              statusStyles[enrollment.status] || statusStyles.Active
            }`}
          >
            {enrollment.status}
          </span>
        </div>
      </div>
    </div>
  );
}
