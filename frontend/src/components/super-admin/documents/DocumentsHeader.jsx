import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const DocumentsHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-[28px] font-semibold text-gray-900 tracking-tight">Documents</h1>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F0FDF4] text-[#15803D] text-xs font-medium rounded-full border border-[#DCFCE7]">
          <div className="w-1.5 h-1.5 bg-[#16A34A] rounded-full"></div>
          Official Repository
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-600 border border-gray-200 px-3 py-2 rounded-lg bg-white shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
          <span className="font-medium">8 published documents</span>
        </div>
        <button className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-black text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm cursor-pointer">
          <span>+ Add Document</span>
        </button>
      </div>
    </div>
  );
};

export default DocumentsHeader;
