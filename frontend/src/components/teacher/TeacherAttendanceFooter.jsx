import React from 'react';
import { Check } from 'lucide-react';

const TeacherAttendanceFooter = ({ unmarkedCount, hasChanges, onDiscard, onSave }) => {
  if (!hasChanges && unmarkedCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-[240px] right-0 bg-white border-t border-gray-200 py-4 px-8 flex justify-between items-center z-10">
      <div className="flex items-center gap-2 text-[13px]">
        {unmarkedCount > 0 && (
          <>
            <span className="w-2 h-2 rounded-full bg-[#F79009]"></span>
            <span className="font-semibold text-[#1A1A1A]">{unmarkedCount} students remaining to mark</span>
            <span className="text-gray-300 mx-1">•</span>
          </>
        )}
        <span className="text-gray-500">
          {hasChanges ? 'Unsaved changes pending submission' : 'All attendance marked'}
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        <button
          onClick={onDiscard}
          className="px-6 py-2.5 border border-gray-300 rounded-lg text-[14px] font-medium text-[#1A1A1A] hover:bg-gray-50 transition-colors"
        >
          Discard
        </button>
        <button
          onClick={onSave}
          disabled={!hasChanges}
          className={`px-6 py-2.5 rounded-lg text-[14px] font-medium flex items-center gap-2 transition-colors ${
            hasChanges
              ? 'bg-[#345243] hover:bg-[#2B4A3B] text-white'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Check className="w-4 h-4" />
          Save Attendance
        </button>
      </div>
    </div>
  );
};

export default TeacherAttendanceFooter;