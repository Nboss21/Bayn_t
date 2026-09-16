import { AlertTriangle, CheckCircle2, HelpCircle } from 'lucide-react';

const CONFIG = {
  'Needs Review': {
    style: 'bg-[#fffbeb] border-[#fde68a]',
    icon: <AlertTriangle className="w-5 h-5 text-[#d97706]" strokeWidth={2} />,
    text: 'text-[#92400e]',
    message: 'This application is awaiting your review. Please approve, request more information, or reject below. Once confirmed, the applicant will be notified immediately.',
  },
  'Awaiting Information': {
    style: 'bg-[#eff6ff] border-[#bfdbfe]',
    icon: <HelpCircle className="w-5 h-5 text-[#2563eb]" strokeWidth={2} />,
    text: 'text-[#1e40af]',
    message: 'Information has been requested from the applicant. The review will resume once the candidate responds.',
  },
  Approved: {
    style: 'bg-[#f0fdf4] border-[#bbf7d0]',
    icon: <CheckCircle2 className="w-5 h-5 text-[#15803d]" strokeWidth={2} />,
    text: 'text-[#166534]',
    message: 'This application has been approved and moved to Class Assignment. No class is selected or student enrolled yet.',
  },
  Rejected: {
    style: 'bg-[#fef2f2] border-[#fecaca]',
    icon: <AlertTriangle className="w-5 h-5 text-[#dc2626]" strokeWidth={2} />,
    text: 'text-[#991b1b]',
    message: 'This application has been rejected. The decision and reason are recorded in the application history.',
  },
};

export default function WarningBanner({ applicant }) {
  const config = CONFIG[applicant?.status] || CONFIG['Needs Review'];

  return (
    <div className={`${config.style} border rounded-xl p-4 flex items-center gap-3 mb-6`}>
      {config.icon}
      <p className={`text-[14px] font-medium ${config.text}`}>{config.message}</p>
    </div>
  );
}