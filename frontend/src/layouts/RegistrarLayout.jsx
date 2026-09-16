import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import NotificationsDropdown from '../components/NotificationsDropdown';
import { initialNotifications } from '../data/notificationsData';

export default function RegistrarLayout() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col relative">
        <Topbar
          onToggleNotifications={() => setShowNotifications(!showNotifications)}
          unreadCount={unreadCount}
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