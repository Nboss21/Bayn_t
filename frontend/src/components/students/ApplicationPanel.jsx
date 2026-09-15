import React from 'react';

function PanelRow({ label, value, valueClassName = '' }) {
  return (
    <div className="flex items-start justify-between py-2">
      <span className="text-[13px] text-[#6b7280]">{label}</span>
      <span className={`text-[13px] font-medium text-right ${valueClassName || 'text-[#111827]'}`}>
        {value}
      </span>
    </div>
  );
}

export default function ApplicationPanel({ application }) {
  return (
    <div className="mb-6">
      <h3 className="text-[15px] font-semibold text-[#111827] mb-3">Application</h3>
      <div className="space-y-0">
        <PanelRow label="Application" value={application.id} />
        <PanelRow label="Submitted" value={application.submitted} />
        <PanelRow
          label="Approval"
          value={application.approval}
          valueClassName="text-[#065f46]"
        />
        <PanelRow
          label="Payment"
          value={application.payment}
          valueClassName="text-[#065f46]"
        />
      </div>
    </div>
  );
}
