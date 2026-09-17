import React from 'react';
import { Lock } from 'lucide-react';

export default function MyProfileCard() {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[20px] p-8 max-w-[850px]">
      <div className="mb-6 border-b border-[#e5e7eb] pb-6">
        <h3 className="text-xl font-bold text-[#111827] mb-1.5">My Profile</h3>
        <p className="text-[15px] text-[#6b7280]">Your personal information and HOB account details.</p>
      </div>

      <div className="bg-[#f9faf8] border border-[#e5e7eb] rounded-xl p-5 flex items-center justify-between mb-8">
        <div className="flex items-center gap-5">
          <div className="w-[68px] h-[68px] rounded-full bg-[#b5c5a8] flex items-center justify-center text-[#111827] text-2xl font-bold">
            DE
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-lg font-bold text-[#111827]">Daniel Example</span>
              <span className="px-2.5 py-0.5 bg-[#e6f4ea] text-[#16a34a] text-[11px] font-semibold rounded-full uppercase tracking-wide">
                Super Admin
              </span>
            </div>
            <span className="text-[13px] text-[#6b7280]">
              Profile avatar will appear in audit logs and system activity.
            </span>
          </div>
        </div>
        <button className="px-4 py-2 bg-white border border-[#e5e7eb] rounded-xl text-sm font-semibold text-[#111827] hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">
          Change photo
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-6">
        <div>
          <label className="block text-[13px] font-semibold text-[#111827] mb-2">Full name</label>
          <input
            type="text"
            defaultValue="Daniel Example"
            className="w-full px-4 py-2.5 border border-[#e5e7eb] rounded-xl text-[15px] text-[#4b5563] focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5]"
          />
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-[#111827] mb-2">Email address</label>
          <input
            type="email"
            defaultValue="daniel@example.com"
            className="w-full px-4 py-2.5 border border-[#e5e7eb] rounded-xl text-[15px] text-[#4b5563] focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5]"
          />
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-[#111827] mb-2">Phone number</label>
          <input
            type="text"
            defaultValue="+251 11 000 0000"
            className="w-full px-4 py-2.5 border border-[#e5e7eb] rounded-xl text-[15px] text-[#4b5563] focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5]"
          />
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-[#111827] mb-2">Assigned Role</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Lock className="w-[18px] h-[18px] text-[#9ca3af]" />
            </div>
            <input
              type="text"
              defaultValue="Super Admin"
              readOnly
              className="w-full pl-10 pr-[130px] py-2.5 border border-[#e5e7eb] rounded-xl text-[15px] text-[#4b5563] bg-[#f9fafb] focus:outline-none cursor-not-allowed"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <span className="text-[12px] text-[#9ca3af] font-medium">Managed by Owner</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <label className="block text-[13px] font-semibold text-[#111827] mb-2">Account status</label>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#e6f4ea] rounded-lg">
          <div className="w-1.5 h-1.5 rounded-full bg-[#16a34a]"></div>
          <span className="text-[13px] font-semibold text-[#16a34a]">Active</span>
        </div>
      </div>

      <div className="mt-10 flex justify-end gap-3">
        <button className="px-6 py-2.5 bg-white border border-[#e5e7eb] rounded-xl text-[15px] font-semibold text-[#4b5563] hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">
          Cancel
        </button>
        <button className="px-6 py-2.5 bg-[#a3a3a3] rounded-xl text-[15px] font-semibold text-white cursor-pointer">
          Save changes
        </button>
      </div>
    </div>
  );
}
