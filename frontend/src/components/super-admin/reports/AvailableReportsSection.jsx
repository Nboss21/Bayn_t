import React from 'react';

const reports = [
  {
    id: 'student-overview',
    title: 'Student Overview',
    description: 'Current student enrollment and program information',
    lastGenerated: 'Sep 7, 2026',
    isActive: false,
  },
  {
    id: 'attendance',
    title: 'Attendance',
    description: 'Attendance across active classes',
    lastGenerated: 'Sep 7, 2026',
    isActive: true,
    hasActiveDot: true,
  },
  {
    id: 'academic-performance',
    title: 'Academic Performance',
    description: 'Assessment and overall performance summary',
    lastGenerated: 'Sep 6, 2026',
    isActive: false,
  },
  {
    id: 'enrollment',
    title: 'Enrollment',
    description: 'Enrollment activity by program and intake',
    lastGenerated: 'Sep 5, 2026',
    isActive: false,
  },
  {
    id: 'payments',
    title: 'Payments',
    description: 'Payment status and outstanding items',
    lastGenerated: 'Sep 5, 2026',
    isActive: false,
  },
];

export default function AvailableReportsSection() {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-[#111827] mb-4">Available reports</h3>

      <div className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-[#fafaf9]">
                <th className="py-3.5 px-6 text-[10px] font-bold text-[#6b7280] uppercase tracking-wider w-[240px]">
                  REPORT
                </th>
                <th className="py-3.5 px-6 text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">
                  DESCRIPTION
                </th>
                <th className="py-3.5 px-6 text-[10px] font-bold text-[#6b7280] uppercase tracking-wider w-[160px]">
                  LAST GENERATED
                </th>
                <th className="py-3.5 px-6 text-[10px] font-bold text-[#6b7280] uppercase tracking-wider text-right w-[120px]">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-[#fcfdfa] transition-colors">
                  <td className="py-4 px-6 text-sm font-bold text-[#111827]">
                    <div className="flex items-center gap-2">
                      <span>{report.title}</span>
                      {report.hasActiveDot && (
                        <span className="w-2 h-2 rounded-full bg-[#236338] inline-block" />
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-xs text-[#6b7280]">
                    {report.description}
                  </td>
                  <td className="py-4 px-6 text-xs text-[#6b7280] whitespace-nowrap">
                    {report.lastGenerated}
                  </td>
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    {report.isActive ? (
                      <button className="bg-[#1c1d1f] hover:bg-[#000000] text-white text-xs font-medium px-4 py-1.5 rounded-lg transition-colors cursor-pointer">
                        View
                      </button>
                    ) : (
                      <button className="bg-white hover:bg-[#f9fafb] border border-[#e5e7eb] text-[#111827] text-xs font-medium px-4 py-1.5 rounded-lg transition-colors cursor-pointer">
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
