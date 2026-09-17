import React from 'react';
import { Clock } from 'lucide-react';

const TeacherMarksClassInfo = ({ classInfo, totalStudents }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 flex items-center justify-between">
      <div className="flex items-center gap-6 text-[14px] text-gray-600">
        <span className="font-semibold text-[#1A1A1A]">{classInfo.name}</span>
        <span className="text-gray-400">|</span>
        <span>{classInfo.program}</span>
        <span className="text-gray-400">|</span>
        <span>{classInfo.cohort}</span>
        <span className="text-gray-400">|</span>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>{classInfo.schedule}</span>
        </div>
      </div>
      
      <div className="bg-[#ECFDF5] text-[#047857] px-3 py-1 rounded-full text-[13px] font-medium border border-[#D1FAE5]">
        {totalStudents} enrolled students
      </div>
    </div>
  );
};

export default TeacherMarksClassInfo;