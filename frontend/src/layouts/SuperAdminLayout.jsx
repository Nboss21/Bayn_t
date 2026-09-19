import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AppSidebar from '../components/AppSidebar';
import { superadminNavItems } from '../data/sidebarConfig';
import WorkspaceTopbar from '../components/WorkspaceTopbar';
import { getSuperAdminBreadcrumbs } from '../utils/breadcrumbs';
import NotificationsDropdown from '../components/NotificationsDropdown';
import { notificationService } from '../services/applicationService';
import { useAuth } from '../context/AuthContext';

export default function SuperAdminLayout() {
  const { pathname } = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    notificationService.list({ per_page: 20 }).then((result) => {
      const rows = result?.data || result || [];
      setNotifications(rows.map((n) => ({ ...n, title: n.type === 'password_reset_requested' ? 'Password reset requested' : (n.type || 'Notification'), name: '', time: n.created_at ? new Date(n.created_at).toLocaleString() : '', read: Boolean(n.read_at), archived: false, to: n.type === 'password_reset_requested' ? '/super-admin/password-resets' : undefined, icon: 'alert', iconClass: 'bg-[#fef3c7] text-[#92400e]', left: { type: 'text', text: '' } })));
    }).catch(() => {});
  }, []);

  const breadcrumbs = getSuperAdminBreadcrumbs(pathname);
  const unreadCount = notifications.filter((n) => !n.read && !n.archived).length;

  const handleMarkAllRead = () => {
    notificationService.readAll().catch(() => {});
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleMarkRead = (id) => {
    notificationService.read(id).catch(() => {});
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
                {(user?.name || 'User').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              {!sidebarCollapsed && (
                <div>
                  <p className="text-sm font-medium text-[#111827]">{user?.name || 'User'}</p>
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
          userName={user?.name || 'User'}
          userInitials={(user?.name || 'User').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()}
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
