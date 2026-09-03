import React from 'react';
import { Link } from 'react-router-dom';
import image1 from '../assets/image/image 1.jpg';
import image2 from '../assets/image/image 2.jpg';
import image3 from '../assets/image/image3.jpg';
import image4 from '../assets/image/image 4.jpg';

const PathSection = () => {
  return (
    <section className="bg-[#b08968] py-24 px-10">
      <div className="max-w-7xl mx-auto w-[95%]">
        
        {/* Header Area */}
        <div className="mb-12">
          <h2 className="text-5xl md:text-[72px] font-serif text-white mb-12 leading-[1.1] tracking-tight">
            Find Your Path to<br/>Success
          </h2>
          
          <div className="flex justify-between items-center mb-10 md:w-1/2">
            <h3 className="text-2xl text-white font-serif">Programs</h3>
            <div className="flex-grow ml-8 border-t border-white/40 max-w-[200px] md:max-w-none"></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Left Column (Main Program) */}
          <div className="md:w-1/2 flex flex-col">
            <img src={image1} alt="Professional makeup artistry" className="w-full aspect-[4/3] object-cover rounded-2xl mb-6 shadow-lg" />
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-white/20 px-3 py-1 rounded text-xs font-bold text-white tracking-wide">Professional</span>
              <span className="text-xs font-bold text-white">12 weeks</span>
            </div>
            
            <h4 className="text-3xl md:text-4xl font-serif text-white mb-3 leading-tight">
              Professional Makeup Artistry
            </h4>
            
            <p className="text-white/80 text-sm mb-6 font-sans">
              Master the full craft from fundamentals to advanced editorial work.
            </p>
            
            <Link to="/programs" className="text-sm font-bold text-[#1c1c1c] flex items-center group">
              View details <svg className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </Link>
          </div>

          {/* Right Column (List of Programs) */}
          <div className="md:w-1/2 flex flex-col space-y-8">
            
            {/* Program 1 */}
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <img src={image2} alt="Bridal makeup" className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-2xl shadow-md shrink-0" />
              <div className="flex flex-col justify-center h-full py-2">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="bg-white/20 px-3 py-1 rounded text-[10px] sm:text-xs font-bold text-white tracking-wide">Bridal</span>
                  <span className="text-[10px] sm:text-xs font-bold text-white">6 weeks</span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-serif text-white mb-4 leading-tight">
                  Bridal Makeup Artistry
                </h4>
                <Link to="/programs" className="text-sm font-bold text-[#1c1c1c] flex items-center group mt-auto">
                  View details <svg className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </Link>
              </div>
            </div>

            {/* Program 2 */}
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <img src={image3} alt="Beauty and skincare" className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-2xl shadow-md shrink-0" />
              <div className="flex flex-col justify-center h-full py-2">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="bg-white/20 px-3 py-1 rounded text-[10px] sm:text-xs font-bold text-white tracking-wide">Beauty</span>
                  <span className="text-[10px] sm:text-xs font-bold text-white">4 weeks</span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-serif text-white mb-4 leading-tight">
                  Beauty and Skincare Fundamentals
                </h4>
                <Link to="/programs" className="text-sm font-bold text-[#1c1c1c] flex items-center group mt-auto">
                  View details <svg className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </Link>
              </div>
            </div>

            {/* Program 3 */}
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <img src={image4} alt="Professional makeup" className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-2xl shadow-md shrink-0" />
              <div className="flex flex-col justify-center h-full py-2">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="bg-white/20 px-3 py-1 rounded text-[10px] sm:text-xs font-bold text-white tracking-wide">Professional</span>
                  <span className="text-[10px] sm:text-xs font-bold text-white">12 weeks</span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-serif text-white mb-4 leading-tight">
                  Professional Makeup Artistry
                </h4>
                <Link to="/programs" className="text-sm font-bold text-[#1c1c1c] flex items-center group mt-auto">
                  View details <svg className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PathSection;

