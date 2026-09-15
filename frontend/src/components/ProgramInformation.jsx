import SectionCard from './SectionCard';

export default function ProgramInformation({ applicant }) {
  return (
    <SectionCard title="Program Information" className="mb-6">
      <h3 className="text-[16px] text-[#1a1a1a] mb-5">{applicant.program}</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center pb-4 border-b border-[#f3f4f6]">
          <span className="text-[13px] text-gray-500">Duration</span>
          <span className="text-[13px] text-[#1a1a1a]">{applicant.programDuration}</span>
        </div>
        <div className="flex justify-between items-center pb-4 border-b border-[#f3f4f6]">
          <span className="text-[13px] text-gray-500">Level</span>
          <span className="text-[13px] text-[#1a1a1a]">{applicant.programLevel}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[13px] text-gray-500">Intake</span>
          <span className="text-[13px] text-[#1a1a1a]">{applicant.intake}</span>
        </div>
      </div>
    </SectionCard>
  );
}

