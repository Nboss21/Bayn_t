import React from 'react';

const notifications = [
  {
    id: 1,
    title: 'Payment received',
    description: 'Student registration fee processed #TX-90812',
    type: 'Payment',
    audience: 'Registrar',
    status: 'Sent',
    date: 'Sep 7, 2026',
    typeBadgeColor: 'bg-[#e0f2fe] text-[#0369a1]',
    statusBadgeColor: 'bg-[#dcfce7] text-[#166534]'
  },
  {
    id: 2,
    title: 'New staff account created',
    description: 'Instructor Claire Delacroix assigned to Atelier A',
    type: 'User access',
    audience: 'Super Admin',
    status: 'Sent',
    date: 'Sep 7, 2026',
    typeBadgeColor: 'bg-[#f3f4f6] text-[#374151]',
    statusBadgeColor: 'bg-[#dcfce7] text-[#166534]'
  },
  {
    id: 3,
    title: 'Application approved',
    description: 'Editorial Bridal Track candidate admitted',
    type: 'Application',
    audience: 'Registrar',
    status: 'Sent',
    date: 'Sep 7, 2026',
    typeBadgeColor: 'bg-[#dcfce7] text-[#166534]',
    statusBadgeColor: 'bg-[#dcfce7] text-[#166534]'
  },
  {
    id: 4,
    title: 'Class capacity updated',
    description: 'SFX Prosthetics Studio bumped to 18 seats',
    type: 'Class',
    audience: 'Teacher',
    status: 'Sent',
    date: 'Sep 7, 2026',
    typeBadgeColor: 'bg-[#f3f4f6] text-[#374151]',
    statusBadgeColor: 'bg-[#dcfce7] text-[#166534]'
  },
  {
    id: 5,
    title: 'Website content published',
    description: 'Autumn Atelier Masterclass syllabus live on portal',
    type: 'Content',
    audience: 'Super Admin',
    status: 'Sent',
    date: 'Sep 6, 2026',
    typeBadgeColor: 'bg-[#dcfce7] text-[#166534]',
    statusBadgeColor: 'bg-[#dcfce7] text-[#166534]'
  }
];

export default function NotificationsTable() {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden mb-8">
      {/* Table Header Section */}
      <div className="p-6 border-b border-[#e5e7eb]">
        <h2 className="text-lg font-bold text-[#111827]">Recent notifications</h2>
        <p className="text-sm text-[#6b7280]">Review recent system activity and important updates.</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#f9fafb] border-b border-[#e5e7eb]">
            <tr>
              <th className="px-6 py-3 text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider">
                NOTIFICATION
              </th>
              <th className="px-6 py-3 text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider">
                TYPE
              </th>
              <th className="px-6 py-3 text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider">
                AUDIENCE
              </th>
              <th className="px-6 py-3 text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider">
                STATUS
              </th>
              <th className="px-6 py-3 text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider">
                DATE
              </th>
              <th className="px-6 py-3 text-right">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5e7eb]">
            {notifications.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-[#111827]">{item.title}</p>
                  <p className="text-xs text-[#6b7280]">{item.description}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${item.typeBadgeColor}`}>
                    {item.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-[#4b5563]">{item.audience}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${item.statusBadgeColor}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-[#4b5563] whitespace-nowrap">{item.date}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="px-3 py-1 border border-[#e5e7eb] rounded text-sm font-medium text-[#374151] hover:bg-gray-50 transition-colors cursor-pointer">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-[#e5e7eb] flex items-center justify-between bg-[#fafaf9]">
        <span className="text-sm text-[#6b7280]">
          Showing <span className="font-medium">1-5</span> of <span className="font-medium">5</span> records
        </span>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-[#e5e7eb] rounded text-sm text-[#9ca3af] bg-white cursor-not-allowed">
            Previous
          </button>
          <button className="px-3 py-1.5 rounded text-sm font-medium bg-[#c3d3ba] text-[#111827] cursor-pointer">
            1
          </button>
          <button className="px-3 py-1.5 border border-[#e5e7eb] rounded text-sm font-medium text-[#374151] bg-white hover:bg-gray-50 transition-colors cursor-pointer">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
