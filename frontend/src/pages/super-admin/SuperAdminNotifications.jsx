import React from 'react';
import NotificationsHeader from '../../components/super-admin/notifications/NotificationsHeader';
import NotificationStats from '../../components/super-admin/notifications/NotificationStats';
import NotificationsFilter from '../../components/super-admin/notifications/NotificationsFilter';
import NotificationsTable from '../../components/super-admin/notifications/NotificationsTable';

export default function SuperAdminNotifications() {
  return (
    <div className="w-full pb-12">
      <NotificationsHeader />
      <NotificationStats />
      <NotificationsFilter />
      <NotificationsTable />

      <p className="text-xs text-[#9ca3af]">
        Last verified: Today, 10:42 AM by Daniel
      </p>
    </div>
  );
}
