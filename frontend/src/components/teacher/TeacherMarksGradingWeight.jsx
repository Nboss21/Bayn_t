import React from 'react';

const TeacherMarksGradingWeight = ({ assessmentName, categories, markedCount, totalStudents }) => {
  const remaining = totalStudents - markedCount;
  const percent = totalStudents > 0 ? Math.round((markedCount / totalStudents) * 100) : 0;
  const isComplete = remaining === 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 flex items-stretch">
      {/* Left side: Weights */}
      <div className="flex-1 pr-8 border-r border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">
            Grading Weight Distribution ({assessmentName})
          </h2>
          <div className="bg-[#ECFDF5] text-[#047857] px-2 py-0.5 rounded text-[12px] font-medium border border-[#D1FAE5]">
            Total 100%
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-[#F9FAFB] border border-gray-100 rounded-lg p-3">
              <div className="text-[12px] text-gray-500 mb-1">{cat.label}</div>
              <div className="flex items-baseline gap-1">
                <span className="text-[18px] font-bold text-[#1A1A1A]">{cat.percent}%</span>
                <span className="text-[12px] text-gray-400">(/{cat.points} pts)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side: Completion */}
      <div className="w-[300px] pl-8 flex flex-col justify-center">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[13px] text-gray-500 font-medium">Marking Completion</span>
          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[12px] font-medium border ${
            isComplete
              ? 'bg-[#ECFDF5] border-[#D1FAE5] text-[#047857]'
              : 'bg-[#FFF8EE] border-[#FFDDB8] text-[#D97706]'
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${isComplete ? 'bg-[#12B76A]' : 'bg-[#F59E0B]'}`}></div>
            {isComplete ? 'Complete' : 'In progress'}
          </div>
        </div>
        
        <div className="w-full h-2 bg-gray-100 rounded-full mb-2 overflow-hidden">
          <div className="h-full bg-[#2E5C51] rounded-full" style={{ width: `${percent}%` }}></div>
        </div>
        
        <div className="flex items-center justify-between text-[12px]">
          <span className="font-medium text-[#1A1A1A]">{markedCount} of {totalStudents} students marked</span>
          <span className="text-gray-500">{remaining} remaining</span>
        </div>
      </div>
    </div>
  );
};

export default TeacherMarksGradingWeight;