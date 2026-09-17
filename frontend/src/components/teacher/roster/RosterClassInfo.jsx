import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, ClipboardList, BookOpen, Clock, User } from 'lucide-react';

const RosterClassInfo = ({ classInfo }) => {
  return (
    <div className="mb-6">
      <p className="text-[11px] uppercase tracking-widest text-gray-400 font-medium mb-2">
        {classInfo.program}
      </p>

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-[28px] font-semibold text-[#1A1A1A] leading-tight">{classInfo.className}</h1>
          <span className="bg-[#E5EFE1] text-[#3A6349] text-[12px] font-medium px-3 py-1 rounded-full">
            {classInfo.enrolled} students enrolled
          </span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <Link
            to="/teacher/attendance"
            className="flex items-center gap-2 bg-[#2F4F3A] hover:bg-[#263F2E] text-white text-[13px] font-medium px-4 py-2 rounded-md transition-colors"
          >
            <Camera className="w-4 h-4" />
            Take Attendance
          </Link>
          <Link
            to="/teacher/marks"
            className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-[#1A1A1A] text-[13px] font-medium px-4 py-2 rounded-md transition-colors"
          >
            <ClipboardList className="w-4 h-4" />
            Enter Marks
          </Link>
          <Link
            to="/teacher/curriculum"
            className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-[#1A1A1A] text-[13px] font-medium px-4 py-2 rounded-md transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Curriculum & Study
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-3 text-[13px] text-gray-500">
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400">📅</span>
          <span>{classInfo.cohort}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-gray-400" />
          <span>{classInfo.schedule}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-gray-400" />
          <span>Teacher: {classInfo.teacher}</span>
        </div>
      </div>
    </div>
  );
};

export default RosterClassInfo;