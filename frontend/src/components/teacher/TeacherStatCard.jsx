import React from 'react';

const TeacherStatCard = ({ title, icon, value, subtitle, dotColor, badge }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col relative h-[140px]">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">{title}</h3>
        <div className="flex items-center gap-2">
          {badge && (
            <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${
              badge.type === 'pending' 
                ? 'bg-[#F9E4B7] text-[#A57E24]' 
                : 'bg-[#F9E4B7] text-[#A57E24]'
            }`}>
              {badge.icon && <span className="mr-1">{badge.icon}</span>}
              {badge.text}
            </span>
          )}
          {icon && (
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
              {icon}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-auto">
        <div className="text-[40px] font-medium text-[#D4A373] leading-none mb-1">{value}</div>
        <div className="text-[13px] text-gray-500 flex items-center justify-between">
          <span>{subtitle}</span>
          <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
        </div>
      </div>
    </div>
  );
};

export default TeacherStatCard;

