import React from 'react';
import { Search, Check } from 'lucide-react';

const TeacherAttendanceControls = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  filterCounts,
  onPresentByDefault,
}) => {
  return (
    <div className="flex justify-between items-end mb-6">
      <div className="flex flex-col gap-5 w-full max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by student name or ID..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-[300px] pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-gray-300 transition-colors placeholder:text-gray-400"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => onFilterChange('All')}
            className={`border px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
              activeFilter === 'All'
                ? 'border-gray-300 bg-white text-[#1A1A1A]'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            All ({filterCounts.all})
          </button>
          <button
            onClick={() => onFilterChange('Unmarked')}
            className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
              activeFilter === 'Unmarked'
                ? 'text-[#B54708] bg-orange-50'
                : 'text-[#B54708] hover:bg-orange-50'
            }`}
          >
            Not marked ({filterCounts.unmarked})
          </button>
          <button
            onClick={() => onFilterChange('Present')}
            className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
              activeFilter === 'Present'
                ? 'text-[#027A48] bg-green-50'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            Present ({filterCounts.present})
          </button>
          <button
            onClick={() => onFilterChange('Absent')}
            className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
              activeFilter === 'Absent'
                ? 'text-[#B42318] bg-red-50'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            Absent ({filterCounts.absent})
          </button>
          <button
            onClick={() => onFilterChange('Late')}
            className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
              activeFilter === 'Late'
                ? 'text-[#B54708] bg-orange-50'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            Late ({filterCounts.late})
          </button>
        </div>
      </div>
      
      <button
        onClick={onPresentByDefault}
        className="border border-gray-300 bg-white text-[#1A1A1A] px-5 py-2.5 rounded-lg text-[14px] font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
      >
        <Check className="w-4 h-4" />
        Present by Default
      </button>
    </div>
  );
};

export default TeacherAttendanceControls;