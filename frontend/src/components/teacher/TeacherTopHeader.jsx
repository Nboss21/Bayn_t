import React from 'react';
import { Search, Bell } from 'lucide-react';

import { useLocation } from 'react-router-dom';

const TeacherTopHeader = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentPath = pathParts[pathParts.length - 1];
  
  // Format the path into a readable string (e.g., 'classes' -> 'My Classes', 'overview' -> 'Overview')
  const pageTitle = currentPath === 'classes' ? 'My Classes' : 
                    currentPath === 'overview' ? 'Overview' :
                    currentPath === 'roster' ? 'Class Roster' :
                    // roster/:studentId — currentPath will be the numeric ID
                    !isNaN(Number(currentPath)) ? 'Student Progress' :
                    currentPath.charAt(0).toUpperCase() + currentPath.slice(1);

  return (
    <header className="h-[72px] bg-white border-b border-gray-200 flex items-center justify-between px-8 ml-[240px]">
      <div className="flex items-center text-[14px]">
        <span className="text-gray-500">Teacher Workspace</span>
        <span className="mx-2 text-gray-300">/</span>
        <span className="font-semibold text-[#1A1A1A]">{pageTitle}</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative w-[320px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Global Search"
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-[14px] focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors placeholder:text-gray-400"
          />
        </div>
        
        <button className="text-gray-500 hover:text-gray-700 transition-colors">
          <Bell className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
          <span className="text-[14px] font-medium text-[#1A1A1A]">Hana Alemu</span>
          <div className="w-8 h-8 rounded-full bg-[#E5E5E5] flex items-center justify-center text-[12px] font-semibold text-gray-700">
            HV
          </div>
        </div>
      </div>
    </header>
  );
};

export default TeacherTopHeader;

