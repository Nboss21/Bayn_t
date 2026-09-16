import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const RosterPagination = ({ total, showing }) => {
  return (
    <div className="flex items-center justify-between mt-4 text-[13px] text-gray-500">
      <p>
        Showing {showing} of {total} students
      </p>
      <div className="flex items-center gap-2">
        <button
          disabled
          className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-md text-gray-400 cursor-not-allowed text-[13px]"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Prev
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-md text-[#1A1A1A] hover:bg-gray-50 transition-colors text-[13px]">
          Next
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default RosterPagination;

