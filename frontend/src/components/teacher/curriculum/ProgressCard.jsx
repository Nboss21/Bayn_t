import React from 'react';

const ProgressCard = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[14px] font-semibold text-[#1A1A1A]">Curriculum Progress</h3>
          <span className="text-[13px] font-medium text-gray-600">37.5% Courseway</span>
        </div>

        <div className="flex items-end justify-between mb-4">
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-bold text-[#1A1A1A]">2</span>
            <span className="text-[13px] text-gray-500">of 8 modules completed</span>
          </div>
          <span className="text-[12px] font-medium text-gray-700">Active: Module 03</span>
        </div>

        <div className="flex gap-1 h-2 mb-4">
          <div className="bg-[#5B7546] h-full flex-1 rounded-l-sm"></div>
          <div className="bg-[#5B7546] h-full flex-1"></div>
          <div className="bg-[#CFDEC0] h-full flex-1"></div>
          <div className="bg-[#F0F0F0] h-full flex-1"></div>
          <div className="bg-[#F0F0F0] h-full flex-1"></div>
          <div className="bg-[#F0F0F0] h-full flex-1"></div>
          <div className="bg-[#F0F0F0] h-full flex-1"></div>
          <div className="bg-[#F0F0F0] h-full flex-1 rounded-r-sm"></div>
        </div>

        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#5B7546] rounded-sm"></div>
            <span className="text-[11px] text-gray-500">Completed (2)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#CFDEC0] rounded-sm"></div>
            <span className="text-[11px] text-gray-500">Current (1)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#F0F0F0] rounded-sm"></div>
            <span className="text-[11px] text-gray-500">Remaining (5)</span>
          </div>
        </div>
      </div>

      <div className="bg-[#F8F9F7] rounded-lg px-4 py-3 flex items-center justify-between border border-[#F0F0F0]">
        <span className="text-[12px] text-gray-500">Class Term Timeline</span>
        <span className="text-[12px] font-semibold text-[#1A1A1A]">Week 6 of 16</span>
      </div>
    </div>
  );
};

export default ProgressCard;

