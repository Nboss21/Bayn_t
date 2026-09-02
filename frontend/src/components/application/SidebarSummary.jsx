import React from 'react';

const SidebarSummary = () => {
  return (
    <div className="bg-[#fafafa] rounded-md p-8 w-full max-w-[320px] h-fit">
      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-4">
        Selected Program
      </p>
      
      <h3 className="text-[26px] font-serif text-[#111111] leading-tight mb-2" style={{ fontFamily: 'Georgia, serif' }}>
        Professional<br />Bridal Artistry
      </h3>
      
      <p className="text-[13px] text-gray-500 mb-8 font-light">
        12-Week Intensive<br />Masterclass
      </p>

      <div className="h-[1px] w-full bg-gray-200 mb-6"></div>

      <div className="space-y-6 mb-8">
        <div className="flex items-start">
          <svg className="w-4 h-4 text-gray-400 mr-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div>
            <p className="text-[10px] text-gray-500 font-semibold mb-0.5">Start Date</p>
            <p className="text-[13px] text-[#111111]">September 15, 2024</p>
          </div>
        </div>

        <div className="flex items-start">
          <svg className="w-4 h-4 text-gray-400 mr-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div>
            <p className="text-[10px] text-gray-500 font-semibold mb-0.5">Location</p>
            <p className="text-[13px] text-[#111111]">Paris Campus</p>
          </div>
        </div>
      </div>

      {/* Placeholder for the image in sidebar */}
      <div className="w-full h-[120px] rounded bg-gray-200 overflow-hidden relative" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h10v10H0zm10 10h10v10H10z\' fill=\'%23e5e7eb\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
        backgroundSize: '20px 20px'
      }}>
      </div>
    </div>
  );
};

export default SidebarSummary;
