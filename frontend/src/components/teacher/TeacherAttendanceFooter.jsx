import React from 'react';
import { Check } from 'lucide-react';

const TeacherAttendanceFooter = () => {
  return (
    <div className="fixed bottom-0 left-[240px] right-0 bg-white border-t border-gray-200 py-4 px-8 flex justify-between items-center z-10">
      <div className="flex items-center gap-2 text-[13px]">
        <span className="w-2 h-2 rounded-full bg-[#F79009]"></span>
        <span className="font-semibold text-[#1A1A1A]">3 students remaining to mark</span>
        <span className="text-gray-300 mx-1">•</span>
        <span className="text-gray-500">Unsaved changes pending submission</span>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="px-6 py-2.5 border border-gray-300 rounded-lg text-[14px] font-medium text-[#1A1A1A] hover:bg-gray-50 transition-colors">
          Discard
        </button>
        <button className="px-6 py-2.5 bg-[#345243] hover:bg-[#2B4A3B] text-white rounded-lg text-[14px] font-medium flex items-center gap-2 transition-colors">
          <Check className="w-4 h-4" />
          Save Attendance
        </button>
      </div>
    </div>
  );
};

export default TeacherAttendanceFooter;

