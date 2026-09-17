import SectionCard from './SectionCard';

export default function PersonalInformation({ applicant }) {
  return (
    <SectionCard title="Personal Information" className="mb-6">
      <div className="grid grid-cols-3 gap-y-6">
        <div>
          <p className="text-[12px] text-gray-500 mb-1">Full Name</p>
          <p className="text-[14px] text-[#1a1a1a]">{applicant.fullName}</p>
        </div>
        <div>
          <p className="text-[12px] text-gray-500 mb-1">Email Address</p>
          <p className="text-[14px] text-[#1a1a1a]">{applicant.email}</p>
        </div>
        <div>
          <p className="text-[12px] text-gray-500 mb-1">Phone Number</p>
          <p className="text-[14px] text-[#1a1a1a]">{applicant.phone}</p>
        </div>
        <div>
          <p className="text-[12px] text-gray-500 mb-1">Date of Birth</p>
          <p className="text-[14px] text-[#1a1a1a]">{applicant.dateOfBirth}</p>
        </div>
        <div className="col-span-2">
          <p className="text-[12px] text-gray-500 mb-1">Residential Address</p>
          <p className="text-[14px] text-[#1a1a1a]">{applicant.address}</p>
        </div>
      </div>
    </SectionCard>
  );
}

