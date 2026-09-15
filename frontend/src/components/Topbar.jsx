import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import studentsDetailData from '../data/studentsDetailData';

const ROUTE_CRUMBS = {
  '/registrar/overview': [{ label: 'Registrar Workspace' }, { label: 'Overview', active: true }],
  '/registrar/applications': [{ label: 'Registrar Workspace' }, { label: 'Applications', active: true }],
  '/registrar/students': [{ label: 'Registrar Workspace' }, { label: 'Students', active: true }],
  '/registrar/classes': [{ label: 'Registrar', active: true }],
  '/registrar/history': [{ label: 'Registrar Workspace' }, { label: 'Enrollment History', active: true }],
  '/registrar/profile': [{ label: 'Registrar', active: false }],
};

function getBreadcrumbs(pathname) {
  // Exact match first
  if (ROUTE_CRUMBS[pathname]) return ROUTE_CRUMBS[pathname];
  // Application review e.g. /registrar/applications/HOB-2026-0142
  const appReviewMatch = pathname.match(/^\/registrar\/applications\/([^/]+)$/);
  if (appReviewMatch) {
    return [
      { label: 'Registrar Workspace' },
      { label: 'Applications' },
      { label: appReviewMatch[1], active: true },
    ];
  }
  // Class assignment e.g. /registrar/applications/HOB-2026-0142/assign-class
  const assignMatch = pathname.match(/^\/registrar\/applications\/([^/]+)\/assign-class$/);
  if (assignMatch) {
    return [
      { label: 'Registrar Workspace' },
      { label: 'Applications' },
      { label: assignMatch[1] },
      { label: 'Class Assignment', active: true },
    ];
  }
  // Student detail e.g. /registrar/students/HOB-ST-2026-0041
  const studentDetailMatch = pathname.match(/^\/registrar\/students\/([^/]+)$/);
  if (studentDetailMatch) {
    const studentId = decodeURIComponent(studentDetailMatch[1]);
    const studentData = studentsDetailData[studentId];
    const label = studentData ? studentData.name : studentId;
    return [
      { label: 'Registrar' },
      { label: 'Students' },
      { label, active: true },
    ];
  }
  return [{ label: 'Registrar', active: false }];
}

export default function Topbar() {
  const { pathname } = useLocation();
  const crumbs = getBreadcrumbs(pathname);
  const [dropdownOpen, setDropdownOpen] = useState(true); // default open in design image
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="h-[72px] flex items-center justify-between px-8 border-b border-[#e5e7eb] bg-[#fafafa] w-full font-sans relative z-50">
      {/* Breadcrumbs */}
      <div className="flex items-center text-[#111827] text-base">
        {crumbs.map((crumb, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="mx-2 text-[#d1d5db]">/</span>}
            <span
              className={
                crumb.active
                  ? 'font-medium text-[#111827]'
                  : 'text-[#111827]'
              }
            >
              {crumb.label}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[#9ca3af]" />
          </div>
          <input
            type="text"
            defaultValue="mekdes"
            className="block w-64 pl-10 pr-10 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#111827] placeholder-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#9ca3af] focus:border-[#9ca3af] bg-[#f4f5f5]"
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
            <div className="border border-[#d1d5db] rounded px-1.5 py-0.5 text-[10px] text-[#9ca3af] bg-white font-medium">
              ⌘K
            </div>
          </div>
        </div>

        {/* Notification bell */}
        <button className="text-[#4b5563] hover:text-[#111827] relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-[#ef4444] ring-2 ring-[#fafafa]" />
        </button>

        {/* User Profile Mini */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 bg-[#a5be9a] hover:bg-[#96ae8b] rounded-full px-3 py-1.5 transition-colors"
          >
            <span className="text-sm font-medium text-[#111827] ml-1">Sandra Alemu</span>
            <div className="w-7 h-7 rounded-full bg-[#91ab86] flex items-center justify-center text-xs font-semibold text-[#111827]">
              SA
            </div>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-[#e5e7eb] rounded-xl shadow-lg py-2 z-50">
              <button className="w-full flex items-center justify-between px-4 py-2 hover:bg-[#f9fafb] text-sm text-[#111827] font-medium mb-1">
                Sandra Alemu
                <ChevronDown className="w-4 h-4 text-[#6b7280]" />
              </button>
              <div className="border-t border-[#f3f4f6] my-1"></div>
              <button className="w-full flex items-center px-4 py-2 hover:bg-[#f9fafb] text-sm text-[#111827] mt-1">
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
