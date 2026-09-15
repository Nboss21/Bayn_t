import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const pageTitle = location.pathname.split('/').pop();
  const capitalizedTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

  return (
    <header className="h-[72px] px-8 flex items-center justify-between border-b border-gray-200 bg-white shrink-0">
      <div className="flex items-center text-[14px] text-gray-500">
        <span>Registrar Workspace</span>
        <span className="mx-2">/</span>
        <span className="font-semibold text-gray-900">{capitalizedTitle}</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input 
            type="text" 
            placeholder="Global Search" 
            className="pl-9 pr-4 py-1.5 w-[280px] border border-gray-200 rounded-md text-[14px] focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-gray-400"
          />
        </div>

        <button className="relative p-1 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
        </button>

        <div className="h-6 w-px bg-gray-200"></div>

        <div className="flex items-center gap-3">
          <span className="text-[14px] font-medium text-gray-700">Sandra Alemu</span>
          <div className="w-8 h-8 rounded-full bg-[#f2f4ec] border border-gray-200 flex items-center justify-center text-[12px] font-medium text-gray-600">
            SA
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
