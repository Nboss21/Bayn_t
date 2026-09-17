import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import studentsDetailData from '../data/studentsDetailData';
import StudentDetailHeader from '../components/students/StudentDetailHeader';
import PersonalInfoCard from '../components/students/PersonalInfoCard';
import EducationExperienceCard from '../components/students/EducationExperienceCard';
import DocumentsCard from '../components/students/DocumentsCard';
import EnrollmentPanel from '../components/students/EnrollmentPanel';
import ClassPanel from '../components/students/ClassPanel';
import ApplicationPanel from '../components/students/ApplicationPanel';
import RecentActivityPanel from '../components/students/RecentActivityPanel';

export default function StudentDetailPage() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const student = studentsDetailData[studentId];

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
