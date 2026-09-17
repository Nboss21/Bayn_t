import React from 'react';

export default function AccountStatusSection() {
  return (
    <div className="mb-8 border-t border-[#e5e7eb] pt-8">
      <h2 className="text-[17px] font-semibold text-[#111827]">Account status</h2>
      <p className="text-[14px] text-[#6b7280] mt-0.5 mb-6">Define initial sign-in capabilities upon record creation.</p>
      
      <div className="flex flex-col md:flex-row gap-4">
        {/* Active Option */}
        <label className="flex-1 relative block cursor-pointer">
          <input type="radio" name="account_status" value="active" className="peer sr-only" defaultChecked />
          <div className="h-full rounded-xl border-2 border-[#e5e7eb] p-5 hover:bg-[#f9fafb] peer-checked:border-[#111827] peer-checked:bg-[#fafaf9] transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-[#111827] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#111827]"></div>
                </div>
                <span className="font-semibold text-[#111827] text-sm">Active</span>
              </div>
              <span className="px-2.5 py-1 text-[11px] font-medium bg-[#dcfce7] text-[#166534] rounded-full">
                Immediate Access
              </span>
            </div>
            <p className="text-sm text-[#6b7280] ml-7">
              The staff member will receive an invitation email to activate access and set their password.
            </p>
          </div>
        </label>

        {/* Pending Option */}
        <label className="flex-1 relative block cursor-pointer">
          <input type="radio" name="account_status" value="pending" className="peer sr-only" />
          <div className="h-full rounded-xl border border-[#e5e7eb] p-5 hover:bg-[#f9fafb] peer-checked:border-[#111827] peer-checked:bg-[#fafaf9] transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border border-[#d1d5db] bg-white"></div>
                <span className="font-semibold text-[#111827] text-sm">Pending</span>
              </div>
              <span className="px-2.5 py-1 text-[11px] font-medium bg-[#fef3c7] text-[#92400e] rounded-full">
                Awaiting Approval
              </span>
            </div>
            <p className="text-sm text-[#6b7280] ml-7">
              Account remains dormant until manual activation by an administrator.
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}
