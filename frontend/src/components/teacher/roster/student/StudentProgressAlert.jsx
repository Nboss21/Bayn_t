import React from 'react';
import { AlertTriangle } from 'lucide-react';

const StudentProgressAlert = () => {
  return (
    <div className="bg-[#FFFBEA] border border-[#F5D76E] rounded-xl px-5 py-4 flex items-start justify-between mb-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-[#D4A017] mt-0.5 flex-shrink-0" />
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[14px] font-semibold text-[#1A1A1A]">Needs your attention</span>
            <span className="bg-[#FDEFC3] text-[#7A5C00] text-[11px] font-semibold px-2 py-0.5 rounded">
              Academic Alert
            </span>
          </div>
          <p className="text-[13px] text-gray-600">
            Attendance is currently below the expected level, and recent marks are lower than the class average.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-6 flex-shrink-0">
        <button className="bg-[#2F4F3A] hover:bg-[#263F2E] text-white text-[13px] font-medium px-4 py-2 rounded-md transition-colors whitespace-nowrap">
          Review Attendance
        </button>
        <button className="border border-gray-300 hover:bg-white text-[#1A1A1A] text-[13px] font-medium px-4 py-2 rounded-md transition-colors whitespace-nowrap">
          View Marks
        </button>
      </div>
    </div>
  );
};

export default StudentProgressAlert;

