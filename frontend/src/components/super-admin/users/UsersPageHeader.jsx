import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function UsersPageHeader({ title = 'Users', description = '', activeCount = 0, activeLabel = 'active accounts', addUserPath = '/super-admin/users/add' }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between mb-6">
      <div>
        <h1 className="text-[32px] leading-10 font-semibold text-[#111827]">{title}</h1>
        <p className="text-sm text-[#6b7280] mt-1">{description}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="px-4 py-2 bg-[#f3f4f6] text-[#4b5563] text-sm font-medium rounded-full border border-[#e5e7eb]">
          {activeCount} {activeLabel}
        </span>
        <button
          onClick={() => navigate(addUserPath)}
          className="px-4 py-2 bg-[#111827] text-white text-sm font-medium rounded-lg hover:bg-black transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span>+ Add User</span>
        </button>
      </div>
    </div>
  );
}