import React from 'react';
import { Camera, ClipboardList, BookOpen, Clock, User } from 'lucide-react';

const RosterClassInfo = () => {
  return (
    <div className="mb-6">
      {/* Breadcrumb label */}
      <p className="text-[11px] uppercase tracking-widest text-gray-400 font-medium mb-2">
        Professional Makeup Artistry
      </p>

      {/* Title row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-[28px] font-semibold text-[#1A1A1A] leading-tight">PMA Morning</h1>
          <span className="bg-[#E5EFE1] text-[#3A6349] text-[12px] font-medium px-3 py-1 rounded-full">
            18 students enrolled
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 mt-1">
          <button className="flex items-center gap-2 bg-[#2F4F3A] hover:bg-[#263F2E] text-white text-[13px] font-medium px-4 py-2 rounded-md transition-colors">
            <Camera className="w-4 h-4" />
            Take Attendance
          </button>
          <button className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-[#1A1A1A] text-[13px] font-medium px-4 py-2 rounded-md transition-colors">
            <ClipboardList className="w-4 h-4" />
            Enter Marks
          </button>
          <button className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-[#1A1A1A] text-[13px] font-medium px-4 py-2 rounded-md transition-colors">
            <BookOpen className="w-4 h-4" />
            Curriculum &amp; Study
          </button>
        </div>
      </div>

      {/* Meta info */}
      <div className="flex items-center gap-6 mt-3 text-[13px] text-gray-500">
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400">📅</span>
          <span>September 7-25 Cohort</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-gray-400" />
          <span>Mon-Fri · 9:00 AM – 12:00 PM</span>
        </div>
        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-gray-400" />
          <span>Teacher: Hana Alemu</span>
        </div>
      </div>
    </div>
  );
};

export default RosterClassInfo;

