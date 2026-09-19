import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  CheckSquare,
  BarChart2,
  CreditCard,
  FileText,
  FolderOpen,
  Shield,
  History,
  Bell,
  Settings,
  KeyRound,
  ChevronDown
} from 'lucide-react';

const mainNavItems = [
  { name: 'Overview', path: '/super-admin/overview', icon: LayoutDashboard },
  { name: 'Users', path: '/super-admin/users', icon: Users },
  { name: 'Programs', path: '/super-admin/programs', icon: BookOpen },
  { name: 'Classes & Intakes', path: '/super-admin/classes', icon: Calendar },
  { name: 'Grading', path: '/super-admin/grading', icon: CheckSquare },
  { name: 'Reports', path: '/super-admin/reports', icon: BarChart2 },
  { name: 'Payments', path: '/super-admin/payments', icon: CreditCard, badge: '3' },
  { name: 'Content', path: '/super-admin/content', icon: FileText },
  { name: 'Documents', path: '/super-admin/documents', icon: FolderOpen },
];

const bottomNavItems = [
  { name: 'Roles & Permissions', path: '/super-admin/roles', icon: Shield },
  { name: 'Audit Log', path: '/super-admin/audit', icon: History },
  { name: 'Notifications', path: '/super-admin/notifications', icon: Bell, badge: '3' },
  { name: 'Password Resets', path: '/super-admin/password-resets', icon: KeyRound },
  { name: 'Profile & Settings', path: '/super-admin/settings', icon: Settings },
];

export default function SuperAdminSidebar() {
  return (
    <aside className="w-[260px] bg-[#f0f2ea] h-screen flex flex-col font-sans flex-shrink-0 border-r border-[#e5e7eb]">
      {/* Logo Area */}
      <div className="p-8 pb-10 flex flex-col items-center">
        <h1 className="flex flex-col items-center justify-center">
          <span className="text-4xl font-serif tracking-widest text-[#111827]">HOB</span>
          <span className="text-[9px] font-medium tracking-[0.2em] text-[#b39556] uppercase mt-2 text-center">
            INTERNATIONAL ACADEMY
          </span>
        </h1>
      </div>

      {/* Workspace Area */}
      <div className="px-6 pb-4">
        <p className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-widest mb-1">WORKSPACE</p>
        <button className="flex items-center justify-between w-full text-sm font-medium text-[#111827] cursor-pointer">
          <span>Super Admin</span>
          <ChevronDown className="w-4 h-4 text-[#6b7280]" />
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
        <nav className="space-y-1 px-4">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-colors ${isActive
                    ? 'bg-[#c3d3ba] font-medium text-[#111827]'
                    : 'text-[#4b5563] hover:bg-[#e4e8dc] font-normal'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#111827]' : 'text-[#6b7280]'}`} />
                      <span className="ml-3 text-sm">{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="inline-flex items-center justify-center w-5 h-5 text-[11px] font-semibold rounded-full bg-[#f97316] text-white">
                        {item.badge}
                      </span>
                    )}
                    {item.name === 'Content' && (
                      <ChevronDown className="w-4 h-4 text-[#6b7280]" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-auto px-4 py-6">
        <nav className="space-y-1">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-colors ${isActive
                    ? 'bg-[#c3d3ba] font-medium text-[#111827]'
                    : 'text-[#4b5563] hover:bg-[#e4e8dc] font-normal'
                  }`
                }
              >
                <div className="flex items-center min-w-0">
                  <Icon className="w-4 h-4 shrink-0 text-[#6b7280]" />
                  <span className="ml-3 text-sm">{item.name}</span>
                </div>
                {item.badge && (
                  <span className="inline-flex items-center justify-center w-5 h-5 text-[11px] font-semibold rounded-full bg-[#f97316] text-white">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
