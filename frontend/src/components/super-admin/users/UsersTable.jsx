import React from 'react';
import { Trash2 } from 'lucide-react';

const AVATAR_COLORS = [
  'bg-[#e5e7eb]',
  'bg-[#bbf7d0]',
  'bg-[#d9f99d]',
  'bg-[#fed7aa]',
  'bg-[#bae6fd]',
  'bg-[#e9d5ff]',
  'bg-[#fecdd3]',
];

function getAvatarColor(index) {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

export default function UsersTable({ rows = [], onView, onReview, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#e5e7eb] text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider">
              <th className="px-6 py-4 font-medium">USER</th>
              <th className="px-6 py-4 font-medium">ROLE</th>
              <th className="px-6 py-4 font-medium">EMAIL</th>
              <th className="px-6 py-4 font-medium">STATUS</th>
              <th className="px-6 py-4 font-medium">LAST SIGN-IN</th>
              <th className="px-6 py-4 font-medium text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5e7eb]">
            {rows.map((user, index) => (
              <tr key={user.id} className="hover:bg-[#f9fafb] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-[#374151] ${getAvatarColor(index)}`}>
                      {user.initials}
                    </div>
                    <div>
                      <div className="font-medium text-[#111827] text-[15px]">{user.name}</div>
                      <div className="text-[13px] text-[#9ca3af] mt-0.5">ID: {user.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[15px] font-medium ${user.role === 'No role assigned' ? 'text-[#b45309]' : 'text-[#374151]'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[15px] text-[#6b7280]">{user.email}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                    user.status === 'Active' ? 'bg-[#def7ec] text-[#03543f]' : 'bg-[#fef3c7] text-[#92400e]'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-[#059669]' : 'bg-[#d97706]'}`}></span>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[15px] text-[#6b7280]">{user.lastSignIn}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                  {user.actionType === 'view' ? (
                    <button
                      onClick={() => onView && onView(user)}
                      className="px-4 py-1.5 bg-white border border-[#d1d5db] text-[#374151] text-sm font-medium rounded-lg hover:bg-[#f3f4f6] transition-colors shadow-sm cursor-pointer"
                    >
                      View
                    </button>
                  ) : (
                    <button
                      onClick={() => onReview && onReview(user)}
                      className="px-4 py-1.5 bg-[#fffbeb] border border-[#fcd34d] text-[#b45309] text-sm font-medium rounded-lg hover:bg-[#fef3c7] transition-colors shadow-sm cursor-pointer"
                    >
                      Review
                    </button>
                  )}
                  <button onClick={() => onDelete && onDelete(user)} title="Delete user" className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-16 text-center">
                  <p className="text-[15px] font-medium text-[#111827] mb-1">No users found</p>
                  <p className="text-[13px] text-[#6b7280]">Try adjusting your search or filter selection.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
    </div>
  );
}
