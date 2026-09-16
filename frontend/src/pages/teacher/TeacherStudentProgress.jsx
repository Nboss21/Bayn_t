import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import StudentProgressHeader from '../../components/teacher/roster/student/StudentProgressHeader';
import StudentProgressStats from '../../components/teacher/roster/student/StudentProgressStats';
import StudentProgressAlert from '../../components/teacher/roster/student/StudentProgressAlert';
import StudentAttendanceCard from '../../components/teacher/roster/student/StudentAttendanceCard';
import StudentMarksCard from '../../components/teacher/roster/student/StudentMarksCard';
import useTeacherRoster from '../../hooks/useTeacherRoster';

const TeacherStudentProgress = () => {
  const { studentId } = useParams();
  const { rosterModel, loading } = useTeacherRoster();

  if (loading || !rosterModel) {
    return (
      <div className="pb-16">
        <div className="h-8 w-48 bg-gray-100 rounded mb-3 animate-pulse"></div>
        <div className="h-20 w-full bg-gray-100 rounded-xl mb-6 animate-pulse"></div>
        <div className="flex gap-4 mb-6">
          <div className="h-36 flex-1 bg-gray-100 rounded-xl animate-pulse"></div>
          <div className="h-36 flex-1 bg-gray-100 rounded-xl animate-pulse"></div>
        </div>
        <div className="h-60 w-full bg-gray-100 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  const student = rosterModel.getStudentById(Number(studentId));

  if (!student) {
    return <Navigate to="/teacher/roster" replace />;
  }

  return (
    <div className="pb-16">
      <StudentProgressHeader student={student} />
      <StudentProgressStats
        attendance={student.attendance}
        marks={student.marks}
        sessionsLogged={student.attendanceTotalDays}
      />
      {student.status === 'Needs Attention' && <StudentProgressAlert student={student} />}
      <StudentAttendanceCard student={student} />
      <StudentMarksCard student={student} />
    </div>
  );
};

export default TeacherStudentProgress;