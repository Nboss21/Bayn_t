import React from 'react';

export default function ApproveApplicationModal({ applicant, isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-[640px] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#e8edea]"></div>
            <h2 className="text-[22px] font-semibold text-gray-900">Approve Application</h2>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-[#f0f2f1] flex items-center justify-center text-[11px] font-medium text-gray-600">
              {applicant.initials}
            </div>
            <div className="text-[14px]">
              <span className="text-gray-900 font-medium">{applicant.name}</span>
              <span className="text-gray-400 mx-2">•</span>
              <span className="text-gray-500">Application #{applicant.id}</span>
            </div>
          </div>

          <p className="text-[14px] text-gray-500 leading-relaxed pr-8">
            Review the applicant's details and confirm approval. Approval moves the application to Class Assignment - no class is selected or student enrolled at this stage.
          </p>
        </div>

        <div className="w-full h-px bg-gray-100"></div>

        {/* Content */}
        <div className="px-6 py-5 overflow-y-auto max-h-[60vh]">

          {/* APPLICANT DETAILS */}
          <div className="mb-6">
            <h4 className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-3">Applicant Details</h4>
            <div className="border border-gray-200 rounded-xl overflow-hidden text-[13px]">
              <div className="flex justify-between items-center p-3 border-b border-gray-100">
                <span className="text-gray-500">Applicant</span>
                <span className="text-gray-900 font-medium">{applicant.name}</span>
              </div>
              <div className="flex justify-between items-center p-3 border-b border-gray-100">
                <span className="text-gray-500">Application ID</span>
                <span className="text-gray-900">{applicant.id}</span>
              </div>
              <div className="flex justify-between items-center p-3 border-b border-gray-100">
                <span className="text-gray-500">Program</span>
                <span className="text-gray-900">{applicant.program}</span>
              </div>
              <div className="flex justify-between items-center p-3 border-b border-gray-100">
                <span className="text-gray-500">Intake</span>
                <span className="text-gray-900">{applicant.intake}</span>
              </div>
              <div className="flex justify-between items-center p-3">
                <span className="text-gray-500">Current Status</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[12px] font-medium ${applicant.statusBadgeClass}`}>
                  {applicant.statusBadgeLabel}
                </span>
              </div>
            </div>
          </div>

          {/* APPLICATION READINESS */}
          <div className="mb-6">
            <h4 className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-3">Application Readiness</h4>
            <div className="space-y-2">
              <div className="bg-[#f4f7f5] border border-[#cbdcca] rounded-lg p-3 flex gap-3 items-start">
                <div className="w-5 h-5 mt-0.5 rounded-full bg-[#cbdcca] flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#82a584]"></div>
                </div>
                <div>
                  <h5 className="text-[13px] font-medium text-gray-900 mb-0.5">Application complete</h5>
                  <p className="text-[12px] text-gray-500">All required documents submitted. Eligibility confirmed.</p>
                </div>
              </div>

              <div className="bg-[#f4f7f5] border border-[#cbdcca] rounded-lg p-3 flex gap-3 items-start">
                <div className="w-5 h-5 mt-0.5 rounded-full bg-[#cbdcca] flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#82a584]"></div>
                </div>
                <div>
                  <h5 className="text-[13px] font-medium text-gray-900 mb-0.5">Payment confirmed - {applicant.paymentBadge}</h5>
                  <p className="text-[12px] text-gray-500">{applicant.paymentAmount} • Ref: {applicant.paymentRef}</p>
                </div>
              </div>

              <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-lg p-3 flex gap-3 items-start">
                <div className="w-5 h-5 mt-0.5 rounded-md bg-white border border-gray-200 shrink-0"></div>
                <div>
                  <h5 className="text-[13px] font-medium text-gray-900 mb-0.5">Approval moves this application to Class Assignment.</h5>
                  <p className="text-[12px] text-gray-500">No class is selected and the student is not enrolled at this stage. A registrar will assign the cohort and bench seat separately.</p>
                </div>
              </div>
            </div>
          </div>

          {/* DECISION SUMMARY */}
          <div>
            <h4 className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-3">Decision Summary</h4>
            <div className="space-y-3 text-[13px]">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Applicant</span>
                <span className="text-gray-900 font-medium">{applicant.name}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500">Program</span>
                <span className="text-gray-900">{applicant.program}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500">Decision</span>
                <span className="text-[#3f5c43] font-medium">Approve Application</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500">Status will change to</span>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#ecfdf5] text-[#15803d] rounded-full border border-[#a7f3d0]">
                  <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full"></span>
                  <span className="font-medium text-[12px]">Approved → Awaiting Class Assignment</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white flex justify-end gap-3 rounded-b-2xl border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-gray-300 rounded-lg text-[14px] font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-lg text-[14px] font-medium text-[#2d412e] bg-[#b7c9b8] hover:bg-[#a3b8a6] transition-colors"
          >
            Approve Application
          </button>
        </div>
      </div>
    </div>
  );
}