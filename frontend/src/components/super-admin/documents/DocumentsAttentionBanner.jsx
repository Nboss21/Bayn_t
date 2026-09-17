import React from 'react';
import { AlertTriangle, ChevronRight } from 'lucide-react';

const DocumentsAttentionBanner = () => {
  return (
    <div className="bg-[#FFF9F2] border border-[#F6E1CC] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div className="flex gap-3 items-start sm:items-center">
        <div className="p-2 bg-[#FDF0E6] rounded-lg text-[#B4702C] shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-[13px] font-bold text-[#B4702C] tracking-wide">NEEDS ATTENTION</h3>
            <span className="text-[11px] font-semibold bg-[#F6E1CC] text-[#B4702C] px-2 py-0.5 rounded-full">
              1 action item
            </span>
          </div>
          <p className="text-sm text-gray-800">
            1 document is still in draft: <span className="font-semibold">Certificate Template</span> requires administrative review before publishing.
          </p>
        </div>
      </div>
      <button className="flex items-center justify-center gap-1.5 bg-[#965A20] hover:bg-[#7F4B19] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shadow-sm w-full sm:w-auto cursor-pointer">
        Review document
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default DocumentsAttentionBanner;
