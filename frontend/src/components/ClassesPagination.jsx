import React from 'react';

const ClassesPagination = () => {
  return (
    <div className="flex items-center justify-between mt-6">
      <p className="text-[14px] text-[#6b7280]">
        Showing <span className="font-medium text-[#111827]">1-4</span> of{' '}
        <span className="font-medium text-[#111827]">4</span> active cohorts
      </p>
      <div className="flex items-center gap-1 bg-white border border-[#e5e7eb] rounded-lg p-1">
        <button className="px-3 py-1 text-[14px] font-medium text-[#9ca3af] cursor-not-allowed">
          Previous
        </button>
        <button className="w-8 h-8 flex items-center justify-center bg-[#c6d7b9] text-[#111827] rounded-md text-[14px] font-semibold">
          1
        </button>
        <button className="px-3 py-1 text-[14px] font-medium text-[#9ca3af] cursor-not-allowed">
          Next
        </button>
      </div>
    </div>
  );
};

export default ClassesPagination;
