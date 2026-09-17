import React from 'react';
import { Info } from 'lucide-react';

export default function ReportPreviewCard() {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-bold text-[#111827]">Report preview</h3>
        <span className="inline-flex items-center gap-1.5 bg-[#e9f3e6] border border-[#d6e7d1] text-[#2b612d] text-xs font-semibold px-3 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2b612d]"></span>
          Active Data
        </span>
      </div>
      <p className="text-xs text-[#6b7280] mb-6">
        Attendance across active classes — September 2026
      </p>

      {/* Progress / Stacked Bar */}
      <div className="w-full h-4 rounded-lg overflow-hidden flex gap-0.5 mb-6 bg-[#f3f4f6]">
        <div className="bg-[#236338] h-full rounded-l-md" style={{ width: '88%' }} title="Present: 88%" />
        <div className="bg-[#b91c1c] h-full" style={{ width: '6%' }} title="Absent: 6%" />
        <div className="bg-[#d97706] h-full" style={{ width: '4%' }} title="Late: 4%" />
        <div className="bg-[#38bdf8] h-full rounded-r-md" style={{ width: '2%' }} title="Excused: 2%" />
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {/* Present Card */}
        <div className="bg-[#f9fbf8] border border-[#e6ebdf] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#236338]"></span>
            <span className="font-bold text-sm text-[#111827]">Present</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-[#111827]">88%</span>
            <span className="text-xs text-[#6b7280]">(128 students)</span>
          </div>
          <p className="text-[11px] text-[#6b7280] mt-2 leading-relaxed">
            On-time attendance in scheduled sessions
          </p>
        </div>

        {/* Absent Card */}
        <div className="bg-[#f9fbf8] border border-[#e6ebdf] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#b91c1c]"></span>
            <span className="font-bold text-sm text-[#111827]">Absent</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-[#111827]">6%</span>
            <span className="text-xs text-[#6b7280]">(9 students)</span>
          </div>
          <p className="text-[11px] text-[#6b7280] mt-2 leading-relaxed">
            Unexcused absence
          </p>
        </div>

        {/* Late Card */}
        <div className="bg-[#f9fbf8] border border-[#e6ebdf] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d97706]"></span>
            <span className="font-bold text-sm text-[#111827]">Late</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-[#111827]">4%</span>
            <span className="text-xs text-[#6b7280]">(6 students)</span>
          </div>
          <p className="text-[11px] text-[#6b7280] mt-2 leading-relaxed">
            Arrived &gt;15 mins late
          </p>
        </div>

        {/* Excused Card */}
        <div className="bg-[#f9fbf8] border border-[#e6ebdf] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]"></span>
            <span className="font-bold text-sm text-[#111827]">Excused</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-[#111827]">2%</span>
            <span className="text-xs text-[#6b7280]">(3 students)</span>
          </div>
          <p className="text-[11px] text-[#6b7280] mt-2 leading-relaxed">
            Documented medical or approved absence
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-[#f0f4ec] border border-[#e1e9db] rounded-xl p-3.5 flex items-center gap-2.5 text-xs text-[#4b5563]">
        <div className="w-4 h-4 rounded-full bg-[#4b5563] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
          i
        </div>
        <span>Attendance across active classes. Based on 146 enrolled students across 8 active cohorts.</span>
      </div>
    </div>
  );
}
