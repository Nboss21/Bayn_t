import React from 'react';

export default function EnrollmentHistoryPagination() {
  return (
    <div className="flex items-center justify-between mt-auto pt-2">
      {/* Left side - record count */}
      <p className="text-[14px] text-[#6b7280]">
        Showing{' '}
        <span className="font-semibold text-[#111827]">1-5</span> of{' '}
        <span className="font-semibold text-[#111827]">184</span> enrollment records
      </p>

      {/* Right side - page controls */}
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button className="px-3 py-1.5 text-[14px] font-medium text-[#9ca3af] cursor-not-allowed rounded-md">
          Previous
        </button>

        {/* Page 1 (active) */}
        <button className="w-8 h-8 flex items-center justify-center bg-[#c6d7b9] text-[#111827] rounded-md text-[14px] font-semibold">
          1
        </button>

        {/* Page 2 */}
        <button className="w-8 h-8 flex items-center justify-center text-[#6b7280] hover:bg-[#f3f4f6] rounded-md text-[14px] font-medium transition-colors">
          2
        </button>

        {/* Page 3 */}
        <button className="w-8 h-8 flex items-center justify-center text-[#6b7280] hover:bg-[#f3f4f6] rounded-md text-[14px] font-medium transition-colors">
          3
        </button>

        {/* Ellipsis */}
        <span className="w-8 h-8 flex items-center justify-center text-[#6b7280] text-[14px]">
          …
        </span>

        {/* Page 37 */}
        <button className="w-8 h-8 flex items-center justify-center text-[#6b7280] hover:bg-[#f3f4f6] rounded-md text-[14px] font-medium transition-colors">
          37
        </button>

        {/* Next */}
        <button className="px-3 py-1.5 text-[14px] font-medium text-[#374151] hover:bg-[#f3f4f6] rounded-md transition-colors">
          Next
        </button>
      </div>
    </div>
  );
}
