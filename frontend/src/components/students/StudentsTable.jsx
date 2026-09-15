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

const studentsData = [
  {
    initials: 'MT',
    name: 'Mekdes Tesfaye',
    studentId: 'HOB-ST-2026-0041',
    program: 'Professional Makeup Artistry',
    intake: 'September 2026',
    class: 'PMA - Morning',
    status: 'Active',
  },
  {
    initials: 'HB',
    name: 'Hana Bekele',
    studentId: 'HOB-ST-2026-0038',
    program: 'Bridal Makeup Professional',
    intake: 'September 2026',
    class: 'BMP - Afternoon',
    status: 'Active',
  },
  {
    initials: 'SA',
    name: 'Saron Alemu',
    studentId: 'HOB-ST-2026-0035',
    program: 'Professional Makeup Artistry',
    intake: 'August 2026',
    class: 'PMA - Evening',
    status: 'Active',
  },
  {
    initials: 'LT',
    name: 'Liya Tadesse',
    studentId: 'HOB-ST-2026-0029',
    program: 'Beauty & Makeup Fundamentals',
    intake: 'August 2026',
    class: 'BMF - Morning',
    status: 'Completed',
    highlightAction: true,
  },
  {
    initials: 'BG',
    name: 'Bethel Girma',
    studentId: 'HOB-ST-2026-0024',
    program: 'Advanced Beauty Techniques',
    intake: 'July 2026',
    class: 'ABT - Weekend',
    status: 'Completed',
  },
  {
    initials: 'RW',
    name: 'Rahel Worku',
    studentId: 'HOB-ST-2026-0019',
    program: 'Bridal Makeup Professional',
    intake: 'September 2026',
    class: 'BMP - Afternoon',
    status: 'Pending',
  },
];

function SkeletonRow() {
  return (
    <tr className="border-b border-[#f3f4f6]">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#f3f4f6] animate-pulse" />
          <div className="h-3.5 w-28 bg-[#f3f4f6] rounded animate-pulse" />
        </div>
      </td>
      <td className="px-6 py-4"><div className="h-3.5 w-24 bg-[#f3f4f6] rounded animate-pulse" /></td>
      <td className="px-6 py-4"><div className="h-3.5 w-36 bg-[#f3f4f6] rounded animate-pulse" /></td>
      <td className="px-6 py-4"><div className="h-3.5 w-24 bg-[#f3f4f6] rounded animate-pulse" /></td>
      <td className="px-6 py-4"><div className="h-3.5 w-20 bg-[#f3f4f6] rounded animate-pulse" /></td>
      <td className="px-6 py-4"><div className="h-3.5 w-14 bg-[#f3f4f6] rounded animate-pulse" /></td>
      <td className="px-6 py-4"><div className="h-7 w-12 bg-[#f3f4f6] rounded animate-pulse" /></td>
    </tr>
  );
}

export default function StudentsTable() {
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
            {studentsData.map((student, index) => (
              <tr
                key={student.studentId}
                className="hover:bg-[#fafafa] transition-colors"
              >
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

            {/* Skeleton / loading row at bottom (as seen in design) */}
            <SkeletonRow />
          </tbody>
        </table>
      </div>
    </div>
  );
}
