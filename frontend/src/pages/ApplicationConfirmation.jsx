import React, { useState } from 'react';
import { useApplication } from '../context/ApplicationContext';

const nextSteps = [
  {
    num: '01',
    title: 'Application received',
    desc: null,
    done: true
  },
  {
    num: '02',
    title: 'Registrar review',
    desc: 'The academy will review your application and documents.',
    done: false
  },
  {
    num: '03',
    title: 'Enrollment confirmation',
    desc: "You'll receive confirmation once approved.",
    done: false
  }
];

const ApplicationConfirmation = () => {
  const [copied, setCopied] = useState(false);
  const [appId] = useState(() => 'APP-' + Math.random().toString(36).substring(2, 7).toUpperCase() + '-LM');
  const { formData, getSelectedProgram } = useApplication();
  const program = getSelectedProgram();

  const handleCopy = () => {
    navigator.clipboard.writeText(appId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 py-8 flex justify-center">
      <div className="bg-white border border-gray-100 rounded-xl w-full max-w-[680px] px-5 sm:px-10 py-10 sm:py-14 flex flex-col items-center text-center shadow-[0_2px_20px_rgba(0,0,0,0.04)]">

        {/* Success Icon */}
        <div className="w-14 h-14 rounded-xl bg-[#eef1ed] flex items-center justify-center mb-8">
          <svg className="w-6 h-6 text-[#6b826d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-[40px] md:text-[46px] font-serif leading-tight text-[#111111] mb-4">
          Your application is in.
        </h1>
        <p className="text-[14px] text-gray-500 mb-12 leading-relaxed">
          Thank you for applying to Ethio Beauty Academy. We've received your application.
        </p>

        {/* Status Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14 text-left">

          {/* Application Status */}
          <div className="border border-gray-200 rounded-lg p-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
              APPLICATION STATUS
            </p>
            <div className="flex items-center space-x-2 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e6ca64] flex-shrink-0"></span>
              <span className="text-[15px] font-semibold text-[#111111]">Under Review</span>
            </div>
            <div className="h-[1px] bg-gray-100 mb-4"></div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              APPLICATION ID
            </p>
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-medium text-[#111111] tracking-wide">{appId}</span>
              <button
                onClick={handleCopy}
                title="Copy to clipboard"
                className="text-gray-400 hover:text-gray-600 transition"
              >
                {copied ? (
                  <svg className="w-4 h-4 text-[#6b826d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Payment Details */}
          <div className="border border-gray-200 rounded-lg p-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
              PAYMENT DETAILS
            </p>
            <div className="flex items-center space-x-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6b826d] flex-shrink-0"></span>
              <span className="text-[15px] font-semibold text-[#111111]">Successful</span>
            </div>
            <div className="h-[1px] bg-gray-100 mb-4"></div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-gray-500">Amount</span>
                <span className="text-[13px] font-medium text-[#111111]">15,000 ETB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-gray-500">Program</span>
                <span className="text-[13px] font-medium text-[#111111]">{program?.title || '—'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-gray-500">Payment Method</span>
                <span className="text-[13px] font-medium text-[#111111]">{formData.paymentMethod === 'primary' ? 'Telebirr' : 'Bank Transfer (CBE)'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="w-full">
          <p className="text-[10px] font-bold text-[#a87b52] tracking-[0.18em] uppercase mb-6">
            NEXT STEPS
          </p>

          {/* Steps connector line + dots */}
          <div className="relative hidden sm:flex items-center justify-center mb-4">
            <div className="absolute left-[16.5%] right-[16.5%] top-[5px] h-[1px] bg-gray-200"></div>
            <div className="relative z-10 flex justify-between w-[65%]">
              {nextSteps.map((step) => (
                <div key={step.num} className="flex flex-col items-center">
                  {step.done ? (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#111111]"></div>
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full border border-gray-300 bg-white"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Steps labels */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 text-center">
            {nextSteps.map((step) => (
              <div key={step.num} className="flex flex-col items-center px-2">
                <p className="text-[10px] text-gray-400 mb-1">{step.num}</p>
                <p className={`text-[13px] font-semibold leading-tight mb-1 ${step.done ? 'text-[#111111]' : 'text-[#111111]'}`}>
                  {step.title}
                </p>
                {step.desc && (
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    {step.desc}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ApplicationConfirmation;
