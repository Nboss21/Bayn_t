import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApplicationStepper from '../components/application/ApplicationStepper';

const ReviewStep = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="w-full max-w-[800px] mx-auto px-4 pb-16 flex flex-col items-center">
      <ApplicationStepper currentStep={5} />

      <div className="w-full mt-8">

        {/* Header */}
        <div className="mb-10">
          <p className="text-[#a87b52] text-[10px] font-bold tracking-[0.15em] uppercase mb-4">
            REVIEW
          </p>
          <h2 className="text-[32px] md:text-[38px] font-serif leading-[1.1] text-[#111111] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Make sure everything looks<br />right.
          </h2>
          <p className="text-[13px] text-gray-500">
            Review your information before moving to payment.
          </p>
        </div>

        <div className="h-[1px] bg-gray-200 w-full mb-10"></div>

        {/* Personal Information */}
        <div className="mb-10">
          <h3 className="text-[22px] font-serif text-[#111111] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Personal Information
          </h3>
          <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-4">
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                FULL NAME
              </p>
              <p className="text-[14px] text-[#111111]">[Insert Name]</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                DATE OF BIRTH
              </p>
              <p className="text-[14px] text-[#111111]">[Insert Birth]</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                LOCATION
              </p>
              <p className="text-[14px] text-[#111111]">[Insert Location]</p>
            </div>
          </div>
        </div>

        {/* Program & Intake */}
        <div className="bg-[#f2f5f2] rounded-md p-8 mb-10">
          <h3 className="text-[20px] font-serif text-[#111111] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Program & Intake
          </h3>
          <div className="mb-5">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
              SELECTED PROGRAM
            </p>
            <p className="text-[14px] text-[#111111]">[Insert Title]</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                INTAKE PERIOD
              </p>
              <p className="text-[14px] text-[#111111]">[Insert Period]</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                SCHEDULE
              </p>
              <p className="text-[14px] text-[#111111]">[Insert schedule]</p>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="mb-12">
          <h3 className="text-[22px] font-serif text-[#111111] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Documents
          </h3>

          <div className="flex items-center space-x-2 mb-4">
            <svg className="w-4 h-4 text-[#6b826d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
            </svg>
            <p className="text-[13px] text-gray-600">Required documents complete</p>
          </div>

          <div className="space-y-2">
            {['vance_e_portfolio_2024.pdf', 'vance_e_id_verification.pdf'].map((filename) => (
              <div key={filename} className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-[13px] text-gray-600">{filename}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[1px] bg-gray-200 w-full mb-8"></div>

        {/* Confirm Checkbox */}
        <div className="flex items-start space-x-3 mb-12">
          <div
            onClick={() => setAgreed(!agreed)}
            className={`w-4 h-4 mt-0.5 flex-shrink-0 border rounded-sm cursor-pointer transition-colors ${
              agreed ? 'bg-[#404c40] border-[#404c40]' : 'bg-white border-gray-400'
            }`}
          >
            {agreed && (
              <svg className="w-full h-full text-white p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <p className="text-[12px] text-gray-600 leading-relaxed cursor-pointer" onClick={() => setAgreed(!agreed)}>
            I confirm that the information I provided is accurate and I agree to the academy's application terms and privacy policy.
          </p>
        </div>

        {/* Bottom navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/application/documents')}
            className="border border-gray-400 bg-transparent text-[#111111] text-[12px] font-medium uppercase tracking-wider py-3 px-8 rounded-full hover:bg-gray-50 transition flex items-center"
          >
            <svg className="w-3.5 h-3.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          <button
            disabled={!agreed}
            onClick={() => navigate('/application/payment')}
            className={`text-[12px] font-medium uppercase tracking-wider py-3 px-8 rounded-full transition flex items-center shadow-sm ${
              agreed
                ? 'bg-[#e6ca64] hover:bg-[#d6b74e] text-[#111111] cursor-pointer'
                : 'bg-[#e6ca64]/50 text-[#111111]/50 cursor-not-allowed'
            }`}
          >
            Continue to Payment
            <svg className="w-3.5 h-3.5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReviewStep;
