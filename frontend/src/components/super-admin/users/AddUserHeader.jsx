import React from 'react';
import { ArrowLeft, Flag, LayoutTemplate } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AddUserHeader() {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <button 
        onClick={() => navigate('/super-admin/users')}
        className="flex items-center text-sm font-medium text-[#6b7280] hover:text-[#111827] transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1.5" />
        Back to Users
      </button>
      
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-[32px] leading-10 font-semibold text-[#111827]">Add User</h1>
          <p className="text-[15px] text-[#6b7280] mt-1">Create a staff account and assign their HOB role.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-[#e5e7eb] text-[#374151] text-sm font-medium rounded-lg hover:bg-[#f9fafb] transition-colors flex items-center gap-2 cursor-pointer">
            <Flag className="w-4 h-4 text-[#9ca3af]" />
            Simulate Error
          </button>
          <button className="px-4 py-2 bg-white border border-[#e5e7eb] text-[#374151] text-sm font-medium rounded-lg hover:bg-[#f9fafb] transition-colors flex items-center gap-2 cursor-pointer">
            <LayoutTemplate className="w-4 h-4 text-[#9ca3af]" />
            Unsaved Modal
          </button>
        </div>
      </div>
    </div>
  );
}
