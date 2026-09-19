import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { registrarService } from '../services/applicationService';
import StudentDetailHeader from '../components/students/StudentDetailHeader';
import PersonalInfoCard from '../components/students/PersonalInfoCard';
import EducationExperienceCard from '../components/students/EducationExperienceCard';
import DocumentsCard from '../components/students/DocumentsCard';
import EnrollmentPanel from '../components/students/EnrollmentPanel';
import ClassPanel from '../components/students/ClassPanel';
import ApplicationPanel from '../components/students/ApplicationPanel';
import RecentActivityPanel from '../components/students/RecentActivityPanel';
import { scheduleLabel } from '../utils/schedule';

export default function StudentDetailPage() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    registrarService.student(studentId).then((record) => {
      const application = record.application || {};
      const classRecord = record.class || {};
      const hasCertificate = (record.documents || []).some((doc) => doc.type === 'certificate');
      setStudent({
        id: record.id,
        rawStatus: record.status,
        hasCertificate,
        name: record.user?.name || 'Unnamed student',
        status: record.status ? record.status.charAt(0).toUpperCase() + record.status.slice(1) : 'Unknown',
        studentId: `STU-${record.id}`,
        program: application.program?.name || 'Unassigned',
        intake: application.intake?.name || '—',
        personal: { fullName: record.user?.name, email: record.user?.email, phone: record.user?.phone || '—', dateOfBirth: '—', address: '—' },
        education: { educationalBackground: '—', makeupExperience: '—', previousTraining: '—', relevantExperience: '—' },
        documents: (record.documents || []).map((document) => ({ name: document.type || 'Document', status: 'Uploaded' })),
        enrollment: { studentId: `STU-${record.id}`, program: application.program?.name || 'Unassigned', intake: application.intake?.name || '—', class: classRecord.name || 'Unassigned', enrollmentDate: record.enrolled_at ? new Date(record.enrolled_at).toLocaleDateString() : '—', status: record.status || 'Unknown' },
        classInfo: { name: classRecord.name || 'Unassigned', instructor: classRecord.teacher?.name || '—', schedule: scheduleLabel(classRecord.schedule) || '—' },
        application: { id: application.reference_number || `APP-${application.id || '—'}`, submitted: application.submitted_at ? new Date(application.submitted_at).toLocaleDateString() : '—', approval: application.status || '—', payment: record.payments?.[0]?.status || '—' },
        recentActivity: [],
      });
    }).finally(() => setLoading(false));
  }, [studentId]);

  if (loading) return <div className="py-20 text-center text-[#6b7280]">Loading student...</div>;

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20">
        <p className="text-[16px] text-[#6b7280] mb-4">Student not found</p>
        <button
          onClick={() => navigate('/registrar/students')}
          className="px-4 py-2 text-[13px] font-medium text-[#374151] bg-white border border-[#d1d5db] rounded-lg hover:bg-[#f9fafb] transition-colors"
        >
          Back to Students
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <StudentDetailHeader student={student} />

      {/* Content Grid */}
      <div className="flex gap-8">
        {/* Left Column - Cards */}
        <div className="flex-1 min-w-0">
          <PersonalInfoCard student={student.personal} />
          <EducationExperienceCard student={student.education} />
          <DocumentsCard documents={student.documents} />
        </div>

        {/* Right Column - Sidebar Panels */}
        <div className="w-[320px] shrink-0">
          <div className="bg-white border border-[#e5e7eb] rounded-xl p-6">
            <EnrollmentPanel enrollment={student.enrollment} />
            <div className="border-t border-[#e5e7eb] my-4" />
            <ClassPanel classInfo={student.classInfo} />
            <div className="border-t border-[#e5e7eb] my-4" />
            <ApplicationPanel application={student.application} />
            <div className="border-t border-[#e5e7eb] my-4" />
            <RecentActivityPanel activities={student.recentActivity} />
          </div>
        </div>
      </div>
    </div>
  );
}
