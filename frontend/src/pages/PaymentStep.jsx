import React from 'react';
import { useNavigate } from 'react-router-dom';
import ApplicationStepper from '../components/application/ApplicationStepper';
import { useApplication } from '../context/ApplicationContext';

const paymentMethods = [
  { id: 'primary', label: 'Telebirr' },
  { id: 'alternative', label: 'Bank Transfer (CBE)' }
];

const PaymentStep = () => {
  const navigate = useNavigate();
  const { formData, updateField, getSelectedProgram, completeStep } = useApplication();
  const program = getSelectedProgram();

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 pb-16">
      <ApplicationStepper currentStep={6} />

      <div className="flex flex-col md:flex-row gap-12 lg:gap-16 mt-6">

        {/* Left: Payment form */}
        <div className="flex-1">
          <h2 className="text-[36px] md:text-[42px] font-serif leading-[1.1] text-[#111111] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Complete your payment.
          </h2>
          <p className="text-[13px] text-gray-500 mb-10 leading-relaxed">
            Your application is ready. Review the payment details below and continue securely.
          </p>

          <h3 className="text-[20px] font-serif text-[#111111] mb-5" style={{ fontFamily: 'Georgia, serif' }}>
            How would you like to pay?
          </h3>

          {/* Payment method options */}
          <div className="space-y-3 mb-8">
            {paymentMethods.map((method) => {
              const isSelected = formData.paymentMethod === method.id;
              return (
                <div
                  key={method.id}
                  onClick={() => updateField('paymentMethod', method.id)}
                  className={`flex items-center p-4 border rounded-sm cursor-pointer transition-colors ${
                    isSelected
                      ? 'border-gray-400 bg-white'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="mr-4 flex-shrink-0">
                    {isSelected ? (
                      <div className="w-4 h-4 rounded-full border-[4px] border-[#111111] bg-white"></div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-gray-300 bg-white"></div>
                    )}
                  </div>
                  <span className="text-[14px] text-gray-700">{method.label}</span>
                </div>
              );
            })}
          </div>

          {/* Security note */}
          <div className="flex items-center space-x-2 bg-[#f5f5f3] px-4 py-3 rounded-sm mb-12">
            <svg className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className="text-[11px] text-gray-500">
              Your payment will be securely processed through the academy's selected payment gateway.
            </p>
          </div>

          <div className="h-[1px] bg-gray-200 mb-8"></div>

          {/* Action buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => { completeStep('payment'); navigate('/application/confirmation'); }}
              className="bg-[#c9a227] hover:bg-[#b8911f] text-white text-[12px] font-bold uppercase tracking-wider py-4 px-8 rounded-sm transition"
            >
              Pay 15,000 ETB
            </button>
            <button
              onClick={() => navigate('/application/review')}
              className="border border-gray-300 bg-transparent text-[#111111] text-[12px] font-medium uppercase tracking-wider py-4 px-8 rounded-sm hover:bg-gray-50 transition"
            >
              Back
            </button>
          </div>
        </div>

        {/* Right: Application Summary */}
        <div className="md:w-[300px] flex-shrink-0">
          <div className="bg-[#f2f4f0] rounded-md p-8">
            <h3 className="text-[22px] font-serif text-[#111111] mb-8" style={{ fontFamily: 'Georgia, serif' }}>
              Application Summary
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-start">
                <p className="text-[12px] text-gray-500 leading-relaxed">Selected Program:</p>
                <p className="text-[12px] text-[#111111] text-right ml-4">{program?.title || '—'}</p>
              </div>
              <div className="flex justify-between items-start">
                <p className="text-[12px] text-gray-500">Location:</p>
                <p className="text-[12px] text-[#111111] text-right ml-4">{formData.city}{formData.area ? `, ${formData.area}` : ''}</p>
              </div>
            </div>

            <div className="h-[1px] bg-gray-300 mb-6"></div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  TOTAL TO PAY
                </p>
              </div>
              <p className="text-[36px] font-serif text-[#111111] leading-none text-right" style={{ fontFamily: 'Georgia, serif' }}>
                15,000<br />ETB
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentStep;
