import React from 'react';

const TeacherMarksFooter = ({ remainingCount, hasChanges, onDiscard, onSave }) => {
  if (!hasChanges && remainingCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-[240px] right-0 h-[72px] bg-white border-t border-gray-200 flex items-center justify-between px-8 z-10">
      <div className="flex items-center gap-2 text-[13px] text-gray-600">
        {remainingCount > 0 && (
          <>
            <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></div>
            <span className="font-semibold text-[#1A1A1A]">{remainingCount} students remaining to enter marks</span>
            <span className="text-gray-400">-</span>
          </>
        )}
        <span className={remainingCount > 0 ? '' : 'font-semibold text-[#047857]'}>
          {hasChanges ? 'Unsaved changes pending submission' : 'All marks entered'}
        </span>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={onDiscard}
          className="px-5 py-2 text-[13px] font-semibold text-[#1A1A1A] border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Discard
        </button>
        <button
          onClick={onSave}
          disabled={!hasChanges}
          className={`px-5 py-2 text-[13px] font-semibold rounded-md transition-colors flex items-center gap-2 ${
            hasChanges
              ? 'text-white bg-[#1A1A1A] hover:bg-black'
              : 'text-gray-400 bg-gray-100 cursor-not-allowed'
          }`}
        >
          Save Marks
        </button>
      </div>
    </div>
  );
};

export default TeacherMarksFooter;