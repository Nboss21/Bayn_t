import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AppSidebar from '../components/AppSidebar';
import { registrarNavItems } from '../data/sidebarConfig';
import WorkspaceTopbar from '../components/WorkspaceTopbar';
import { getRegistrarBreadcrumbs } from '../utils/breadcrumbs';
import NotificationsDropdown from '../components/NotificationsDropdown';
import { initialNotifications } from '../data/notificationsData';

export default function RegistrarLayout() {
  const { pathname } = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read && !n.archived).length;
  const breadcrumbs = getRegistrarBreadcrumbs(pathname);

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
        navItems={registrarNavItems}
        workspaceName="Registrar Workspace"
        brandSubtitle="House of Beauty"
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
                SA
              </div>
              {!sidebarCollapsed && (
                <div>
                  <p className="text-sm font-medium text-[#111827]">Sandra Alemu</p>
                  <p className="text-xs text-[#6b7280]">Registrar</p>
                </div>
              )}
            </div>
          </div>
        }
      />
      <div className="flex-1 flex flex-col relative">
        <WorkspaceTopbar
          breadcrumbs={breadcrumbs}
          userName="Sandra Alemu"
          userInitials="SA"
          onToggleNotifications={() => setShowNotifications(!showNotifications)}
          unreadCount={unreadCount}
          profilePath="/registrar/profile"
        />
        <main className="flex-1 overflow-y-auto bg-white p-8 relative">
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