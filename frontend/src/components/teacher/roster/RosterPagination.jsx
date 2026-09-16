import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_SIZE = 10;

const RosterPagination = ({ total, showing, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="flex items-center justify-between mt-4 text-[13px] text-gray-500">
      <p>
        Showing {showing} of {total} students
      </p>
      <div className="flex items-center gap-2">
        <button
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-md text-[13px] transition-colors ${
            currentPage <= 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-[#1A1A1A] hover:bg-gray-50'
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Prev
        </button>
        <span className="text-[13px] text-gray-400 px-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-md text-[13px] transition-colors ${
            currentPage >= totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-[#1A1A1A] hover:bg-gray-50'
          }`}
        >
          Next
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default RosterPagination;