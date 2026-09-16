import React from 'react';

const TeacherMarksFooter = () => {
  return (
    <div className="fixed bottom-0 left-[240px] right-0 h-[72px] bg-white border-t border-gray-200 flex items-center justify-between px-8 z-10">
      <div className="flex items-center gap-2 text-[13px] text-gray-600">
        <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></div>
        <span className="font-semibold text-[#1A1A1A]">6 students remaining to enter marks</span>
        <span className="text-gray-400">-</span>
        <span>Unsaved changes pending submission</span>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="px-5 py-2 text-[13px] font-semibold text-[#1A1A1A] border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
          Discard
        </button>
        <button className="px-5 py-2 text-[13px] font-semibold text-white bg-[#1A1A1A] rounded-md hover:bg-black transition-colors flex items-center gap-2">
          Save Marks
        </button>
      </div>
    </div>
  );
};

export default TeacherMarksFooter;

