import React from 'react';
import { Search, Check } from 'lucide-react';

const TeacherAttendanceControls = () => {
  return (
    <div className="flex justify-between items-end mb-6">
      <div className="flex flex-col gap-5 w-full max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by student name or ID..."
            className="w-[300px] pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-gray-300 transition-colors placeholder:text-gray-400"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <button className="border border-gray-300 bg-white text-[#1A1A1A] px-4 py-1.5 rounded-full text-[13px] font-medium">
            All (18)
          </button>
          <button className="text-[#B54708] px-3 py-1.5 text-[13px] font-medium hover:bg-orange-50 rounded-full transition-colors">
            Not marked (3)
          </button>
          <button className="text-gray-500 px-3 py-1.5 text-[13px] font-medium hover:bg-gray-50 rounded-full transition-colors">
            Present (12)
          </button>
          <button className="text-gray-500 px-3 py-1.5 text-[13px] font-medium hover:bg-gray-50 rounded-full transition-colors">
            Absent (2)
          </button>
          <button className="text-gray-500 px-3 py-1.5 text-[13px] font-medium hover:bg-gray-50 rounded-full transition-colors">
            Late (1)
          </button>
        </div>
      </div>
      
      <button className="border border-gray-300 bg-white text-[#1A1A1A] px-5 py-2.5 rounded-lg text-[14px] font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors">
        <Check className="w-4 h-4" />
        Present by Default
      </button>
    </div>
  );
};

export default TeacherAttendanceControls;
