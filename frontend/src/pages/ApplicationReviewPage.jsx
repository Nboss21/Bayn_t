import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import useApplicant from '../hooks/useApplicant';

export default function ApplicationReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applicant, loading, transition } = useApplicant(id);

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="pb-12 animate-pulse">
        <div className="h-8 w-72 bg-gray-200 rounded mb-6"></div>
        <div className="h-24 bg-gray-200 rounded-xl mb-6"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-52 bg-gray-200 rounded-xl"></div>
            <div className="h-40 bg-gray-200 rounded-xl"></div>
          </div>
          <div className="space-y-6">
            <div className="h-36 bg-gray-200 rounded-xl"></div>
            <div className="h-52 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!applicant) {
    return <div className="p-8 text-gray-500">Application not found.</div>;
  }

  const handleApprove = () => {
    transition({ status: 'Approved', activityTitle: 'Application approved' });
    setIsApproveModalOpen(false);
    navigate(`/registrar/applications/${id}/assign-class`);
  };

  const handleReject = (reason) => {
    transition({ status: 'Rejected', activityTitle: 'Application rejected', note: reason });
    setIsRejectModalOpen(false);
  };

  const handleRequestInfo = ({ selected, message }) => {
    transition({
      status: 'Awaiting Information',
      activityTitle: 'Information requested',
      note: `${selected.join(', ') || 'Further details'} — ${message}`,
    });
    setIsRequestModalOpen(false);
  };

  return (
    <div className="pb-12">
      <WarningBanner applicant={applicant} />

      <ApplicantHeader
        applicant={applicant}
        onRequestInfo={() => setIsRequestModalOpen(true)}
        onReject={() => setIsRejectModalOpen(true)}
        onApprove={() => setIsApproveModalOpen(true)}
      />

      <RejectApplicationModal
        applicant={applicant}
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={handleReject}
      />
      <RequestMoreInfoModal
        applicant={applicant}
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onConfirm={handleRequestInfo}
      />
      <ApproveApplicationModal
        applicant={applicant}
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        onConfirm={handleApprove}
      />

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