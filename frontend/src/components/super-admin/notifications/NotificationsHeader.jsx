import React from 'react';
import { Settings } from 'lucide-react';

export default function NotificationsHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-[#111827] mb-2">Notifications</h1>
        <p className="text-[#6b7280]">Review system notifications and manage notification settings.</p>
      </div>
      <button className="flex items-center gap-2 px-4 py-2 border border-[#d1d5db] rounded-lg bg-white text-[#374151] font-medium hover:bg-gray-50 transition-colors cursor-pointer">
        <Settings className="w-4 h-4 text-[#6b7280]" />
        Notification settings
      </button>
    </div>
  );
}
