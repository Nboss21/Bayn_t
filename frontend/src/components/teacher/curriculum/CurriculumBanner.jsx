import React from 'react';
import { Palette, Calendar, Clock, Users } from 'lucide-react';

const CurriculumBanner = ({ banner }) => {
  return (
    <div className="bg-[#F8F9F7] rounded-xl px-5 py-3.5 mb-8 flex items-center justify-between border border-[#F0F0F0]">
      <div className="flex items-center gap-2">
        <Palette className="w-4 h-4 text-gray-500" />
        <span className="text-[13px] font-semibold text-[#1A1A1A]">{banner.className}</span>
      </div>
      
      <div className="w-1 h-1 rounded-full bg-gray-300"></div>
      
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-medium text-[#1A1A1A]">{banner.program}</span>
      </div>
      
      <div className="w-1 h-1 rounded-full bg-gray-300"></div>
      
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-gray-500" />
        <span className="text-[13px] text-gray-600">{banner.startDate}</span>
      </div>
      
      <div className="w-1 h-1 rounded-full bg-gray-300"></div>
      
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-gray-500" />
        <span className="text-[13px] text-gray-600">{banner.schedule}</span>
      </div>
      
      <div className="w-1 h-1 rounded-full bg-gray-300"></div>
      
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-gray-500" />
        <span className="text-[13px] text-gray-600">{banner.studentsCount} students enrolled</span>
      </div>
    </div>
  );
};

export default CurriculumBanner;