import React from 'react';

const ProgressCard = ({ progress }) => {
  const { completedModules, totalModules, percentDisplay, activeModuleNumber, completedCount, currentCount, remainingCount, completedColor, currentColor, remainingColor, termWeek, termWeeks } = progress;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[14px] font-semibold text-[#1A1A1A]">Curriculum Progress</h3>
          <span className="text-[13px] font-medium text-gray-600">{percentDisplay} Courseway</span>
        </div>

        <div className="flex items-end justify-between mb-4">
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-bold text-[#1A1A1A]">{completedModules}</span>
            <span className="text-[13px] text-gray-500">of {totalModules} modules completed</span>
          </div>
          <span className="text-[12px] font-medium text-gray-700">Active: Module {activeModuleNumber}</span>
        </div>

        <div className="flex gap-1 h-2 mb-4">
          {Array.from({ length: totalModules }).map((_, i) => {
            let color;
            if (i < completedCount) color = completedColor;
            else if (i < completedCount + currentCount) color = currentColor;
            else color = remainingColor;
            const isFirst = i === 0;
            const isLast = i === totalModules - 1;
            return (
              <div
                key={i}
                className={`h-full flex-1 ${color} ${isFirst ? 'rounded-l-sm' : ''} ${isLast ? 'rounded-r-sm' : ''}`}
              />
            );
          })}
        </div>

        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 ${completedColor} rounded-sm`}></div>
            <span className="text-[11px] text-gray-500">Completed ({completedCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 ${currentColor} rounded-sm`}></div>
            <span className="text-[11px] text-gray-500">Current ({currentCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 ${remainingColor} rounded-sm`}></div>
            <span className="text-[11px] text-gray-500">Remaining ({remainingCount})</span>
          </div>
        </div>
      </div>

      <div className="bg-[#F8F9F7] rounded-lg px-4 py-3 flex items-center justify-between border border-[#F0F0F0]">
        <span className="text-[12px] text-gray-500">Class Term Timeline</span>
        <span className="text-[12px] font-semibold text-[#1A1A1A]">Week {termWeek} of {termWeeks}</span>
      </div>
    </div>
  );
};

export default ProgressCard;