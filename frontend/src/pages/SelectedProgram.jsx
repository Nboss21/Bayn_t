import React from 'react';
import { useNavigate } from 'react-router-dom';
import ApplicationStepper from '../components/application/ApplicationStepper';

const SelectedProgram = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 pb-16 flex flex-col items-center">
      <ApplicationStepper currentStep={1} />
      
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-[44px] font-serif leading-[1.1] text-[#111111] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
          Let's get your application<br />started
        </h2>
        <p className="text-[14px] text-gray-500">
          Complete a few simple steps to submit your application.
        </p>
      </div>

      <div className="w-full max-w-[800px] bg-[#eef1ed] rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 h-[300px] md:h-[450px]">
          <img 
            src="https://images.unsplash.com/photo-1512413914421-26c361994fb0?auto=format&fit=crop&q=80&w=600" 
            alt="Professional Bridal Artistry" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h3 className="text-[28px] font-serif text-[#111111] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Professional Bridal Artistry
          </h3>
          
          <div className="mb-8">
            <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-wider text-[#526353] border border-[#a8b8a9] rounded-full bg-transparent">
              Advanced Level
            </span>
          </div>
          
          <div className="space-y-6 mb-10">
            {/* Duration */}
            <div className="flex items-start">
              <svg className="w-5 h-5 text-gray-500 mr-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-0.5">Duration</p>
                <p className="text-[14px] text-[#111111]">8 Weeks</p>
              </div>
            </div>
            
            <div className="h-[1px] w-full bg-gray-200/60"></div>
            
            {/* Location */}
            <div className="flex items-start">
              <svg className="w-5 h-5 text-gray-500 mr-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-0.5">Location</p>
                <p className="text-[14px] text-[#111111]">Addis Ababa</p>
              </div>
            </div>
            
            <div className="h-[1px] w-full bg-gray-200/60"></div>
          </div>
          
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => navigate('/application/location')}
              className="bg-[#eec15b] hover:bg-[#d9af50] text-[#111111] text-[12px] font-bold uppercase tracking-wider py-3.5 px-8 rounded-full transition"
            >
              Continue
            </button>
            <button 
              onClick={() => navigate('/application/program')}
              className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-800 transition underline underline-offset-4"
            >
              Change Program
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedProgram;
