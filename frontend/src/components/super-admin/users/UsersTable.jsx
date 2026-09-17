import React from 'react';

const users = [
  { id: '#USR-1092', initials: 'SE', name: 'Sandra Example', role: 'Registrar', email: 'sandra@example.com', status: 'Active', lastSignIn: 'Today', actionType: 'view', color: 'bg-[#e5e7eb]' },
  { id: '#USR-1088', initials: 'HE', name: 'Hana Example', role: 'Teacher', email: 'hana@example.com', status: 'Active', lastSignIn: 'Today', actionType: 'view', color: 'bg-[#bbf7d0]' },
  { id: '#USR-1001', initials: 'DE', name: 'Daniel Example', role: 'Super Admin', email: 'daniel@example.com', status: 'Active', lastSignIn: 'Yesterday', actionType: 'view', color: 'bg-[#e5e7eb]' },
  { id: '#USR-1074', initials: 'ME', name: 'Marta Example', role: 'Teacher', email: 'marta@example.com', status: 'Active', lastSignIn: 'Sep 5, 2026', actionType: 'view', color: 'bg-[#d9f99d]' },
  { id: '#USR-1094', initials: 'RE', name: 'Ruth Example', role: 'No role assigned', email: 'ruth@example.com', status: 'Pending', lastSignIn: 'Never', actionType: 'review', color: 'bg-[#fed7aa]' },
];

export default function UsersTable() {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
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
            {users.map((user, index) => (
              <tr key={index} className="hover:bg-[#f9fafb] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-[#374151] ${user.color}`}>
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
                  {user.actionType === 'view' ? (
                    <button className="px-4 py-1.5 bg-white border border-[#d1d5db] text-[#374151] text-sm font-medium rounded-lg hover:bg-[#f3f4f6] transition-colors shadow-sm cursor-pointer">
                      View
                    </button>
                  ) : (
                    <button className="px-4 py-1.5 bg-[#fffbeb] border border-[#fcd34d] text-[#b45309] text-sm font-medium rounded-lg hover:bg-[#fef3c7] transition-colors shadow-sm cursor-pointer">
                      Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-[#e5e7eb] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span className="text-sm text-[#6b7280]">Showing 1-5 of 24 users</span>
        <div className="flex items-center gap-1">
          <button className="px-3 py-1.5 border border-[#e5e7eb] text-[#9ca3af] text-sm font-medium rounded-lg bg-white cursor-not-allowed">
            Previous
          </button>
          <div className="flex items-center">
            <button className="w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg bg-[#111827] text-white cursor-pointer">1</button>
            <button className="w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg text-[#4b5563] hover:bg-[#f3f4f6] cursor-pointer">2</button>
            <button className="w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg text-[#4b5563] hover:bg-[#f3f4f6] cursor-pointer">3</button>
            <button className="w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg text-[#4b5563] hover:bg-[#f3f4f6] cursor-pointer">4</button>
            <button className="w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg text-[#4b5563] hover:bg-[#f3f4f6] cursor-pointer">5</button>
          </div>
          <button className="px-3 py-1.5 border border-[#e5e7eb] text-[#374151] text-sm font-medium rounded-lg bg-white hover:bg-[#f3f4f6] cursor-pointer">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
