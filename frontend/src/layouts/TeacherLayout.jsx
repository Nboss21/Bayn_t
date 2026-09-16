import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Bell, Settings } from 'lucide-react';
import AppSidebar from '../components/AppSidebar';
import { teacherNavItems } from '../data/sidebarConfig';
import WorkspaceTopbar from '../components/WorkspaceTopbar';
import { getTeacherBreadcrumbs } from '../utils/breadcrumbs';
import NotificationsDropdown from '../components/NotificationsDropdown';
import { initialTeacherNotifications } from '../data/teacherNotificationsData';

const TeacherLayout = () => {
  const { pathname } = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(initialTeacherNotifications);

  const breadcrumbs = getTeacherBreadcrumbs(pathname);
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
          userName="Hana Alemu"
          userInitials="HV"
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