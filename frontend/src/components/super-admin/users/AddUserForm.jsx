import React from 'react';
import { UserPlus } from 'lucide-react';
import PersonalInformationSection from './PersonalInformationSection';
import RoleAccessSection from './RoleAccessSection';
import AccountStatusSection from './AccountStatusSection';

export default function AddUserForm() {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-sm">
      <div className="p-8">
        <PersonalInformationSection />
        <RoleAccessSection />
        <AccountStatusSection />
      </div>
      
      {/* Footer Actions */}
      <div className="px-8 py-4 bg-white border-t border-[#e5e7eb] flex items-center justify-between">
        <button className="px-4 py-2 bg-white border border-[#d1d5db] text-[#374151] text-sm font-medium rounded-lg hover:bg-[#f9fafb] transition-colors cursor-pointer">
          Cancel
        </button>
        
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-[#4b5563] hover:text-[#111827] px-4 py-2 cursor-pointer">
            Reset
          </button>
          <button className="px-4 py-2 bg-[#c1d0b5] text-[#111827] text-sm font-medium rounded-lg hover:bg-[#b0bfa4] transition-colors flex items-center gap-2 cursor-pointer">
            <UserPlus className="w-4 h-4" />
            Create User
          </button>
        </div>
      </div>
    </div>
  );
}
