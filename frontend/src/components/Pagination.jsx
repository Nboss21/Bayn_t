import React from 'react';

const Pagination = () => {
  return (
    <div className="flex items-center justify-between mt-auto">
      <p className="text-[14px] text-gray-500">
        Showing <span className="font-semibold text-gray-900">1-7</span> of <span className="font-semibold text-gray-900">48</span> applications
      </p>
      <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
        <button className="px-3 py-1 text-[14px] font-medium text-gray-400 cursor-not-allowed">
          Previous
        </button>
        <button className="w-8 h-8 flex items-center justify-center bg-[#c6d7b9] text-gray-900 rounded-md text-[14px] font-semibold">
          1
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-md text-[14px] font-medium transition-colors">
          2
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-md text-[14px] font-medium transition-colors">
          3
        </button>
        <button className="px-3 py-1 text-[14px] font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
