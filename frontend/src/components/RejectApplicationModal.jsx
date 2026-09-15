import React from 'react';

export default function RejectApplicationModal({ applicant, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-[640px] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#fce8e8] flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-[#fca5a5]/30"></div>
              </div>
              <h2 className="text-[22px] font-semibold text-gray-900">Reject Application</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg p-1.5 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#e8ebe9] flex items-center justify-center text-[11px] font-medium text-gray-600">
              {applicant.initials}
            </div>
            <div className="text-[14px]">
              <span className="text-gray-900 font-medium">{applicant.name}</span>
              <span className="text-gray-400 mx-2">•</span>
              <span className="text-gray-500">Application #{applicant.id}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 text-[14px]">
            <span className="text-gray-600">Program:</span>
            <span className="text-gray-900">{applicant.program}</span>
            <span className="text-gray-400 mx-1">•</span>
            <span className={`px-2 py-0.5 rounded text-[12px] font-medium ${applicant.statusBadgeClass}`}>{applicant.statusBadgeLabel}</span>
          </div>

          <p className="mt-3 text-[14px] text-gray-500">
            Submitting this form will permanently reject the application and notify the applicant.
          </p>
        </div>

        <div className="w-full h-px bg-gray-100"></div>

        {/* Content */}
        <div className="px-6 py-5 overflow-y-auto">
          {/* Consequence Box */}
          <div className="bg-[#fff6f6] border border-[#fecaca] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[#fecaca] flex items-center justify-center">
              </div>
              <span className="text-[#dc2626] text-[11px] font-semibold tracking-wider uppercase">Consequence</span>
            </div>
            <p className="text-gray-900 text-[14px] font-medium mb-1">
              You are about to reject this application.
            </p>
            <p className="text-gray-600 text-[13px] leading-relaxed">
              The application will be marked as <span className="text-[#dc2626] font-medium">Rejected</span> and the decision will be recorded permanently in the application history. This action cannot be undone.
            </p>
          </div>

          {/* Reason Textarea */}
          <div className="mt-6">
            <div className="flex items-end justify-between mb-2">
              <label className="text-[14px] font-medium text-gray-900">
                Reason for rejection <span className="text-[#dc2626]">*</span>
              </label>
              <span className="text-[12px] text-gray-400">Required</span>
            </div>
            <textarea
              className="w-full border-2 border-gray-800 rounded-xl p-3.5 text-[14px] text-gray-900 focus:outline-none focus:ring-0 resize-none h-28"
              defaultValue="Application prerequisites for secondary education equivalence could not be verified, and applicant did not provide required documentation within the designated window."
            ></textarea>
            <p className="text-[12px] text-gray-400 mt-2">
              This reason will be recorded in the application history and is visible only to authorised staff.
            </p>
          </div>

          {/* Summary Box */}
          <div className="bg-[#f3f6f4] rounded-xl p-4 mt-6">
            <h4 className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-4">Summary</h4>
            
            <div className="space-y-2.5 text-[13px]">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Applicant</span>
                <span className="text-gray-900">Mekdes Tesfaye</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Program</span>
                <span className="text-gray-900">Professional Makeup Artistry</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Decision</span>
                <span className="text-[#dc2626]">Reject Application</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Status will change to</span>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#fef2f2] text-[#dc2626] rounded-full border border-[#fee2e2]">
                  <span className="w-1.5 h-1.5 bg-[#ef4444] rounded-full"></span>
                  <span className="font-medium text-[12px]">Rejected</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Reason</span>
                <span className="text-gray-900">Prerequisites verification unfulfilled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white flex justify-end gap-3 rounded-b-2xl mb-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-gray-300 rounded-lg text-[14px] font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            className="px-5 py-2.5 rounded-lg text-[14px] font-medium text-white bg-[#b91c1c] hover:bg-[#991b1b] transition-colors"
          >
            Reject Application
          </button>
        </div>
      </div>
    </div>
  );
}
