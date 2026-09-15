import React from 'react';

export default function PasswordSecurityCard() {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[#111827] mb-6">Password & Security</h2>
      
      <div className="mb-6">
        <label className="block text-sm text-[#4b5563] mb-2">Password</label>
        <div className="bg-[#f4f7f4] border border-[#e5e7eb] rounded-lg px-4 py-3 flex items-center">
          <span className="text-[#111827] font-bold tracking-widest leading-none mt-1">.............</span>
        </div>
      </div>
      
      <div className="mb-4">
        <button className="text-sm font-medium text-[#111827] underline underline-offset-2 hover:text-[#374151]">
          Change password
        </button>
      </div>
      
      <p className="text-sm text-[#9ca3af]">
        Must be at least 8 characters and include a combination of letters and numbers.
      </p>
    </div>
  );
}
