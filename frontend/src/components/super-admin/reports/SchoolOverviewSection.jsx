import React from 'react';
import { Users, Building2, RotateCw, BookOpen } from 'lucide-react';

const stats = [
  {
    title: 'Active students',
    value: '146',
    subtitle: 'Currently enrolled',
    icon: Users,
  },
  {
    title: 'Active classes',
    value: '8',
    subtitle: 'Running classes',
    icon: Building2,
  },
  {
    title: 'Attendance',
    value: '88%',
    subtitle: 'Current average',
    icon: RotateCw,
  },
  {
    title: 'Programs',
    value: '4',
    subtitle: 'Active programs',
    icon: BookOpen,
  },
];

export default function SchoolOverviewSection() {
  return (
    <div className="mb-6">
      <h2 className="text-[10px] font-bold text-[#6b7280] uppercase tracking-widest mb-3">
        SCHOOL OVERVIEW
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white border border-[#e5e7eb] rounded-2xl p-5 flex items-start justify-between shadow-sm"
            >
              <div>
                <span className="text-xs font-medium text-[#6b7280]">{stat.title}</span>
                <p className="text-2xl font-bold text-[#111827] mt-1">{stat.value}</p>
                <p className="text-xs text-[#9ca3af] mt-1">{stat.subtitle}</p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-[#f2f5ee] border border-[#e4ebd9] flex items-center justify-center text-[#2d3a2b] shrink-0">
                <Icon className="w-5 h-5 stroke-[1.75]" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
