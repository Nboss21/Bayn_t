import React from 'react';
import { Info } from 'lucide-react';

const StudentAttendanceCard = ({ attendance }) => {
  const present = 16;
  const absent = 2;
  const excused = 0;
  const total = present + absent + excused;

  const presentPct = (present / total) * 100;
  const absentPct = (absent / total) * 100;
  const excusedPct = (excused / total) * 100;

  const needsAttention = attendance < 92;

  return (
    <div className="bg-white border border-gray-200 rounded-xl px-6 py-6 mb-5">
      {/* Header row */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <h2 className="text-[18px] font-semibold text-[#1A1A1A]">Attendance</h2>
          <p className="text-[13px] text-gray-400 mt-0.5">Current attendance for this student.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[18px] font-bold text-[#1A1A1A]">{attendance}%</span>
          {needsAttention && (
            <span className="flex items-center gap-1.5 text-[12px] font-medium text-[#B45309]">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              Needs attention
            </span>
          )}
        </div>
      </div>

      {/* Segmented bar */}
      <div className="mt-5 mb-2">
        <div className="w-full h-3 rounded-full overflow-hidden flex gap-0.5">
          <div className="bg-[#3A6349] rounded-l-full" style={{ width: `${presentPct}%` }} />
          <div className="bg-[#D94F3D]" style={{ width: `${absentPct}%` }} />
          <div className="bg-[#E8C94E] rounded-r-full" style={{ width: `${excusedPct || 1}%` }} />
        </div>
        <div className="flex justify-between mt-2 text-[11px] text-gray-400">
          <span>{total} Recorded Studio Days</span>
          <span>Term Target: 92%+</span>
        </div>
      </div>

      {/* Stat boxes */}
      <div className="flex gap-3 mt-5 mb-6">
        <div className="flex-1 border border-gray-100 rounded-lg px-4 py-3">
          <p className="text-[12px] text-gray-400 mb-1">Present</p>
          <p className="text-[18px] font-bold text-[#1A1A1A]">
            {present} <span className="text-[13px] font-normal text-gray-400">days</span>
          </p>
        </div>
        <div className="flex-1 border border-gray-100 rounded-lg px-4 py-3">
          <p className="text-[12px] text-gray-400 mb-1">Absent</p>
          <p className="text-[18px] font-bold text-[#1A1A1A]">
            {absent} <span className="text-[13px] font-normal text-gray-400">days</span>
          </p>
        </div>
        <div className="flex-1 border border-gray-100 rounded-lg px-4 py-3">
          <p className="text-[12px] text-gray-400 mb-1">Excused</p>
          <p className="text-[18px] font-bold text-[#1A1A1A]">
            {excused} <span className="text-[13px] font-normal text-gray-400">days</span>
          </p>
        </div>
      </div>

      {/* Warning row */}
      {needsAttention && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-[13px] text-gray-500">
            <Info className="w-3.5 h-3.5 text-gray-400" />
            Attendance is lower than expected for the current period.
          </div>
          <button className="text-[13px] font-medium text-[#2F4F3A] border border-[#C8DBC0] hover:bg-[#F0F7EC] px-3 py-1.5 rounded-md transition-colors whitespace-nowrap">
            Review in Attendance →
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentAttendanceCard;

