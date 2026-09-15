import React from 'react';

const ApplicationsFilterBar = () => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="relative flex-1 max-w-[400px]">
        <input 
          type="text" 
          placeholder="Search by name, application ID, or program" 
          className="w-full pl-4 pr-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-gray-400"
        />
      </div>
      <button className="flex items-center justify-center px-6 py-2 bg-white border border-gray-200 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
        Filters
      </button>
    </div>
  );
};

export default ApplicationsFilterBar;
