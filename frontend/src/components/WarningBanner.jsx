import { AlertTriangle } from 'lucide-react';

export default function WarningBanner() {
  return (
    <div className="bg-[#fffbeb] border border-[#fde68a] rounded-xl p-4 flex items-center gap-3 mb-6">
      <AlertTriangle className="w-5 h-5 text-[#d97706]" strokeWidth={2} />
      <p className="text-[14px] text-[#92400e] font-medium">
        This application is awaiting your review. Please approve, request more information, or reject below. Once confirmed, the applicant will be notified immediately.
      </p>
    </div>
  );
}
