import React from 'react';
import { useApplication } from '../../context/ApplicationContext';

const SidebarSummary = () => {
  const { getSelectedProgram, formData } = useApplication();
  const program = getSelectedProgram();

  if (!program) return null;

  return (
    <div className="bg-[#fafafa] rounded-md p-8 w-full max-w-[320px] h-fit">
      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-4">
        Selected Program
      </p>
      
      <h3 className="text-[26px] font-serif text-[#111111] leading-tight mb-2" style={{ fontFamily: 'Georgia, serif' }}>
        {program.title.split(' ').length > 3
          ? program.title.split(' ').slice(0, Math.ceil(program.title.split(' ').length / 2)).join(' ') + '\n' + program.title.split(' ').slice(Math.ceil(program.title.split(' ').length / 2)).join(' ')
          : program.title}
      </h3>
      
      <p className="text-[13px] text-gray-500 mb-8 font-light">
        {program.duration} · {program.level}
      </p>

      <div className="h-[1px] w-full bg-gray-200 mb-6"></div>

      <div className="space-y-6">
        {formData.city && (
          <div className="flex items-start">
            <svg className="w-4 h-4 text-gray-400 mr-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p className="text-[10px] text-gray-500 font-semibold mb-0.5">Location</p>
              <p className="text-[13px] text-[#111111]">{formData.city}{formData.area ? `, ${formData.area}` : ''}</p>
            </div>
          </div>
        )}

        {formData.education && (
          <div className="flex items-start">
            <svg className="w-4 h-4 text-gray-400 mr-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            <div>
              <p className="text-[10px] text-gray-500 font-semibold mb-0.5">Education</p>
              <p className="text-[13px] text-[#111111]">{formData.education}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarSummary;
