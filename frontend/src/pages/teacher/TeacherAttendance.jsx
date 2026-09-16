import React from 'react';
import TeacherAttendanceHeader from '../../components/teacher/TeacherAttendanceHeader';
import TeacherAttendanceClassInfo from '../../components/teacher/TeacherAttendanceClassInfo';
import TeacherAttendanceStats from '../../components/teacher/TeacherAttendanceStats';
import TeacherAttendanceControls from '../../components/teacher/TeacherAttendanceControls';
import TeacherAttendanceTable from '../../components/teacher/TeacherAttendanceTable';
import TeacherAttendanceFooter from '../../components/teacher/TeacherAttendanceFooter';

const TeacherAttendance = () => {
  return (
    <div className="pt-6 relative min-h-screen pb-24">
      <TeacherAttendanceHeader />
      <TeacherAttendanceClassInfo />
      <TeacherAttendanceStats />
      <TeacherAttendanceControls />
      
      <div className="mb-6">
        <TeacherAttendanceTable />
      </div>
      
      <TeacherAttendanceFooter />
    </div>
  );
};

export default TeacherAttendance;
