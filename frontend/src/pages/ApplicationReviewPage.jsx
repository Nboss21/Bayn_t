import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { applicantsData } from '../data/applicantsData';
import WarningBanner from '../components/WarningBanner';
import ApplicantHeader from '../components/ApplicantHeader';
import PersonalInformation from '../components/PersonalInformation';
import EducationAndExperience from '../components/EducationAndExperience';
import DocumentsList from '../components/DocumentsList';
import ApplicationStatus from '../components/ApplicationStatus';
import ProgramInformation from '../components/ProgramInformation';
import PaymentDetails from '../components/PaymentDetails';
import ActivityHistory from '../components/ActivityHistory';
import RejectApplicationModal from '../components/RejectApplicationModal';
import RequestMoreInfoModal from '../components/RequestMoreInfoModal';
import ApproveApplicationModal from '../components/ApproveApplicationModal';

export default function ApplicationReviewPage() {
  const { id } = useParams();
  const applicant = applicantsData[id];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

  if (!applicant) {
    return <div className="p-8 text-gray-500">Application not found.</div>;
  }

  return (
    <div className="pb-12">
      <WarningBanner />
      
      <ApplicantHeader 
        applicant={applicant}
        onRequestInfo={() => setIsModalOpen(true)} 
        onReject={() => setIsRejectModalOpen(true)} 
        onApprove={() => setIsApproveModalOpen(true)}
      />

      <RejectApplicationModal applicant={applicant} isOpen={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)} />
      <RequestMoreInfoModal applicant={applicant} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ApproveApplicationModal applicant={applicant} isOpen={isApproveModalOpen} onClose={() => setIsApproveModalOpen(false)} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PersonalInformation applicant={applicant} />
          <EducationAndExperience applicant={applicant} />
          <DocumentsList />
        </div>
        
        <div className="space-y-6">
          <ApplicationStatus applicant={applicant} />
          <ProgramInformation applicant={applicant} />
          <PaymentDetails applicant={applicant} />
          <ActivityHistory applicant={applicant} />
        </div>
      </div>
    </div>
  );
}
