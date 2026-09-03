import React from 'react';
import { pathData } from '../../data/home/pathData';

const ComparePrograms = () => {
  return (
    <section className="px-4 sm:px-6 md:px-8 py-10 max-w-[1240px] mx-auto w-full">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-[#7a5236] text-white py-3 px-6 rounded-t-[4px]">
          <h3 className="font-serif text-[18px] sm:text-[20px] font-normal">Compare Programs</h3>
        </div>

        {/* Table Container */}
        <div className="bg-[#fcfaf7] rounded-b-[4px] border border-[#e5e5e5] border-t-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#e5e5e5]">
                <th className="py-4 px-6 text-[10px] font-bold text-[#666] tracking-wider uppercase w-1/3">Program</th>
                <th className="py-4 px-6 text-[10px] font-bold text-[#666] tracking-wider uppercase w-1/4">Duration</th>
                <th className="py-4 px-6 text-[10px] font-bold text-[#666] tracking-wider uppercase w-1/4">Level</th>
                <th className="py-4 px-6 w-1/6"></th>
              </tr>
            </thead>
            <tbody>
              {pathData.programs.map((program) => (
                <tr key={program.id} className="border-b border-[#e5e5e5] last:border-none">
                  <td className="py-4 px-6 text-[12px] sm:text-[13px] text-[#1c1c1c]">{program.title}</td>
                  <td className="py-4 px-6 text-[12px] sm:text-[13px] text-[#666]">{program.duration}</td>
                  <td className="py-4 px-6 text-[12px] sm:text-[13px] text-[#666]">{program.level}</td>
                  <td className="py-4 px-6 text-right">
                    <a href="#" className="text-[#a87b52] text-[11px] font-semibold tracking-wider hover:text-[#8a5f3f] transition-colors underline underline-offset-4">
                      View Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparePrograms;
