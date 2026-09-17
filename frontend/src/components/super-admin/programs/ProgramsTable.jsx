import React from 'react';
import { Link } from 'react-router-dom';
const programs = [
  {
    id: 1,
    name: 'Professional Makeup Artistry',
    code: 'PMA-100',
    level: 'Intermediate',
    duration: '12 weeks',
    status: 'Open',
    currentIntake: 'Sep 2026',
    lastUpdated: 'Sep 5, 2026',
  },
  {
    id: 2,
    name: 'Bridal Makeup Mastery',
    code: 'BMM-200',
    level: 'Advanced',
    duration: '8 weeks',
    status: 'Open',
    currentIntake: 'Oct 2026',
    lastUpdated: 'Sep 3, 2026',
  },
  {
    id: 3,
    name: 'Beauty Foundations',
    code: 'BF-101',
    level: 'Beginner',
    duration: '6 weeks',
    status: 'Upcoming',
    currentIntake: 'Nov 2026',
    lastUpdated: 'Aug 28, 2026',
  },
  {
    id: 4,
    name: 'Advanced Beauty Techniques',
    code: 'ABT-300',
    level: 'Advanced',
    duration: '10 weeks',
    status: 'Closed',
    currentIntake: '—',
    lastUpdated: 'Aug 20, 2026',
  },
];

const getLevelBadge = (level) => {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#f3f4f6] text-[#4b5563]">
      {level}
    </span>
  );
};

const getStatusBadge = (status) => {
  const styles = {
    Open: 'bg-[#ecfdf5] text-[#059669]',
    Upcoming: 'bg-[#fffbeb] text-[#d97706]',
    Closed: 'bg-[#f3f4f6] text-[#4b5563]',
  };

  const dotColors = {
    Open: 'bg-[#10b981]',
    Upcoming: 'bg-[#f59e0b]',
    Closed: 'bg-[#9ca3af]',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotColors[status]}`}></span>
      {status}
    </span>
  );
};

export default function ProgramsTable() {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#e5e7eb]">
          <thead className="bg-[#f9fafb]">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-[#6b7280] tracking-wider uppercase">
                Program
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-[#6b7280] tracking-wider uppercase">
                Level
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-[#6b7280] tracking-wider uppercase">
                Duration
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-[#6b7280] tracking-wider uppercase">
                Status
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-[#6b7280] tracking-wider uppercase">
                Current Intake
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-[#6b7280] tracking-wider uppercase">
                Last Updated
              </th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-[#6b7280] tracking-wider uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#e5e7eb]">
            {programs.map((program) => (
              <tr key={program.id} className="hover:bg-[#f9fafb] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-[#111827]">{program.name}</div>
                  <div className="text-xs text-[#6b7280] mt-0.5">Code: {program.code}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getLevelBadge(program.level)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-[#4b5563]">{program.duration}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(program.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-[#111827] font-medium">{program.currentIntake}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-[#6b7280]">{program.lastUpdated}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Link
                    to="/super-admin/programs/edit"
                    className="inline-flex items-center px-4 py-1.5 border border-[#e5e7eb] rounded-lg text-sm font-medium text-[#111827] bg-white hover:bg-[#f9fafb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c6dbb6] transition-colors"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-[#e5e7eb] flex items-center justify-between">
        <div className="text-sm text-[#6b7280]">
          Showing 1-4 of 4 programs
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm font-medium text-[#9ca3af] bg-white border border-[#e5e7eb] rounded-lg cursor-not-allowed">
            Previous
          </button>
          <button className="px-3 py-1.5 text-sm font-medium text-white bg-[#27272a] rounded-lg cursor-pointer">
            1
          </button>
          <button className="px-3 py-1.5 text-sm font-medium text-[#9ca3af] bg-white border border-[#e5e7eb] rounded-lg cursor-not-allowed">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
