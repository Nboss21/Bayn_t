import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { studentsData } from '../../components/teacher/roster/RosterTable';
import StudentProgressHeader from '../../components/teacher/roster/student/StudentProgressHeader';
import StudentProgressStats from '../../components/teacher/roster/student/StudentProgressStats';
import StudentProgressAlert from '../../components/teacher/roster/student/StudentProgressAlert';
import StudentAttendanceCard from '../../components/teacher/roster/student/StudentAttendanceCard';
import StudentMarksCard from '../../components/teacher/roster/student/StudentMarksCard';

const TeacherStudentProgress = () => {
  const { studentId } = useParams();
  const student = studentsData.find((s) => String(s.id) === studentId);

  if (!student) {
    return <Navigate to="/teacher/roster" replace />;
  }

  return (
    <div className="pt-6 pb-16">
      <StudentProgressHeader student={student} />
      <StudentProgressStats attendance={student.attendance} marks={student.marks} />
      {student.status === 'Needs Attention' && <StudentProgressAlert />}
      <StudentAttendanceCard attendance={student.attendance} />
      <StudentMarksCard marks={student.marks} />
    </div>
  );
};

export default TeacherStudentProgress;

