import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import useSuperAdminUsers from '../../hooks/useSuperAdminUsers';

export default function SuperAdminUserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usersModel, loading } = useSuperAdminUsers();

  if (loading || !usersModel) {
    return (
      <div className="w-full">
        <div className="h-6 w-32 bg-gray-100 rounded mb-6 animate-pulse"></div>
        <div className="h-48 bg-gray-100 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  const user = usersModel.findById(id);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20">
        <p className="text-[16px] text-[#6b7280] mb-4">User not found</p>
        <button
          onClick={() => navigate('/super-admin/users')}
          className="px-4 py-2 text-[13px] font-medium text-[#374151] bg-white border border-[#d1d5db] rounded-lg hover:bg-[#f9fafb] transition-colors cursor-pointer"
        >
          Back to Users
        </button>
      </div>
    );
  }

  const isPending = user.status === 'Pending';

  return (
    <div className="w-full pb-12">
      <button
        onClick={() => navigate('/super-admin/users')}
        className="flex items-center gap-2 text-sm font-medium text-[#6b7280] hover:text-[#111827] transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Users
      </button>

      <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
        <div className="bg-[#f9fafb] border-b border-[#e5e7eb] px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#e5e7eb] flex items-center justify-center text-xl font-semibold text-[#374151]">
              {user.initials}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-[#111827]">{user.name}</h1>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                  user.status === 'Active' ? 'bg-[#def7ec] text-[#03543f]' : 'bg-[#fef3c7] text-[#92400e]'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-[#059669]' : 'bg-[#d97706]'}`}></span>
                  {user.status}
                </span>
              </div>
              <p className="text-sm text-[#6b7280] mt-1">{user.role}</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/super-admin/users')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
              isPending
                ? 'bg-[#fffbeb] border border-[#fcd34d] text-[#b45309] hover:bg-[#fef3c7]'
                : 'bg-[#111827] text-white hover:bg-black'
            }`}
          >
            {isPending ? 'Review & Assign Role' : 'Back to Users'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e5e7eb]">
          <div className="bg-white px-8 py-5">
            <div className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider mb-1">User ID</div>
            <div className="text-[15px] font-medium text-[#111827]">{user.id}</div>
          </div>
          <div className="bg-white px-8 py-5">
            <div className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider mb-1">Email</div>
            <div className="text-[15px] font-medium text-[#111827] flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#9ca3af]" />
              {user.email}
            </div>
          </div>
          <div className="bg-white px-8 py-5">
            <div className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider mb-1">Last sign-in</div>
            <div className="text-[15px] font-medium text-[#111827]">{user.lastSignIn}</div>
          </div>
        </div>
      </div>
    </div>
  );
}