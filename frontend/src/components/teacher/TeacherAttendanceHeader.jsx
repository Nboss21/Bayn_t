import React from 'react';
import { Calendar } from 'lucide-react';

const TeacherAttendanceHeader = ({ header, selectedDate, hasChanges }) => {
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-[32px] font-semibold text-[#1A1A1A] mb-2">{header.title}</h1>
        <p className="text-[15px] text-gray-500">{header.subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2 text-[13px]">
          <span className="text-gray-500">Date:</span>
          <Calendar className="w-4 h-4 text-gray-600" />
          <span className="text-[#1A1A1A] font-medium">{selectedDate}</span>
        </div>
        
        {hasChanges && (
          <div className="border border-[#FDE6B5] bg-[#FEF9EA] text-[#B87A13] px-3 py-1.5 rounded-full text-[12px] font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5991A]"></span>
            Unsaved changes
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherAttendanceHeader;