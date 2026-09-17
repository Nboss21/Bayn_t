import React from 'react';

const DocumentsPagination = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
      <div className="text-[13px] text-gray-500">
        Showing <span className="font-bold text-gray-700">8</span> of <span className="font-bold text-gray-700">8</span> official documents
      </div>
      <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1 bg-white shadow-sm">
        <button className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors cursor-pointer">
          Previous
        </button>
        <button className="px-3 py-1.5 text-sm font-medium bg-[#1A1A1A] text-white rounded-md cursor-pointer">
          1
        </button>
        <button className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors cursor-pointer">
          Next
        </button>
      </div>
    </div>
  );
};

export default DocumentsPagination;
