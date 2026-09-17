import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AppSidebar from '../components/AppSidebar';
import { superadminNavItems } from '../data/sidebarConfig';
import WorkspaceTopbar from '../components/WorkspaceTopbar';
import { getSuperAdminBreadcrumbs } from '../utils/breadcrumbs';
import NotificationsDropdown from '../components/NotificationsDropdown';
import { initialNotifications } from '../data/notificationsData';

export default function SuperAdminLayout() {
  const { pathname } = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const breadcrumbs = getSuperAdminBreadcrumbs(pathname);
  const unreadCount = notifications.filter((n) => !n.read && !n.archived).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleMarkRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleToggleArchive = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, archived: !n.archived } : n)));
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <AppSidebar
        navItems={superadminNavItems}
        workspaceName="Super Admin Workspace"
        brandSubtitle="International Academy"
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        footer={
          <div
            className={`flex items-center py-2 ${
              sidebarCollapsed ? 'justify-center px-2' : 'px-4'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white border border-[#e5e7eb] flex items-center justify-center text-xs font-semibold text-[#111827]">
                D
              </div>
              {!sidebarCollapsed && (
                <div>
                  <p className="text-sm font-medium text-[#111827]">Daniel</p>
                  <p className="text-xs text-[#6b7280]">Super Admin</p>
                </div>
              )}
            </div>
          </div>
        }
      />
      <div className="flex-1 flex flex-col relative">
        <WorkspaceTopbar
          breadcrumbs={breadcrumbs}
          userName="Daniel"
          userInitials="D"
          onToggleNotifications={() => setShowNotifications(!showNotifications)}
          unreadCount={unreadCount}
          profilePath="/super-admin/settings"
        />
        <main className="flex-1 overflow-y-auto bg-[#fafaf9] p-8 relative">
          <Outlet />
        </main>
        {showNotifications && (
          <NotificationsDropdown
            notifications={notifications}
            onClose={() => setShowNotifications(false)}
            onMarkAllRead={handleMarkAllRead}
            onMarkRead={handleMarkRead}
            onToggleArchive={handleToggleArchive}
          />
        )}
      </div>
    </div>
  );
}