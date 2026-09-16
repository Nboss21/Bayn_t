import React from 'react';

const Pagination = ({ from, to, total, page, pageCount, onPageChange }) => {
  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between mt-auto">
      <p className="text-[14px] text-gray-500">
        Showing{' '}
        <span className="font-semibold text-gray-900">{total === 0 ? '0' : `${from}-${to}`}</span> of{' '}
        <span className="font-semibold text-gray-900">{total}</span> applications
      </p>
      <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1 || total === 0}
          className="px-3 py-1 text-[14px] font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          Previous
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`w-8 h-8 flex items-center justify-center rounded-md text-[14px] transition-colors ${
              number === page
                ? 'bg-[#c6d7b9] text-gray-900 font-semibold'
                : 'text-gray-600 hover:bg-gray-50 font-medium'
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pageCount || total === 0}
          className="px-3 py-1 text-[14px] font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;