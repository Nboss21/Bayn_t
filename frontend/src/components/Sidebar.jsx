import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bell } from 'lucide-react';

const navItems = [
  { name: 'Overview', path: '/registrar/overview' },
  { name: 'Applications', path: '/registrar/applications', badge: '12' },
  { name: 'Students', path: '/registrar/students' },
  { name: 'Classes', path: '/registrar/classes' },
  { name: 'Enrollment History', path: '/registrar/history' },
  { name: 'Profile', path: '/registrar/profile' },
];

export default function Sidebar({ onToggleNotifications, showNotifications }) {
  return (
    <aside className="w-64 bg-[#f4f7ed] h-screen flex flex-col border-r border-[#e5e7eb] font-sans flex-shrink-0">
      {/* Logo Area */}
      <div className="p-6 pb-8">
        <h1 className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-[#111827]">HOB</span>
          <span className="text-[10px] font-semibold tracking-widest text-[#6b7280] uppercase mt-1">HOUSE OF BEAUTY</span>
        </h1>
      </div>

      {/* Workspace Area */}
      <div className="px-6 pb-6">
        <p className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-widest mb-1">WORKSPACE</p>
        <p className="text-sm font-medium text-[#111827]">Registrar Workspace</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-[#c6dbb6] font-medium text-[#111827]'
                  : 'text-[#4b5563] hover:bg-[#e8ece0] font-normal'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>{item.name}</span>
                {item.badge && (
                  <span
                    className={`inline-flex items-center justify-center px-2 py-0.5 text-[11px] font-semibold rounded-full ${
                      isActive ? 'bg-white text-[#111827]' : 'bg-[#e5e7eb] text-[#4b5563]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto px-4 pb-6 space-y-4">
        {/* Notifications */}
        <button 
          onClick={onToggleNotifications}
          className={`flex items-center justify-between w-full px-4 py-2 text-sm rounded-lg transition-colors ${
            showNotifications 
              ? 'bg-white border border-[#e5e7eb] shadow-sm text-[#111827]' 
              : 'text-[#4b5563] hover:bg-[#e8ece0]'
          }`}
        >
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#4b5563]" />
            <span className="font-medium">Notifications</span>
          </div>
          <span className={`inline-flex items-center justify-center px-2 py-0.5 text-[11px] font-bold rounded-full ${
            showNotifications ? 'bg-[#3e4a36] text-white' : 'bg-[#e5e7eb] text-[#4b5563]'
          }`}>
            4
          </span>
        </button>

        {/* User Profile */}
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white border border-[#e5e7eb] flex items-center justify-center text-xs font-semibold text-[#111827]">
              SA
            </div>
            <div>
              <p className="text-sm font-medium text-[#111827]">Sandra Alemu</p>
              <p className="text-xs text-[#6b7280]">Registrar</p>
            </div>
          </div>
          <button className="text-[#9ca3af] hover:text-[#6b7280]">
            <span className="text-lg leading-none pb-2">...</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
