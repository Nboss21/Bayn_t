import SectionCard from './SectionCard';

export default function PaymentDetails({ applicant }) {
  const badge = (
    <span className={`border px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${applicant.paymentBadgeClass} border-current`}>
      {applicant.paymentBadge}
    </span>
  );

  return (
    <SectionCard title="Payment" rightContent={badge} className="mb-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center pb-4 border-b border-[#f3f4f6]">
          <span className="text-[13px] text-gray-500">Status</span>
          <span className="text-[13px] font-medium text-[#1a1a1a]">{applicant.paymentStatus}</span>
        </div>
        <div className="flex justify-between items-center pb-4 border-b border-[#f3f4f6]">
          <span className="text-[13px] text-gray-500">Payment amount</span>
          <span className="text-[13px] text-[#1a1a1a]">{applicant.paymentAmount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[13px] text-gray-500">Transaction ref.</span>
          <span className="text-[13px] text-[#1a1a1a]">{applicant.paymentRef}</span>
        </div>
      </div>
    </SectionCard>
  );
}

