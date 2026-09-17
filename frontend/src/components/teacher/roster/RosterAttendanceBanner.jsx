import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const RosterAttendanceBanner = ({ banner }) => {
  return (
    <div className="flex items-center justify-between bg-[#FFFBEA] border border-[#F5D76E] rounded-xl px-5 py-3.5 mb-6">
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-4 h-4 text-[#D4A017] flex-shrink-0" />
        <span className="bg-[#F5D76E] text-[#7A5C00] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
          {banner.label}
        </span>
        <p className="text-[13px] text-[#5C4600]">
          {banner.message}
        </p>
      </div>
      <Link
        to="/teacher/attendance"
        className="bg-[#2F4F3A] hover:bg-[#263F2E] text-white text-[13px] font-medium px-4 py-2 rounded-md transition-colors whitespace-nowrap ml-4"
      >
        Take Attendance →
      </Link>
    </div>
  );
};

export default RosterAttendanceBanner;