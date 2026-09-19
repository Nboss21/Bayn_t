import React from 'react';

export default function StudentSummaryCard({ application = {} }) {
  const name = application.applicant_name || 'Unnamed applicant';
  const initials = name.split(' ').filter(Boolean).map((part) => part[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div className="border border-[#e5e7eb] rounded-2xl overflow-hidden mb-6 mt-6">
      <div className="px-6 pt-6 pb-5 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#e5e7eb] flex items-center justify-center text-[15px] font-semibold text-[#4b5563] flex-shrink-0">{initials}</div>
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <h2 className="text-xl font-semibold text-[#111827]">{name}</h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]">Approved</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#6b7280] flex-wrap">
              <span>Application ID: <span className="font-medium text-[#374151]">{application.reference_number || application.id}</span></span>
              <span className="text-[#d1d5db]">·</span>
              <span>Program: <span className="font-medium text-[#374151]">{application.program?.name || '—'}</span></span>
              <span className="text-[#d1d5db]">·</span>
              <span>Intake: <span className="font-medium text-[#374151]">{application.intake?.name || '—'}</span></span>
            </div>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="flex items-center justify-end gap-1.5 text-sm text-[#374151] mb-1"><span className="w-2 h-2 rounded-full bg-[#22c55e] flex-shrink-0" /><span className="font-medium">Ready for Class Assignment</span></div>
          <p className="text-xs text-[#9ca3af]">Application approved</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 py-4 border-t border-[#f3f4f6] bg-white">
        <div><p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-1">EMAIL</p><p className="text-sm text-[#111827]">{application.applicant_email || '—'}</p></div>
        <div><p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-1">PHONE</p><p className="text-sm text-[#111827]">{application.applicant_phone || '—'}</p></div>
        <div><p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-1">APPLICATION DATE</p><p className="text-sm text-[#111827]">{application.created_at ? new Date(application.created_at).toLocaleDateString() : '—'}</p></div>
      </div>
    </div>
  );
}
