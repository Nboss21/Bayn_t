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

export default function ClassesPagination({
  currentPage = 1,
  totalPages = 1,
  totalCount = 0,
  perPage = 5,
  onPageChange,
  label = 'classes',
}) {
  const from = totalCount === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, totalCount);
  const items = renderPageItems(getVisiblePages(currentPage, totalPages));

  return (
    <div className="px-6 py-4 border-t border-[#e5e7eb] flex items-center justify-between">
      <div className="text-sm text-[#6b7280]">
        Showing {from}-{to} of {totalCount} {label}
      </div>
      <div className="flex items-center gap-1">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          className="px-3 py-1.5 text-sm font-medium text-[#9ca3af] bg-white border border-[#e5e7eb] rounded-lg disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {items.map((item, index) =>
          item === '...' ? (
            <span key={`ellipsis-${index}`} className="px-3 py-1.5 text-sm font-medium text-[#9ca3af]">
              ...
            </span>
          ) : (
            <button
              key={item}
              onClick={() => onPageChange && onPageChange(item)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                item === currentPage ? 'text-white bg-[#252525]' : 'text-[#374151] bg-white border border-[#e5e7eb] hover:bg-gray-50'
              }`}
            >
              {item}
            </button>
          ),
        )}
        <button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          className="px-3 py-1.5 text-sm font-medium text-[#374151] bg-white border border-[#e5e7eb] rounded-lg hover:bg-gray-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}