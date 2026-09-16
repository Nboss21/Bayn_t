import React from 'react';
import { Clock } from 'lucide-react';

const TeacherMarksClassInfo = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 flex items-center justify-between">
      <div className="flex items-center gap-6 text-[14px] text-gray-600">
        <span className="font-semibold text-[#1A1A1A]">PMA Morning</span>
        <span className="text-gray-400">|</span>
        <span>Professional Makeup Artistry</span>
        <span className="text-gray-400">|</span>
        <span>September 2025 Cohort</span>
        <span className="text-gray-400">|</span>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>Mon-Fri - 9:00 AM-12:00 PM</span>
        </div>
      </div>
      
      <div className="bg-[#ECFDF5] text-[#047857] px-3 py-1 rounded-full text-[13px] font-medium border border-[#D1FAE5]">
        18 enrolled students
      </div>
    </div>
  );
};

export default TeacherMarksClassInfo;

