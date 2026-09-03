import React from 'react';

const steps = [
  { num: '01', label: 'PROGRAM' },
  { num: '02', label: 'ABOUT YOU' },
  { num: '03', label: 'EXPERIENCE' },
  { num: '04', label: 'IDENTITY' },
  { num: '05', label: 'REVIEW' },
  { num: '06', label: 'COMPLETE' }
];

const ApplicationStepper = ({ currentStep = 1 }) => {
  return (
    <div className="w-full max-w-[800px] mx-auto mb-16 pt-8">
      <div className="relative flex items-center justify-between w-full">
        {/* Background Line */}
        <div className="absolute left-[5%] right-[5%] top-[14px] h-[1px] bg-gray-200 -z-10"></div>
        
        {steps.map((step) => {
          const stepNumber = parseInt(step.num, 10);
          const isActive = stepNumber === currentStep;
          const isPast = stepNumber < currentStep;

          let circleClasses = "bg-white text-gray-400 border border-gray-300";
          if (isActive) {
            circleClasses = "bg-[#404c40] text-white border border-[#404c40]";
          } else if (isPast) {
            circleClasses = "bg-white text-[#404c40] border border-[#404c40]";
          }

          return (
            <div key={step.num} className="flex flex-col items-center">
              <div 
                className={`w-[28px] h-[28px] rounded-full flex items-center justify-center text-[11px] font-medium transition-colors ${circleClasses}`}
              >
                {step.num}
              </div>
              <span 
                className={`text-[9px] uppercase tracking-widest mt-3 font-semibold ${
                  isActive || isPast ? 'text-[#111111]' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationStepper;
