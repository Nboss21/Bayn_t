import React from 'react';
import EnrollmentHistoryTableRow from './EnrollmentHistoryTableRow';

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

export default function EnrollmentHistoryTable({ rows, onView }) {
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
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-[14px] text-[#9ca3af]">
                  No enrollment records found.
                </td>
              </tr>
            ) : (
              rows.map((record) => (
                <EnrollmentHistoryTableRow key={record.id} record={record} onView={onView} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
