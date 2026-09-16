import React from 'react';

export default function EnrollmentHistoryPagination({ from, to, total, page, pageCount, onPageChange }) {
  const pages = [];
  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || (i >= page - 1 && i <= page + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div className="flex items-center justify-between mt-auto pt-2">
      <p className="text-[14px] text-[#6b7280]">
        Showing{' '}
        <span className="font-semibold text-[#111827]">{from}-{to}</span> of{' '}
        <span className="font-semibold text-[#111827]">{total}</span> enrollment records
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className={`px-3 py-1.5 text-[14px] font-medium rounded-md transition-colors ${
            page <= 1
              ? 'text-[#9ca3af] cursor-not-allowed'
              : 'text-[#374151] hover:bg-[#f3f4f6]'
          }`}
        >
          Previous
        </button>

        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center text-[#6b7280] text-[14px]">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-[14px] transition-colors ${
                p === page
                  ? 'bg-[#c6d7b9] text-[#111827] font-semibold'
                  : 'text-[#6b7280] hover:bg-[#f3f4f6] font-medium'
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pageCount}
          className={`px-3 py-1.5 text-[14px] font-medium rounded-md transition-colors ${
            page >= pageCount
              ? 'text-[#9ca3af] cursor-not-allowed'
              : 'text-[#374151] hover:bg-[#f3f4f6]'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
