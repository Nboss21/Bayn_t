import React from 'react';
import { AlertTriangle } from 'lucide-react';

const RosterAttendanceBanner = () => {
  return (
    <div className="flex items-center justify-between bg-[#FFFBEA] border border-[#F5D76E] rounded-xl px-5 py-3.5 mb-6">
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-4 h-4 text-[#D4A017] flex-shrink-0" />
        <span className="bg-[#F5D76E] text-[#7A5C00] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
          Today · Attendance Due
        </span>
        <p className="text-[13px] text-[#5C4600]">
          PMA Morning attendance needs to be completed today for Monday, September 7, 2026.
        </p>
      </div>
      <button className="bg-[#2F4F3A] hover:bg-[#263F2E] text-white text-[13px] font-medium px-4 py-2 rounded-md transition-colors whitespace-nowrap ml-4">
        Take Attendance →
      </button>
    </div>
  );
};

export default RosterAttendanceBanner;

