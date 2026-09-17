import React from 'react';

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start py-2.5">
      <span className="text-[13px] text-[#6b7280] w-44 shrink-0">{label}</span>
      <span className="text-[14px] text-[#111827] font-medium">{value}</span>
    </div>
  );
}

export default function EducationExperienceCard({ student }) {
  return (
    <div className="bg-[#f9fafb] rounded-xl p-6 mb-4">
      <h2 className="text-[16px] font-semibold text-[#111827] mb-4">
        2. Education &amp; Experience
      </h2>
      <div className="space-y-0">
        <InfoRow label="Educational background" value={student.educationalBackground} />
        <InfoRow label="Makeup experience" value={student.makeupExperience} />
        <InfoRow label="Previous training" value={student.previousTraining} />
        <InfoRow label="Relevant experience" value={student.relevantExperience} />
      </div>
    </div>
  );
}
