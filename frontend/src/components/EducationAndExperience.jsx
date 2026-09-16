import SectionCard from './SectionCard';

export default function EducationAndExperience({ applicant }) {
  return (
    <SectionCard title="Education & Experience" className="mb-6">
      <div className="space-y-6">
        <div>
          <p className="text-[12px] text-gray-500 mb-1">Education Level</p>
          <p className="text-[14px] text-[#1a1a1a]">{applicant.educationLevel}</p>
        </div>
        <div>
          <p className="text-[12px] text-gray-500 mb-1">Experience</p>
          <p className="text-[14px] text-[#1a1a1a]">{applicant.experience}</p>
        </div>
        <div>
          <p className="text-[12px] text-gray-500 mb-1">Relevant Experience Details</p>
          <p className="text-[14px] text-[#1a1a1a] leading-relaxed">
            {applicant.experienceDetails}
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

