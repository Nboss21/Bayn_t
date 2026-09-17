import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

export default function AppSidebar({
  navItems = [],
  workspaceName = '',
  brandSubtitle = '',
  collapsed = false,
  onToggle,
  footer = null,
}) {
  return (
    <aside
      className={`bg-[#f4f7ed] h-screen flex flex-col border-r border-[#e5e7eb] flex-shrink-0 transition-[width] duration-300 ${
        collapsed ? 'w-[78px]' : 'w-64'
      }`}
    >
      {/* Logo Area */}
      <div
        className={
          collapsed
            ? 'pt-6 pb-6 flex flex-col items-center gap-4'
            : 'p-6 pb-8 flex items-center justify-between'
        }
      >
        <h1 className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-[#111827]">HOB</span>
          {!collapsed && (
            <span className="text-[10px] font-semibold tracking-widest text-[#6b7280] uppercase">
              {brandSubtitle}
            </span>
          )}
        </h1>
        {onToggle && (
          <button
            onClick={onToggle}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="text-[#6b7280] hover:text-[#111827] transition-colors"
          >
            {collapsed ? <ChevronsRight className="w-4 h-4" /> : <ChevronsLeft className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Workspace Area */}
      {!collapsed && (
        <div className="px-6 pb-6">
          <p className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-widest mb-1">
            WORKSPACE
          </p>
          <p className="text-sm font-medium text-[#111827]">{workspaceName}</p>
        </div>
      )}

      {/* Navigation */}
      <nav className={`flex-1 space-y-1 ${collapsed ? 'px-3' : 'px-4'}`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              title={collapsed ? item.name : undefined}
              className={({ isActive }) =>
                `relative flex items-center rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-[#c6dbb6] font-medium text-[#111827]'
                    : 'text-[#4b5563] hover:bg-[#e8ece0] font-normal'
                } ${collapsed ? 'justify-center px-1 py-2.5' : 'justify-between px-4 py-2.5'}`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center min-w-0">
                    <Icon className="w-[18px] h-[18px] shrink-0" />
                    {!collapsed && <span className="ml-3">{item.name}</span>}
                  </div>
                  {collapsed
                    ? item.badge && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ef4444]" />
                      )
                    : item.badge && (
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
          );
        })}
      </nav>

      {/* Bottom Section */}
      {footer && <div className="mt-auto px-4 pb-6">{typeof footer === 'function' ? footer(collapsed) : footer}</div>}
    </aside>
  );
}