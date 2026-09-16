import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentStatusBadge from './StudentStatusBadge';

const AVATAR_COLORS = [
  'bg-[#dbeafe] text-[#1d4ed8]',
  'bg-[#fce7f3] text-[#be185d]',
  'bg-[#d1fae5] text-[#065f46]',
  'bg-[#ede9fe] text-[#6d28d9]',
  'bg-[#fef3c7] text-[#92400e]',
  'bg-[#fee2e2] text-[#991b1b]',
  'bg-[#e0f2fe] text-[#075985]',
];

function getAvatarColor(index) {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

export default function StudentsTable({ rows }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#e5e7eb]">
              <th className="px-6 py-3.5 text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider">
                STUDENT
              </th>
              <th className="px-6 py-3.5 text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider">
                STUDENT ID
              </th>
              <th className="px-6 py-3.5 text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider">
                PROGRAM
              </th>
              <th className="px-6 py-3.5 text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider">
                INTAKE
              </th>
              <th className="px-6 py-3.5 text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider">
                CLASS
              </th>
              <th className="px-6 py-3.5 text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider">
                STATUS
              </th>
              <th className="px-6 py-3.5 text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f3f4f6]">
            {rows.map((student, index) => (
              <tr key={student.studentId} className="hover:bg-[#fafafa] transition-colors">
                {/* Student Avatar + Name */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0 ${getAvatarColor(index)}`}
                    >
                      {student.initials}
                    </div>
                    <span className="text-[14px] font-medium text-[#111827]">
                      {student.name}
                    </span>
                  </div>
                </td>

                {/* Student ID */}
                <td className="px-6 py-4">
                  <span className="text-[13px] text-[#6b7280]">{student.studentId}</span>
                </td>

                {/* Program */}
                <td className="px-6 py-4">
                  <span className="text-[14px] text-[#374151]">{student.program}</span>
                </td>

                {/* Intake */}
                <td className="px-6 py-4">
                  <span className="text-[14px] text-[#374151]">{student.intake}</span>
                </td>

                {/* Class */}
                <td className="px-6 py-4">
                  <span className="text-[14px] text-[#374151]">{student.class}</span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <StudentStatusBadge status={student.status} />
                </td>

                {/* Action */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => navigate(`/registrar/students/${student.studentId}`)}
                    className={`px-3 py-1 text-[13px] font-medium rounded-md border transition-colors ${
                      student.highlightAction
                        ? 'bg-white border-[#111827] text-[#111827] font-semibold shadow-sm'
                        : 'bg-white border-[#e5e7eb] text-[#374151] hover:bg-[#f9fafb]'
                    }`}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan="7" className="px-6 py-16 text-center">
                  <p className="text-[15px] font-medium text-[#111827] mb-1">No students found</p>
                  <p className="text-[13px] text-[#6b7280]">Try adjusting your search or filter selection.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}