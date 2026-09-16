import React from 'react';

function getVisiblePages(current, total) {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  let pages = [1, 2, 3];
  if (current > 3 && current < total - 2) pages.push(current);
  if (current >= total - 2) pages.push(total - 1);
  pages.push(total);
  return [...new Set(pages)].sort((a, b) => a - b);
}

function renderPageItems(visiblePages) {
  const items = [];
  let previous = 0;
  for (const page of visiblePages) {
    if (previous && page - previous > 1) items.push('...');
    items.push(page);
    previous = page;
  }
  return items;
}

export default function StudentsPagination({
  currentPage = 1,
  totalPages = 1,
  totalCount = 0,
  perPage = 7,
  onPageChange,
}) {
  const from = totalCount === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, totalCount);
  const items = renderPageItems(getVisiblePages(currentPage, totalPages));

  return (
    <div className="flex items-center justify-between mt-4">
      {/* Info text */}
      <p className="text-[14px] text-[#6b7280]">
        Showing{' '}
        <span className="font-semibold text-[#111827]">
          {from}-{to}
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
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          className="px-3 py-1.5 text-[13px] font-medium text-[#9ca3af] rounded-md disabled:cursor-not-allowed hover:bg-[#f3f4f6] transition-colors"
        >
          Previous
        </button>

        {/* Page numbers */}
        {items.map((item, index) =>
          item === '...' ? (
            <span key={`ellipsis-${index}`} className="w-8 h-8 flex items-center justify-center text-[13px] text-[#9ca3af]">
              ...
            </span>
          ) : (
            <button
              key={item}
              onClick={() => onPageChange && onPageChange(item)}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-[13px] font-medium transition-colors ${
                item === currentPage
                  ? 'bg-[#c6dbb6] text-[#111827] font-semibold'
                  : 'text-[#374151] hover:bg-[#f3f4f6]'
              }`}
            >
              {item}
            </button>
          ),
        )}

        {/* Next */}
        <button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          className="px-3 py-1.5 text-[13px] font-medium text-[#374151] rounded-md hover:bg-[#f3f4f6] transition-colors disabled:text-[#9ca3af] disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}