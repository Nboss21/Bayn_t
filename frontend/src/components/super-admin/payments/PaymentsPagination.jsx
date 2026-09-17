import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PaymentsPagination() {
  const pages = [1, 2, 3, 4, 5];
  const currentPage = 1;

  return (
    <div className="flex items-center justify-between pt-4 px-1">
      <span className="text-xs text-[#6b7280]">
        Showing 1–5 of 24 payments
      </span>

      <div className="flex items-center gap-1">
        <button className="px-3 py-1.5 text-xs text-[#9ca3af] hover:text-[#374151] transition-colors rounded-md cursor-pointer">
          Previous
        </button>

        {pages.map((page) => (
          <button
            key={page}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${
              page === currentPage
                ? 'bg-[#c3d3ba] text-[#1f3120] font-semibold'
                : 'text-[#4b5563] hover:bg-[#f3f4f6]'
            }`}
           className="cursor-pointer">
            {page}
          </button>
        ))}

        <button className="px-3 py-1.5 text-xs text-[#374151] hover:text-[#111827] font-medium transition-colors rounded-md cursor-pointer">
          Next
        </button>
      </div>
    </div>
  );
}
