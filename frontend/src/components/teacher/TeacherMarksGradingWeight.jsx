import React from 'react';

const TeacherMarksGradingWeight = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 flex items-stretch">
      {/* Left side: Weights */}
      <div className="flex-1 pr-8 border-r border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">
            Grading Weight Distribution (Midterm)
          </h2>
          <div className="bg-[#ECFDF5] text-[#047857] px-2 py-0.5 rounded text-[12px] font-medium border border-[#D1FAE5]">
            Total 100%
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#F9FAFB] border border-gray-100 rounded-lg p-3">
            <div className="text-[12px] text-gray-500 mb-1">Practical</div>
            <div className="flex items-baseline gap-1">
              <span className="text-[18px] font-bold text-[#1A1A1A]">30%</span>
              <span className="text-[12px] text-gray-400">(/30 pts)</span>
            </div>
          </div>
          <div className="bg-[#F9FAFB] border border-gray-100 rounded-lg p-3">
            <div className="text-[12px] text-gray-500 mb-1">Theory</div>
            <div className="flex items-baseline gap-1">
              <span className="text-[18px] font-bold text-[#1A1A1A]">50%</span>
              <span className="text-[12px] text-gray-400">(/50 pts)</span>
            </div>
          </div>
          <div className="bg-[#F9FAFB] border border-gray-100 rounded-lg p-3">
            <div className="text-[12px] text-gray-500 mb-1">Professional</div>
            <div className="flex items-baseline gap-1">
              <span className="text-[18px] font-bold text-[#1A1A1A]">10%</span>
              <span className="text-[12px] text-gray-400">(/10 pts)</span>
            </div>
          </div>
          <div className="bg-[#F9FAFB] border border-gray-100 rounded-lg p-3">
            <div className="text-[12px] text-gray-500 mb-1">Participation</div>
            <div className="flex items-baseline gap-1">
              <span className="text-[18px] font-bold text-[#1A1A1A]">10%</span>
              <span className="text-[12px] text-gray-400">(/10 pts)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Completion */}
      <div className="w-[300px] pl-8 flex flex-col justify-center">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[13px] text-gray-500 font-medium">Marking Completion</span>
          <div className="flex items-center gap-1.5 bg-[#FFF8EE] border border-[#FFDDB8] text-[#D97706] px-2 py-0.5 rounded-full text-[12px] font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></div>
            In progress
          </div>
        </div>
        
        <div className="w-full h-2 bg-gray-100 rounded-full mb-2 overflow-hidden">
          <div className="h-full bg-[#2E5C51] rounded-full" style={{ width: '66.6%' }}></div>
        </div>
        
        <div className="flex items-center justify-between text-[12px]">
          <span className="font-medium text-[#1A1A1A]">12 of 18 students marked</span>
          <span className="text-gray-500">6 remaining</span>
        </div>
      </div>
    </div>
  );
};

export default TeacherMarksGradingWeight;

