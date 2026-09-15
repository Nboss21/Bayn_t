import React from 'react';
import PersonalInformationCard from '../components/PersonalInformationCard';
import AccountSecurityCard from '../components/AccountSecurityCard';
import PasswordSecurityCard from '../components/PasswordSecurityCard';
import AccountContextCard from '../components/AccountContextCard';

export default function ProfilePage() {
  return (
    <div className="max-w-[1000px] w-full">
      {/* Breadcrumb below Topbar */}
      <div className="flex items-center text-sm mb-4">
        <span className="text-[#6b7280]">Profile</span>
        <span className="mx-2 text-[#d1d5db]">/</span>
        <span className="font-medium text-[#111827]">Account</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#111827] mb-2">My Profile</h1>
        <p className="text-[#6b7280]">Manage your account information and security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="flex flex-col gap-6">
          <PersonalInformationCard />
          <AccountSecurityCard />
        </div>
        <div className="flex flex-col gap-6">
          <PasswordSecurityCard />
          <AccountContextCard />
        </div>
      </div>
    </div>
  );
}
