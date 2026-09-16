import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

const TeacherAttentionBanner = () => {
  return (
    <div className="bg-[#F7F9F5] rounded-[16px] border-l-4 border-l-[#E5B842] p-5 flex items-center justify-between mb-10 shadow-sm relative overflow-hidden">
      <div className="flex items-center gap-5">
        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
          <Calendar className="w-6 h-6 text-gray-600" />
        </div>
        
        <div>
          <p className="text-[#CCA330] text-[11px] font-bold uppercase tracking-widest mb-1">
            TODAY
          </p>
          <h2 className="text-[17px] font-bold text-[#1A1A1A] mb-0.5">
            1 class needs your attention
          </h2>
          <p className="text-[#C19B2D] text-[14px] font-medium">
            Attendance due · PMA Morning attendance needs to be completed today.
          </p>
        </div>
      </div>
      
      <button className="bg-[#242424] hover:bg-[#1A1A1A] text-white text-[14px] font-medium px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2">
        Take Attendance
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TeacherAttentionBanner;

