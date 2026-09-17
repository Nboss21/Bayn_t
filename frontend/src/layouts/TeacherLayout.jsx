import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Bell, Settings } from 'lucide-react';
import AppSidebar from '../components/AppSidebar';
import { teacherNavItems } from '../data/sidebarConfig';
import WorkspaceTopbar from '../components/WorkspaceTopbar';
import { getTeacherBreadcrumbs } from '../utils/breadcrumbs';
import NotificationsDropdown from '../components/NotificationsDropdown';
import { initialTeacherNotifications } from '../data/teacherNotificationsData';
import { notificationService } from '../services/applicationService';
import { useAuth } from '../context/AuthContext';

const TeacherLayout = () => {
  const { pathname } = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(initialTeacherNotifications);
  const { user } = useAuth();

  useEffect(() => {
    notificationService.list({ per_page: 20 }).then((result) => {
      const rows = result?.data || result || [];
      setNotifications(rows.map((n) => ({ ...n, title: n.type || 'Notification', name: '', time: n.created_at ? new Date(n.created_at).toLocaleString() : '', read: Boolean(n.read_at), archived: false, icon: 'alert', iconClass: 'bg-[#fef3c7] text-[#92400e]', left: { type: 'text', text: '' } })));
    }).catch(() => {});
  }, []);

  const breadcrumbs = getTeacherBreadcrumbs(pathname);
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

  const teacherFooter = (collapsed) => (
    <>
      <button
        className={`flex items-center w-full ${
          collapsed ? 'justify-center px-1 py-2.5' : 'gap-3 px-4 py-2.5 text-left'
        } text-[#4b5563] hover:bg-[#e8ece0] rounded-lg text-sm font-medium transition-colors`}
      >
        <Bell className="w-[18px] h-[18px] shrink-0" />
        {!collapsed && <span className="flex-1">Notifications</span>}
        {!collapsed && <span className="w-2 h-2 rounded-full bg-[#D4A373]" />}
      </button>
      <button
        className={`flex items-center w-full ${
          collapsed ? 'justify-center px-1 py-2.5' : 'gap-3 px-4 py-2.5 text-left'
        } text-[#4b5563] hover:bg-[#e8ece0] rounded-lg text-sm font-medium transition-colors`}
      >
        <Settings className="w-[18px] h-[18px] shrink-0" />
        {!collapsed && <span>Profile & Settings</span>}
      </button>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <AppSidebar
        navItems={teacherNavItems}
        workspaceName="Teacher Workspace"
        brandSubtitle="International Academy"
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        footer={teacherFooter}
      />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <WorkspaceTopbar
          breadcrumbs={breadcrumbs}
          userName={user?.name || 'User'}
          userInitials={(user?.name || 'User').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()}
          onToggleNotifications={() => setShowNotifications(!showNotifications)}
          unreadCount={unreadCount}
          profilePath="/teacher/profile"
        />
        <main className="flex-1 overflow-y-auto bg-white p-8 pb-20">
          <div className="w-full">
            <Outlet />
          </div>
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
};

export default TeacherLayout;
