import { Info } from 'lucide-react';
import SectionCard from './SectionCard';

const NOTES = {
  'Needs Review': 'All required application information has been submitted. Registrar review is still required before confirmation.',
  'Awaiting Information': 'The registrar has requested additional information from the applicant. Review will resume once the candidate responds.',
  Approved: 'The application has been approved. The next step is assigning the applicant to a class and bench seat.',
  Rejected: 'The application has been rejected. The decision and reason are recorded in the application history.',
};

export default function ApplicationStatus({ applicant }) {
  const badge = (
    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${applicant.statusBadgeClass}`}>
      {applicant.statusBadgeLabel}
    </span>
  );

  return (
    <SectionCard title="Application Status" rightContent={badge} className="mb-6">
      <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-lg p-4 flex gap-3">
        <Info className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" strokeWidth={2} />
        <p className="text-[13px] text-gray-600 leading-relaxed">
          {NOTES[applicant.status] || NOTES['Needs Review']}
        </p>
      </div>
    </SectionCard>
  );
}