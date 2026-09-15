import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import NotificationsDropdown from '../components/NotificationsDropdown';

export default function RegistrarLayout() {
  const [showNotifications, setShowNotifications] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar onToggleNotifications={() => setShowNotifications(!showNotifications)} showNotifications={showNotifications} />
      <div className="flex-1 flex flex-col relative">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-white p-8 relative">
          <Outlet />
        </main>
        {showNotifications && (
          <NotificationsDropdown onClose={() => setShowNotifications(false)} />
        )}
      </div>
    </div>
  );
}
