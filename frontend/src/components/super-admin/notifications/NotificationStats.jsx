import React from 'react';

export default function NotificationStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Unread Notifications Card */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider mb-2">
              UNREAD NOTIFICATIONS
            </p>
            <h3 className="text-3xl font-bold text-[#111827]">3</h3>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#fbcfe8] text-[#9d174d] opacity-80">
            3 unread
          </span>
        </div>
      </div>

      {/* Active Notification Types Card */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider mb-2">
              ACTIVE NOTIFICATION TYPES
            </p>
            <h3 className="text-3xl font-bold text-[#111827]">4</h3>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#d1fae5] text-[#065f46]">
            Monitored
          </span>
        </div>
      </div>
    </div>
  );
}
