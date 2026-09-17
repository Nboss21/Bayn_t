import React from 'react';
import SettingsHeaderSection from '../../components/super-admin/settings/SettingsHeaderSection';
import MyProfileCard from '../../components/super-admin/settings/MyProfileCard';

export default function SuperAdminSettings() {
  return (
    <div className="w-full max-w-[1100px]">
      <SettingsHeaderSection />
      
      <div>
        <MyProfileCard />
      </div>

      <div className="mt-6 ml-1">
        <p className="text-[13px] text-[#9ca3af]">
          Last verified: Today, 10:42 AM by Daniel
        </p>
      </div>
    </div>
  );
}
