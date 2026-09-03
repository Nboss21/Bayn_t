import React from 'react';
import { Link } from 'react-router-dom';
import passionImage from '../assets/womans/woman 1.png';

const PassionSection = () => {
  return (
    <section className="py-28 px-10 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center w-[95%]">
        
        {/* Left Column - Image */}
        <div className="md:w-1/2 w-full h-[400px] rounded-lg mb-10 md:mb-0 overflow-hidden">
          <img 
            src={passionImage} 
            alt="Professional makeup" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Column - Content */}
        <div className="md:w-1/2 w-full md:pl-20 flex flex-col items-start text-left">
          <div className="mb-8 p-3 rounded bg-[#c5d5b7]">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.75 3.486a2.25 2.25 0 00-1.5 0L3.393 6.94a2.25 2.25 0 00-1.144 1.95v6.22a2.25 2.25 0 001.144 1.95L11.25 20.51a2.25 2.25 0 001.5 0l7.857-3.447a2.25 2.25 0 001.144-1.95v-6.22a2.25 2.25 0 00-1.144-1.95L12.75 3.486zM11.64 5.378a.75.75 0 01.72 0l7.25 3.18-7.25 3.18-7.25-3.18 7.25-3.18zM4.143 8.89l7.107 3.118v7.411l-7.107-3.118V8.89zm8.607 10.53v-7.411l7.107-3.118v7.411l-7.107 3.118z" />
            </svg>
          </div>
          <h2 className="text-[52px] md:text-[62px] font-serif mb-6 text-[#1c1c1c] leading-[1.1] tracking-tight">
            Where passion<br/>becomes profession
          </h2>
          <p className="text-[#1c1c1c]/80 mb-8 max-w-[400px] text-[15px] leading-relaxed">
            Professional makeup training built to develop skills, confidence, and career readiness.
          </p>
          <Link to="/about" className="text-[#ad7e59] text-[13px] font-bold flex items-center space-x-2 hover:opacity-80 transition group">
            <span>Learn More About Us</span>
            <svg className="w-3 h-3 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PassionSection;

