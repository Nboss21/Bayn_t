import React from 'react';
import AuditLogPagination from './AuditLogPagination';

const logs = [
  {
    id: 1,
    datetime: 'Sep 7, 2026, 10:42 AM',
    user: { name: 'Daniel Example', initials: 'DE', color: 'bg-[#111827]' },
    action: { label: 'Updated', type: 'updated' },
    area: 'Programs',
    resource: 'Professional Makeup Artistry',
    details: 'Program details updated'
  },
  {
    id: 2,
    datetime: 'Sep 7, 2026, 10:18 AM',
    user: { name: 'Sandra Example', initials: 'SE', color: 'bg-[#4b5563]' },
    action: { label: 'Approved', type: 'approved' },
    area: 'Applications',
    resource: 'HOB-ST-2026-0035',
    details: 'Application status changed to Approved'
  },
  {
    id: 3,
    datetime: 'Sep 7, 2026, 9:46 AM',
    user: { name: 'Daniel Example', initials: 'DE', color: 'bg-[#111827]' },
    action: { label: 'Updated', type: 'updated' },
    area: 'Roles & Permissions',
    resource: 'Teacher',
    details: 'Role permissions were updated'
  },
  {
    id: 4,
    datetime: 'Sep 7, 2026, 9:20 AM',
    user: { name: 'Hana Example', initials: 'HE', color: 'bg-[#92400e]' },
    action: { label: 'Updated', type: 'updated' },
    area: 'Classes & Intakes',
    resource: 'PMA Morning',
    details: 'Class capacity was updated'
  },
  {
    id: 5,
    datetime: 'Sep 6, 2026, 4:12 PM',
    user: { name: 'Daniel Example', initials: 'DE', color: 'bg-[#111827]' },
    action: { label: 'Created', type: 'created' },
    area: 'Users',
    resource: 'Ruth Example',
    details: 'Student account was created'
  },
  {
    id: 6,
    datetime: 'Sep 6, 2026, 2:35 PM',
    user: { name: 'Daniel Example', initials: 'DE', color: 'bg-[#111827]' },
    action: { label: 'Published', type: 'published' },
    area: 'Content',
    resource: 'Gallery',
    details: 'Gallery content was published'
  },
];

const getActionStyles = (type) => {
  switch (type) {
    case 'updated':
      return 'bg-[#f3f4f6] text-[#4b5563]';
    case 'approved':
      return 'bg-[#dcfce7] text-[#166534]';
    case 'created':
      return 'bg-[#e0f2fe] text-[#0369a1]';
    case 'published':
      return 'bg-[#dcfce7] text-[#166534]';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function AuditLogTable() {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="border-b border-[#e5e7eb] bg-white">
              <th className="px-6 py-4 text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">DATE & TIME</th>
              <th className="px-6 py-4 text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">USER</th>
              <th className="px-6 py-4 text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">ACTION</th>
              <th className="px-6 py-4 text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">AREA</th>
              <th className="px-6 py-4 text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">RESOURCE</th>
              <th className="px-6 py-4 text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">DETAILS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5e7eb] bg-white">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-6 text-[13px] text-[#6b7280] font-mono whitespace-nowrap">
                  {log.datetime}
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${log.user.color}`}>
                      {log.user.initials}
                    </div>
                    <span className="text-[14px] font-medium text-[#111827]">{log.user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <span className={`inline-flex items-center justify-center px-2.5 py-1 text-[13px] font-medium rounded-md ${getActionStyles(log.action.type)}`}>
                    {log.action.label}
                  </span>
                </td>
                <td className="px-6 py-6 text-[14px] text-[#4b5563]">
                  {log.area}
                </td>
                <td className="px-6 py-6 text-[14px] font-medium text-[#111827]">
                  {log.resource}
                </td>
                <td className="px-6 py-6 text-[14px] text-[#6b7280] truncate max-w-[200px]" title={log.details}>
                  {log.details.length > 20 ? log.details.substring(0, 20) + '...' : log.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AuditLogPagination />
    </div>
  );
}
