import React from 'react';
import { Search } from 'lucide-react';

const DocumentsFilterBar = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-4">
      <div className="relative flex-1 max-w-md">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search documents..."
          className="w-full pl-9 pr-4 py-2 bg-[#F9FAFB] border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300 focus:bg-white transition-colors placeholder:text-gray-400"
        />
      </div>
      <div className="flex flex-wrap items-center gap-4 lg:ml-auto">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 font-medium">Type:</span>
          <select className="bg-[#F9FAFB] border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-gray-300 hover:bg-white transition-colors cursor-pointer min-w-[120px]">
            <option>All types</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 font-medium">Status:</span>
          <select className="bg-[#F9FAFB] border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-gray-300 hover:bg-white transition-colors cursor-pointer min-w-[120px]">
            <option>All statuses</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 font-medium">Sort:</span>
          <select className="bg-[#F9FAFB] border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-gray-300 hover:bg-white transition-colors cursor-pointer min-w-[150px]">
            <option>Recently updated</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DocumentsFilterBar;
