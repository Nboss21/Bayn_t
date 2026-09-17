import React from 'react';

export default function AuditLogPagination() {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-[#e5e7eb] bg-white rounded-b-xl">
      <div className="text-[13px] text-[#6b7280]">
        Showing <span className="font-semibold text-[#111827]">1-6</span> of <span className="font-semibold text-[#111827]">48</span> records
      </div>
      <div className="flex items-center gap-1">
        <button className="px-3 py-1.5 text-[13px] font-medium text-[#9ca3af] bg-white border border-[#e5e7eb] rounded-md cursor-not-allowed">
          Previous
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-[13px] font-medium text-[#111827] bg-[#c3d3ba] rounded-md cursor-pointer">
          1
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-[13px] font-medium text-[#4b5563] bg-white border border-[#e5e7eb] hover:bg-gray-50 rounded-md cursor-pointer">
          2
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-[13px] font-medium text-[#4b5563] bg-white border border-[#e5e7eb] hover:bg-gray-50 rounded-md cursor-pointer">
          3
        </button>
        <span className="w-8 h-8 flex items-center justify-center text-[13px] text-[#9ca3af]">
          ...
        </span>
        <button className="w-8 h-8 flex items-center justify-center text-[13px] font-medium text-[#4b5563] bg-white border border-[#e5e7eb] hover:bg-gray-50 rounded-md cursor-pointer">
          8
        </button>
        <button className="px-3 py-1.5 text-[13px] font-medium text-[#4b5563] bg-white border border-[#e5e7eb] hover:bg-gray-50 rounded-md cursor-pointer">
          Next
        </button>
      </div>
    </div>
  );
}
