import { Check } from 'lucide-react';

export default function ApplicantHeader({ applicant, onRequestInfo, onReject, onApprove }) {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl p-6 mb-6">
      <div className="flex justify-between items-start mb-8">
        <div className="flex gap-4">
          <div className="w-14 h-14 rounded-full bg-[#f3f4f6] border border-[#e5e7eb] flex items-center justify-center text-[20px] font-medium text-[#4b5563] shrink-0">
            {applicant.initials}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-[22px] font-semibold text-[#1a1a1a]">{applicant.name}</h1>
              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${applicant.statusBadgeClass}`}>
                {applicant.statusBadgeLabel}
              </span>
            </div>
            <div className="flex items-center text-[13px] text-gray-500 gap-2">
              <span>ID: <span className="text-[#1a1a1a]">{applicant.id}</span></span>
              <span className="text-gray-300">•</span>
              <span>Program: <span className="text-[#1a1a1a]">{applicant.program}</span></span>
              <span className="text-gray-300">•</span>
              <span>Intake: <span className="text-[#1a1a1a]">{applicant.intake}</span></span>
            </div>
          </div>
        </div>

        {applicant.isDecisionable() && (
          <div className="flex items-center gap-3">
            <button onClick={onReject} className="px-4 py-2 border border-[#fecaca] text-[#dc2626] bg-[#fef2f2] hover:bg-[#fee2e2] rounded-lg text-[14px] font-medium transition-colors">
              Reject
            </button>
            <button onClick={onRequestInfo} className="px-4 py-2 border border-[#e5e7eb] text-gray-700 bg-white hover:bg-gray-50 rounded-lg text-[14px] font-medium transition-colors">
              Request Info
            </button>
            <button onClick={onApprove} className="px-4 py-2 border border-transparent text-white bg-[#1a1a1a] hover:bg-black rounded-lg text-[14px] font-medium flex items-center gap-2 transition-colors">
              <Check className="w-4 h-4" strokeWidth={3} />
              Approve Application
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-6 pt-6 border-t border-[#f3f4f6]">
        <div>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</p>
          <p className="text-[14px] text-[#1a1a1a]">{applicant.email}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Phone</p>
          <p className="text-[14px] text-[#1a1a1a]">{applicant.phone}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Application Date</p>
          <p className="text-[14px] text-[#1a1a1a]">{applicant.applicationDate}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Payment</p>
          <span className={`inline-block text-[12px] font-medium px-2 py-0.5 rounded ${applicant.paymentBadgeClass}`}>
            {applicant.payment}
          </span>
        </div>
      </div>
    </div>
  );
}