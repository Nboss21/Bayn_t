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

export default function UsersPagination({
  currentPage = 1,
  totalPages = 1,
  totalCount = 0,
  perPage = 5,
  onPageChange,
}) {
  const from = totalCount === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, totalCount);
  const items = renderPageItems(getVisiblePages(currentPage, totalPages));

  return (
    <div className="px-6 py-4 border-t border-[#e5e7eb] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <span className="text-sm text-[#6b7280]">
        Showing {from}-{to} of {totalCount} users
      </span>
      <div className="flex items-center gap-1">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          className="px-3 py-1.5 border border-[#e5e7eb] text-[#9ca3af] text-sm font-medium rounded-lg bg-white cursor-not-allowed disabled:cursor-not-allowed hover:enabled:bg-[#f3f4f6]"
        >
          Previous
        </button>
        <div className="flex items-center">
          {items.map((item, index) =>
            item === '...' ? (
              <span key={`ellipsis-${index}`} className="w-8 h-8 flex items-center justify-center text-sm text-[#9ca3af]">
                ...
              </span>
            ) : (
              <button
                key={item}
                onClick={() => onPageChange && onPageChange(item)}
                className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg cursor-pointer transition-colors ${
                  item === currentPage
                    ? 'bg-[#111827] text-white'
                    : 'text-[#4b5563] hover:bg-[#f3f4f6]'
                }`}
              >
                {item}
              </button>
            ),
          )}
        </div>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          className="px-3 py-1.5 border border-[#e5e7eb] text-[#374151] text-sm font-medium rounded-lg bg-white hover:bg-[#f3f4f6] cursor-pointer disabled:text-[#9ca3af] disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}