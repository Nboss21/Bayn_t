import React from 'react';

function PanelRow({ label, value }) {
  return (
    <div className="flex items-start justify-between py-2">
      <span className="text-[13px] text-[#6b7280]">{label}</span>
      <span className="text-[13px] text-[#111827] font-medium text-right">{value}</span>
    </div>
  );
}

export default function ClassPanel({ classInfo }) {
  return (
    <div className="mb-6">
      <h3 className="text-[15px] font-semibold text-[#111827] mb-3">Class</h3>
      <div className="space-y-0">
        <PanelRow label="Class" value={classInfo.name} />
        <PanelRow label="Instructor" value={classInfo.instructor} />
        <PanelRow label="Schedule" value={classInfo.schedule} />
      </div>
    </div>
  );
}
