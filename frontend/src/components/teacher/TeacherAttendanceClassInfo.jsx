import React from 'react';
import { Clock } from 'lucide-react';

const TeacherAttendanceClassInfo = ({ classInfo, totalStudents }) => {
  return (
    <div className="border border-gray-200 rounded-xl px-5 py-3 flex justify-between items-center mb-8">
      <div className="flex items-center text-[13px] text-gray-500">
        <span className="font-semibold text-[#1A1A1A]">{classInfo.name}</span>
        <span className="mx-3 text-gray-300">•</span>
        <span>{classInfo.program}</span>
        <span className="mx-3 text-gray-300">•</span>
        <span>{classInfo.cohort}</span>
        <span className="mx-3 text-gray-300">•</span>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>{classInfo.schedule}</span>
        </div>
      </div>
      
      <div className="bg-[#EEF1EB] text-gray-600 px-3 py-1 rounded-full text-[12px] font-medium">
        {totalStudents} enrolled students
      </div>
    </div>
  );
};

export default TeacherAttendanceClassInfo;