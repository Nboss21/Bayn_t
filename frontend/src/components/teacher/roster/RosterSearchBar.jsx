import React, { useState } from 'react';
import { Search } from 'lucide-react';

const tabs = ['All (18)', 'Needs Attention (2)', 'On Track (16)'];

const RosterSearchBar = ({ activeTab, onTabChange, searchQuery, onSearchChange }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      {/* Left: title + tabs */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-[18px] font-semibold text-[#1A1A1A]">Enrolled Students</h2>
          <span className="bg-gray-100 text-gray-600 text-[12px] font-semibold px-2 py-0.5 rounded-full">18</span>
        </div>
        <p className="text-[12px] text-gray-400 -mt-2 mb-3">
          Add students or manage enrollment, view for tracking, etc...
        </p>
        <div className="flex items-center gap-1 bg-[#F4F5F4] p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-4 py-1.5 rounded-md text-[13px] font-medium transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-white shadow-sm text-[#1A1A1A]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const RosterSearchInput = ({ searchQuery, onSearchChange }) => (
  <div className="relative mb-4">
    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search by student name or ID..."
      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors placeholder:text-gray-400 bg-white"
    />
  </div>
);

export default RosterSearchBar;

