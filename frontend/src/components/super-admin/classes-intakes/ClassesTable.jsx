import React from 'react';
import { Link } from 'react-router-dom';

export default function ClassesTable({ rows = [], viewPathPrefix = '/super-admin/classes' }) {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#e5e7eb] text-[10px] uppercase tracking-widest text-[#6b7280] font-semibold">
              <th className="px-6 py-4 font-semibold">CLASS</th>
              <th className="px-6 py-4 font-semibold">PROGRAM</th>
              <th className="px-6 py-4 font-semibold">INTAKE</th>
              <th className="px-6 py-4 font-semibold">SCHEDULE</th>
              <th className="px-6 py-4 font-semibold">CAPACITY</th>
              <th className="px-6 py-4 font-semibold">STATUS</th>
              <th className="px-6 py-4 font-semibold text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5e7eb]">
            {rows.map((cls) => (
              <tr key={cls.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-5">
                  <div className="text-[14px] font-semibold text-[#111827]">{cls.name}</div>
                  <div className="text-[13px] text-[#6b7280] mt-0.5">{cls.type}</div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-[13px] font-medium text-[#374151] max-w-[150px] leading-snug">
                    {cls.program}
                  </div>
                </td>
                <td className="px-6 py-5 text-[13px] text-[#4b5563]">
                  {cls.intake}
                </td>
                <td className="px-6 py-5">
                  <div className="text-[13px] text-[#4b5563] max-w-[130px] leading-snug">
                    {cls.schedule.split('·')[0]} ·<br />
                    {cls.schedule.split('·')[1]}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-medium text-[#111827] w-12">
                      {cls.capacity} / {cls.maxCapacity}
                    </span>
                    <div className="w-20 h-1.5 bg-[#f3f4f6] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${cls.barColor}`}
                        style={{ width: `${cls.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-[11px] font-medium text-[#6b7280] w-8">
                      {cls.percentage}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <StatusBadge status={cls.status} />
                </td>
                <td className="px-6 py-5 text-right">
                  <Link
                    to={`${viewPathPrefix}/${cls.id}`}
                    className="inline-flex items-center px-4 py-1.5 border border-[#e5e7eb] rounded-lg text-sm font-medium text-[#111827] bg-white hover:bg-[#f9fafb] transition-colors"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-[14px] text-[#9ca3af]">
                  No classes match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const StatusBadge = ({ status }) => {
  if (status === 'Active') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#ecfdf5] text-[#065f46]">
        <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></div>
        Active
      </span>
    );
  }
  if (status === 'Upcoming') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#fffbeb] text-[#92400e]">
        <div className="w-1.5 h-1.5 rounded-full bg-[#d97706]"></div>
        Upcoming
      </span>
    );
  }
  if (status === 'Full') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#252525] text-white">
        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
        Full
      </span>
    );
  }
  return null;
};