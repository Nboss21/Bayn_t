import React from 'react';

export default function SettingsHeaderSection() {
  return (
    <div className="flex items-start justify-between border-b border-[#e5e7eb] pb-6 mb-8 mt-2">
      <div>
        <h2 className="text-[28px] font-bold text-[#111827] mb-1">Profile & Settings</h2>
        <p className="text-[15px] text-[#6b7280]">
          Manage your personal account and configure the HOB platform settings.
        </p>
      </div>
      <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#f4f7f2] border border-[#e5e7eb] rounded-full">
        <div className="w-2 h-2 rounded-full bg-[#16a34a]"></div>
        <span className="text-[13px] font-medium text-[#4b5563]">Signed in as Daniel (Super Admin)</span>
      </div>
    </div>
  );
}
