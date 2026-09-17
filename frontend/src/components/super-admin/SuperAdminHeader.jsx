import React from 'react';
import { Search, Bell } from 'lucide-react';

import { useLocation } from 'react-router-dom';
import { superAdminPrograms } from '../../data/superAdminProgramsData';
import { superAdminClasses } from '../../data/superAdminClassesData';

export default function SuperAdminHeader() {
  const location = useLocation();
  let category = "Super Admin Workspace";
  let title = "Overview";

  if (location.pathname.includes('/payments')) {
    title = "Payments";
  } else if (location.pathname.includes('/reports')) {
    category = "Academic Management";
    title = "Reports";
  } else if (location.pathname.includes('/programs/edit')) {
    category = "Academic Management";
    const programMatch = location.pathname.match(/^\/super-admin\/programs\/([^/]+)\/edit$/);
    const program = programMatch ? superAdminPrograms.programDetails?.[programMatch[1]] : null;
    title = program ? program.name : 'Edit Program';
  } else if (location.pathname.match(/^\/super-admin\/programs\/[^/]+$/)) {
    category = "Academic Management";
    const programMatch = location.pathname.match(/^\/super-admin\/programs\/([^/]+)$/);
    const program = programMatch ? superAdminPrograms.programDetails?.[programMatch[1]] : null;
    title = program ? program.name : 'Program';
  } else if (location.pathname.includes('/users')) {
    title = "Users";
  } else if (location.pathname.includes('/programs')) {
    title = "Programs";
  } else if (location.pathname.match(/^\/super-admin\/classes\/[^/]+$/)) {
    category = "Academic Management";
    const classMatch = location.pathname.match(/^\/super-admin\/classes\/([^/]+)$/);
    const cls = classMatch
      ? superAdminClasses.classes.find((c) => String(c.id) === String(classMatch[1]))
      : null;
    title = cls ? cls.name : 'Class';
  } else if (location.pathname.includes('/classes')) {
    category = "Academic Management";
    title = "Classes & Intakes";
  } else if (location.pathname.includes('/grading')) {
    title = "Grading";
  } else if (location.pathname.includes('/roles')) {
    category = "People & Access";
    title = "Roles & Permissions";
  } else if (location.pathname.includes('/audit')) {
    category = "System";
    title = "Audit Log";
  } else if (location.pathname.includes('/notifications')) {
    category = "Communication";
    title = "Notifications";
  } else if (location.pathname.includes('/settings')) {
    category = "System";
    title = "Profile & Settings";
  }

  const isAddUser = location.pathname === '/super-admin/users/add';
  const isAddProgram = location.pathname === '/super-admin/programs/add';
  const isEditProgram = location.pathname.includes('/programs/edit');
  const isAddClass = location.pathname === '/super-admin/classes/add';
  const isViewClass = !isAddClass && /^\/super-admin\/classes\/[^/]+$/.test(location.pathname);

  return (
    <header className="h-[72px] bg-white border-b border-[#e5e7eb] flex items-center justify-between px-8 shrink-0">
      {/* Breadcrumb / Title */}
      <div className="flex items-center text-sm font-medium">
        <span className="text-[#6b7280]">
          {category}
        </span>
        <span className="mx-2 text-[#9ca3af]">/</span>
        {isAddUser ? (
          <>
            <span className="text-[#6b7280]">Users</span>
            <span className="mx-2 text-[#9ca3af]">/</span>
            <span className="font-semibold text-[#111827]">Add User</span>
          </>
        ) : isAddProgram ? (
          <>
            <span className="text-[#6b7280]">Programs</span>
            <span className="mx-2 text-[#9ca3af]">/</span>
            <span className="font-semibold text-[#111827]">Add Program</span>
          </>
        ) : isEditProgram ? (
          <>
            <span className="text-[#6b7280]">Programs</span>
            <span className="mx-2 text-[#9ca3af]">/</span>
            <span className="font-semibold text-[#111827]">{title}</span>
          </>
        ) : isAddClass ? (
          <>
            <span className="text-[#6b7280]">Classes & Intakes</span>
            <span className="mx-2 text-[#9ca3af]">/</span>
            <span className="font-semibold text-[#111827]">Add Class</span>
          </>
        ) : isViewClass ? (
          <>
            <span className="text-[#6b7280]">Classes & Intakes</span>
            <span className="mx-2 text-[#9ca3af]">/</span>
            <span className="font-semibold text-[#111827]">{title}</span>
          </>
        ) : (
          <span className="font-semibold text-[#111827]">{title}</span>
        )}
      </div>

      {/* Right side: Search, Notifications, Profile */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[#9ca3af]" />
          </div>
          <input
            type="text"
            className="block w-[320px] pl-10 pr-4 py-2 border border-[#e5e7eb] rounded-lg text-sm bg-white placeholder-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5]"
            placeholder={
              location.pathname.includes('/reports') ? "Search reports or records..." :
              location.pathname.includes('/settings') ? "Search user, action, or setting..." :
              location.pathname.includes('/notifications') ? "Search notifications..." :
              "Global Search..."
            }
          />
        </div>

        {/* Notifications Bell */}
        <button className="relative text-[#6b7280] hover:text-[#111827] transition-colors p-1 cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#eab308] border-2 border-white" />
        </button>

        {/* Divider */}
        <div className="w-[1px] h-6 bg-[#e5e7eb]"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#4b5563] flex items-center justify-center text-sm font-bold text-white">
            D
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#111827] leading-none">Daniel</span>
            <span className="text-[11px] text-[#6b7280] mt-1">Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
