import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ReportsFilterCard() {
  const [reportType, setReportType] = useState('Attendance');
  const [program, setProgram] = useState('All Programs');
  const [dateRange, setDateRange] = useState('This month');

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-4 items-end">
        {/* REPORT TYPE */}
        <div>
          <label className="text-[10px] font-bold text-[#6b7280] uppercase tracking-wider mb-1.5 block">
            REPORT TYPE
          </label>
          <div className="relative">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full bg-white border border-[#e5e7eb] rounded-lg px-3.5 py-2.5 pr-9 text-sm text-[#111827] font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] cursor-pointer"
            >
              <option value="Attendance">Attendance</option>
              <option value="Student Overview">Student Overview</option>
              <option value="Academic Performance">Academic Performance</option>
              <option value="Enrollment">Enrollment</option>
              <option value="Payments">Payments</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#6b7280] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* PROGRAM */}
        <div>
          <label className="text-[10px] font-bold text-[#6b7280] uppercase tracking-wider mb-1.5 block">
            PROGRAM
          </label>
          <div className="relative">
            <select
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className="w-full bg-white border border-[#e5e7eb] rounded-lg px-3.5 py-2.5 pr-9 text-sm text-[#111827] font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] cursor-pointer"
            >
              <option value="All Programs">All Programs</option>
              <option value="Makeup Artistry">Makeup Artistry</option>
              <option value="Hair Styling">Hair Styling</option>
              <option value="Aesthetics">Aesthetics</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#6b7280] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* DATE RANGE */}
        <div>
          <label className="text-[10px] font-bold text-[#6b7280] uppercase tracking-wider mb-1.5 block">
            DATE RANGE
          </label>
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-white border border-[#e5e7eb] rounded-lg px-3.5 py-2.5 pr-9 text-sm text-[#111827] font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] cursor-pointer"
            >
              <option value="This month">This month</option>
              <option value="Last month">Last month</option>
              <option value="This term">This term</option>
              <option value="Custom range">Custom range</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#6b7280] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Apply filters button */}
        <div>
          <button className="w-full md:w-auto bg-[#e6ebdf] hover:bg-[#dbe2d2] text-[#2d3a2b] font-medium text-sm px-5 py-2.5 rounded-lg border border-[#d5decb] transition-colors cursor-pointer">
            Apply filters
          </button>
        </div>
      </div>
    </div>
  );
}
