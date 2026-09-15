import React from 'react';

export default function StudentsPagination({
  currentPage = 1,
  totalPages = 31,
  totalCount = 184,
  perPage = 7,
}) {
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalCount);

  // Pages to show: 1, 2, 3, ..., 31
  const visiblePages = [1, 2, 3];
  const showEllipsis = totalPages > 4;

  return (
    <div className="flex items-center justify-between mt-4">
      {/* Info text */}
      <p className="text-[14px] text-[#6b7280]">
        Showing{' '}
        <span className="font-semibold text-[#111827]">
          {startItem}-{endItem}
        </span>{' '}
        of{' '}
        <span className="font-semibold text-[#111827]">{totalCount}</span>{' '}
        enrolled students
      </p>

      {/* Page controls */}
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          disabled={currentPage === 1}
          className="px-3 py-1.5 text-[13px] font-medium text-[#9ca3af] rounded-md disabled:cursor-not-allowed hover:bg-[#f3f4f6] transition-colors"
        >
          Previous
        </button>

        {/* Page numbers */}
        {visiblePages.map((page) => (
          <button
            key={page}
            className={`w-8 h-8 flex items-center justify-center rounded-md text-[13px] font-medium transition-colors ${
              page === currentPage
                ? 'bg-[#c6dbb6] text-[#111827] font-semibold'
                : 'text-[#374151] hover:bg-[#f3f4f6]'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Ellipsis */}
        {showEllipsis && (
          <span className="w-8 h-8 flex items-center justify-center text-[13px] text-[#9ca3af]">
            ...
          </span>
        )}

        {/* Last page */}
        <button className="w-8 h-8 flex items-center justify-center rounded-md text-[13px] font-medium text-[#374151] hover:bg-[#f3f4f6] transition-colors">
          {totalPages}
        </button>

        {/* Next */}
        <button className="px-3 py-1.5 text-[13px] font-medium text-[#374151] rounded-md hover:bg-[#f3f4f6] transition-colors">
          Next
        </button>
      </div>
    </div>
  );
}
