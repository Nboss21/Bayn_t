import React from 'react';
import EnrollmentHistoryTableRow from './EnrollmentHistoryTableRow';

const enrollmentData = [
  {
    student: 'Mekdes Tesfaye',
    studentId: 'HOB-ST-2026-0041',
    program: 'Professional Makeup Artistry',
    intake: 'September 2026',
    class: 'PMA - Morning',
    enrollmentDate: 'September 3, 2026',
    status: 'Enrolled',
  },
  {
    student: 'Hana Bekele',
    studentId: 'HOB-ST-2026-0038',
    program: 'Bridal Makeup Professional',
    intake: 'September 2026',
    class: 'BMP - Afternoon',
    enrollmentDate: 'September 2, 2026',
    status: 'Enrolled',
  },
  {
    student: 'Saron Alemu',
    studentId: 'HOB-ST-2026-0035',
    program: 'Professional Makeup Artistry',
    intake: 'August 2026',
    class: 'PMA - Evening',
    enrollmentDate: 'August 4, 2026',
    status: 'Completed',
  },
  {
    student: 'Liya Tadesse',
    studentId: 'HOB-ST-2026-0029',
    program: 'Beauty & Makeup Fundamentals',
    intake: 'August 2026',
    class: 'BMF - Morning',
    enrollmentDate: 'August 5, 2026',
    status: 'Enrolled',
  },
  {
    student: 'Bethel Girma',
    studentId: 'HOB-ST-2026-0024',
    program: 'Advanced Beauty Techniques',
    intake: 'July 2026',
    class: 'ABT - Weekend',
    enrollmentDate: 'July 28, 2026',
    status: 'Completed',
  },
];

const columns = [
  { label: 'STUDENT' },
  { label: 'STUDENT ID' },
  { label: 'PROGRAM' },
  { label: 'INTAKE' },
  { label: 'CLASS' },
  { label: 'ENROLLMENT DATE' },
  { label: 'STATUS' },
  { label: 'ACTION' },
];

export default function EnrollmentHistoryTable() {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden flex-1 mb-4">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#e5e7eb] bg-[#fafbf7]">
              {columns.map((col) => (
                <th
                  key={col.label}
                  className="px-6 py-3.5 text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {enrollmentData.map((record, index) => (
              <EnrollmentHistoryTableRow key={index} record={record} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
