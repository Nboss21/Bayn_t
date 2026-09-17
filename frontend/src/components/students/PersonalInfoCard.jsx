import React from 'react';

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start py-2.5">
      <span className="text-[13px] text-[#6b7280] w-44 shrink-0">{label}</span>
      <span className="text-[14px] text-[#111827] font-medium">{value}</span>
    </div>
  );
}

export default function PersonalInfoCard({ student }) {
  return (
    <div className="bg-[#f9fafb] rounded-xl p-6 mb-4">
      <h2 className="text-[16px] font-semibold text-[#111827] mb-4">
        1. Personal Information
      </h2>
      <div className="space-y-0">
        <InfoRow label="Full name" value={student.fullName} />
        <InfoRow label="Email" value={student.email} />
        <InfoRow label="Phone" value={student.phone} />
        <InfoRow label="Date of birth" value={student.dateOfBirth} />
        <InfoRow label="Address" value={student.address} />
      </div>
    </div>
  );
}
