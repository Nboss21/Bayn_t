import React from 'react';

export default function EnrollmentHistoryTableRow({ record }) {
  const statusStyles = {
    Enrolled: 'bg-[#d6e4c8] text-[#3d5a1e]',
    Completed: 'bg-[#f3f4f6] text-[#6b7280]',
  };

  return (
    <tr className="border-b border-[#f3f4f6] hover:bg-[#fafbf7] transition-colors">
      {/* Student Name */}
      <td className="px-6 py-4">
        <span className="text-[14px] text-[#374151] font-medium">{record.student}</span>
      </td>

      {/* Student ID */}
      <td className="px-6 py-4">
        <span className="text-[13px] text-[#6b7280]">{record.studentId}</span>
      </td>

      {/* Program */}
      <td className="px-6 py-4">
        <span className="text-[14px] text-[#374151] max-w-[160px] leading-tight block">
          {record.program}
        </span>
      </td>

      {/* Intake */}
      <td className="px-6 py-4">
        <span className="text-[14px] text-[#374151]">{record.intake}</span>
      </td>

      {/* Class */}
      <td className="px-6 py-4">
        <span className="text-[14px] text-[#374151]">{record.class}</span>
      </td>

      {/* Enrollment Date */}
      <td className="px-6 py-4">
        <span className="text-[14px] text-[#374151]">{record.enrollmentDate}</span>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium ${
            statusStyles[record.status] || statusStyles.Enrolled
          }`}
        >
          {record.status}
        </span>
      </td>

      {/* Action */}
      <td className="px-6 py-4">
        <button className="px-4 py-1.5 border border-[#e5e7eb] rounded-lg text-[13px] font-medium text-[#374151] bg-white hover:bg-[#f9fafb] transition-colors">
          View
        </button>
      </td>
    </tr>
  );
}
