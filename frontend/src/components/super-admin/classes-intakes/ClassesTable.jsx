import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const classesData = [
  {
    id: 1,
    name: 'PMA Morning',
    type: 'Morning Cohort',
    program: 'Professional Makeup Artistry',
    intake: 'September 2026',
    schedule: 'Mon-Fri · 9:00 AM-1:00 PM',
    capacity: 18,
    maxCapacity: 20,
    percentage: 90,
    status: 'Active',
    barColor: 'bg-[#1f5f40]'
  },
  {
    id: 2,
    name: 'PMA Afternoon',
    type: 'Afternoon Cohort',
    program: 'Professional Makeup Artistry',
    intake: 'September 2026',
    schedule: 'Mon-Fri · 2:00 PM-6:00 PM',
    capacity: 14,
    maxCapacity: 20,
    percentage: 70,
    status: 'Active',
    barColor: 'bg-[#1f5f40]'
  },
  {
    id: 3,
    name: 'Bridal Evening',
    type: 'Evening Cohort',
    program: 'Bridal Makeup Mastery',
    intake: 'October 2026',
    schedule: 'Mon-Wed · 5:00 PM-8:00 PM',
    capacity: 10,
    maxCapacity: 15,
    percentage: 67,
    status: 'Upcoming',
    barColor: 'bg-[#8c6b2a]'
  },
  {
    id: 4,
    name: 'Beauty Foundations AM',
    type: 'Morning Cohort',
    program: 'Beauty Foundations',
    intake: 'November 2026',
    schedule: 'Mon-Fri · 9:00 AM-12:00 PM',
    capacity: 0,
    maxCapacity: 18,
    percentage: 0,
    status: 'Upcoming',
    barColor: 'bg-[#e5e7eb]'
  },
  {
    id: 5,
    name: 'Advanced Techniques',
    type: 'Day Cohort',
    program: 'Advanced Beauty Techniques',
    intake: 'September 2026',
    schedule: 'Tue-Thu · 10:00 AM-2:00 PM',
    capacity: 20,
    maxCapacity: 20,
    percentage: 100,
    status: 'Full',
    barColor: 'bg-[#8c6b2a]'
  }
];

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

export default function ClassesTable() {
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
            {classesData.map((cls) => (
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
                    {cls.schedule.split('·')[0]} ·<br/>
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
                  <button className="bg-white border border-[#d1d5db] text-[#374151] hover:bg-gray-50 px-4 py-1.5 rounded-lg text-[13px] font-medium transition-colors shadow-sm cursor-pointer">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-[#e5e7eb] flex items-center justify-between">
        <div className="text-[13px] text-[#6b7280] font-medium">
          Showing 1-5 of 8 classes
        </div>
        <div className="flex items-center gap-1">
          <button className="px-3 py-1.5 border border-[#e5e7eb] rounded-lg text-[13px] font-medium text-[#9ca3af] bg-white cursor-not-allowed">
            Previous
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#252525] text-white text-[13px] font-medium cursor-pointer">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-[#e5e7eb] text-[#374151] hover:bg-gray-50 text-[13px] font-medium transition-colors cursor-pointer">
            2
          </button>
          <button className="px-3 py-1.5 border border-[#e5e7eb] rounded-lg text-[13px] font-medium text-[#374151] bg-white hover:bg-gray-50 transition-colors cursor-pointer">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
