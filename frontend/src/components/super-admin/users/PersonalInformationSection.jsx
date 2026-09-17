import React from 'react';

export default function PersonalInformationSection() {
  return (
    <div className="mb-8">
      <h2 className="text-[17px] font-semibold text-[#111827]">Personal information</h2>
      <p className="text-[14px] text-[#6b7280] mt-0.5 mb-6">Primary identity information and contact details for staff communications.</p>
      
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-[#111827] mb-1.5">
            Full name <span className="text-[#dc2626]">*</span>
          </label>
          <input
            type="text"
            className="w-full px-3 py-2.5 border border-[#d1d5db] rounded-lg text-sm placeholder-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5]"
            placeholder="Enter full name"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-[#111827] mb-1.5">
            Email address <span className="text-[#dc2626]">*</span>
          </label>
          <input
            type="email"
            className="w-full px-3 py-2.5 border border-[#d1d5db] rounded-lg text-sm placeholder-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5]"
            placeholder="Enter email address"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-[#111827] mb-1.5">
          Phone number <span className="text-[#6b7280] font-normal">(Optional)</span>
        </label>
        <input
          type="text"
          className="w-full px-3 py-2.5 border border-[#d1d5db] rounded-lg text-sm placeholder-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#c1d0b5] focus:border-[#c1d0b5]"
          placeholder="Enter phone number (e.g. +44 20 7946 0912)"
        />
      </div>
    </div>
  );
}
