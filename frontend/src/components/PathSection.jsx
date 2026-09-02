import React from 'react';

const PathSection = () => {
  return (
    <section className="bg-[#edf1e6] py-32 px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between w-[95%]">
        
        {/* Left Column */}
        <div className="md:w-1/2 flex flex-col justify-between mb-20 md:mb-0">
          <div>
            <h2 className="text-5xl md:text-[68px] font-serif text-[#1c1c1c] mb-10 leading-[1.05] tracking-tight">Find Your Path to<br/>Success</h2>
            <button className="border border-[#c5c1b6] px-8 py-2.5 rounded-full text-lg font-serif text-[#1c1c1c] hover:bg-white transition">Programs</button>
          </div>
          
          <div className="mt-40 md:mt-64">
            <div className="flex items-center space-x-4 mb-5">
              <span className="bg-[#daddd5] px-3 py-1 rounded text-[11px] font-bold text-[#1c1c1c] tracking-wide">Professional</span>
              <span className="text-[12px] font-bold text-[#1c1c1c]">12 weeks</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-serif text-[#1c1c1c] mb-4">Professional makeup artistry</h3>
            <p className="text-[#1c1c1c]/90 max-w-sm text-sm mb-6 leading-relaxed font-sans">Master the full craft from fundamentals to advanced editorial work.</p>
            <a href="#" className="text-sm font-bold text-[#1c1c1c] flex items-center group">
              View details <svg className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </a>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="md:w-5/12 flex flex-col">
          <div className="flex justify-end mb-12">
            <a href="#" className="text-[#ad7e59] text-xs font-bold border-b border-[#ad7e59] pb-0.5 hover:opacity-80 transition flex items-center">
              View All Programs <span className="ml-1.5">&rarr;</span>
            </a>
          </div>
          
          <div className="space-y-16">
            {/* Program 1 */}
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-[#daddd5] px-3 py-1 rounded text-[11px] font-bold text-[#1c1c1c] tracking-wide">Bridal</span>
                <span className="text-[12px] font-bold text-[#1c1c1c]">6 weeks</span>
              </div>
              <h4 className="text-[28px] font-serif text-[#1c1c1c] mb-4">Bridal makeup artistry</h4>
              <a href="#" className="text-sm font-bold text-[#1c1c1c] flex items-center group">
                View details <svg className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </a>
            </div>

            {/* Program 2 */}
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-[#daddd5] px-3 py-1 rounded text-[11px] font-bold text-[#1c1c1c] tracking-wide">Beauty</span>
                <span className="text-[12px] font-bold text-[#1c1c1c]">4 weeks</span>
              </div>
              <h4 className="text-[28px] font-serif text-[#1c1c1c] mb-4 leading-tight">Beauty and skincare<br/>fundamentals</h4>
              <a href="#" className="text-sm font-bold text-[#1c1c1c] flex items-center group">
                View details <svg className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </a>
            </div>
            
            {/* Program 3 */}
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-[#daddd5] px-3 py-1 rounded text-[11px] font-bold text-[#1c1c1c] tracking-wide">Professional</span>
                <span className="text-[12px] font-bold text-[#1c1c1c]">12 weeks</span>
              </div>
              <h4 className="text-[28px] font-serif text-[#1c1c1c] mb-4 leading-tight">Professional makeup<br/>artistry</h4>
              <a href="#" className="text-sm font-bold text-[#1c1c1c] flex items-center group">
                View details <svg className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PathSection;

