import React from 'react';
import { Palette, BookOpen, Calendar, Clock, Users } from 'lucide-react';

const CurriculumBanner = () => {
  return (
    <div className="bg-[#F8F9F7] rounded-xl px-5 py-3.5 mb-8 flex items-center justify-between border border-[#F0F0F0]">
      <div className="flex items-center gap-2">
        <Palette className="w-4 h-4 text-gray-500" />
        <span className="text-[13px] font-semibold text-[#1A1A1A]">PMA Morning</span>
      </div>
      
      <div className="w-1 h-1 rounded-full bg-gray-300"></div>
      
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-medium text-[#1A1A1A]">Professional Makeup Artistry</span>
      </div>
      
      <div className="w-1 h-1 rounded-full bg-gray-300"></div>
      
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-gray-500" />
        <span className="text-[13px] text-gray-600">September 2026</span>
      </div>
      
      <div className="w-1 h-1 rounded-full bg-gray-300"></div>
      
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-gray-500" />
        <span className="text-[13px] text-gray-600">Mon-Fri · 9:00 AM–12:00 PM</span>
      </div>
      
      <div className="w-1 h-1 rounded-full bg-gray-300"></div>
      
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-gray-500" />
        <span className="text-[13px] text-gray-600">18 students enrolled</span>
      </div>
    </div>
  );
};

export default CurriculumBanner;

