import React from 'react';
import AuditLogHeader from '../../components/super-admin/audit-log/AuditLogHeader';
import AuditLogFilters from '../../components/super-admin/audit-log/AuditLogFilters';
import AuditLogTable from '../../components/super-admin/audit-log/AuditLogTable';

export default function SuperAdminAuditLog() {
  return (
    <div className="max-w-[1200px] w-full mx-auto pb-8">
      <AuditLogHeader />
      <AuditLogFilters />
      <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm flex flex-col mb-4">
        <AuditLogTable />
      </div>
      <div className="text-[13px] text-[#9ca3af]">
        Last verified: Today, 10:42 AM by Daniel
      </div>
    </div>
  );
}
