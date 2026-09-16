import React from 'react';
import { Calendar, Clock, Users, ArrowRight } from 'lucide-react';

const TeacherClassCard = ({ 
  program, 
  title, 
  date, 
  time, 
  studentsCount, 
  totalStudents, 
  status, 
  seatsAvailable,
  isFull
}) => {
  const isAttendanceDue = status === 'Attendance due';
  
  return (
    <div className="bg-white rounded-[16px] border border-gray-200 p-6 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
      {/* Top row */}
      <div className="flex justify-between items-start mb-5">
        <div className="bg-[#F4F5F4] p-2.5 rounded-xl">
          <Users className="w-5 h-5 text-gray-500" />
        </div>
        
        {isAttendanceDue ? (
          <div className="bg-[#FEF5D9] text-[#A77611] px-3 py-1.5 rounded-full text-[12px] font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8A51C]"></span>
            Attendance due
          </div>
        ) : (
          <div className="bg-[#EAF4EC] text-[#2F6B43] px-3 py-1.5 rounded-full text-[12px] font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3D8C57]"></span>
            Up to date
          </div>
        )}
      </div>
      
      {/* Titles */}
      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">{program}</p>
      <h3 className="text-[22px] font-semibold text-[#1A1A1A]">{title}</h3>
      
      <hr className="my-5 border-gray-100" />
      
      {/* Details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-[14px] text-gray-600">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-3 text-[14px] text-gray-600">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>{time}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[14px]">
            <Users className="w-4 h-4 text-gray-400" />
            <div>
              <span className="font-semibold text-[#1A1A1A]">{studentsCount} / {totalStudents}</span>{' '}
              <span className="text-gray-500 font-medium">students</span>
            </div>
          </div>
          
          {isFull ? (
             <div className="bg-[#F4F5F4] text-gray-500 px-2 py-0.5 rounded text-[11px] font-semibold">
               Full
             </div>
          ) : (
             <div className="bg-[#F4F5F4] text-gray-500 px-2 py-0.5 rounded text-[11px] font-semibold">
               {seatsAvailable} seat{seatsAvailable !== 1 && 's'} available
             </div>
          )}
        </div>
      </div>
      
      {/* Action */}
      <div className="mt-auto pt-2">
        <button className="w-full bg-[#242424] hover:bg-[#1A1A1A] text-white text-[14px] font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
          Open Class
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TeacherClassCard;
