import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import StudentProgressHeader from '../../components/teacher/roster/student/StudentProgressHeader';
import StudentProgressStats from '../../components/teacher/roster/student/StudentProgressStats';
import StudentProgressAlert from '../../components/teacher/roster/student/StudentProgressAlert';
import StudentAttendanceCard from '../../components/teacher/roster/student/StudentAttendanceCard';
import StudentMarksCard from '../../components/teacher/roster/student/StudentMarksCard';
import useTeacherRoster from '../../hooks/useTeacherRoster';
import { teacherService } from '../../services/applicationService';

const TeacherStudentProgress = () => {
  const { studentId } = useParams();
  const { rosterModel, loading } = useTeacherRoster();
  const [submitting, setSubmitting] = useState(false);
  const [completionMessage, setCompletionMessage] = useState(null);

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

  const submitCompletion = async () => {
    setSubmitting(true);
    setCompletionMessage(null);
    try {
      await teacherService.submitCompletion(student.id);
      setCompletionMessage({ type: 'success', text: 'Submitted to the registrar for review.' });
    } catch (error) {
      const errors = error?.response?.data?.errors || {};
      const details = Object.values(errors).flat().join(' ');
      setCompletionMessage({ type: 'error', text: details || 'Attendance, marks, or curriculum data is incomplete.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pb-16">
      <StudentProgressHeader student={student} />
      <div className="mb-6 rounded-xl border border-[#dfe8d8] bg-[#f7fbf3] p-5 flex items-center justify-between gap-4">
        <div><h2 className="font-semibold text-[#1f3327]">Course completion</h2><p className="text-sm text-gray-600 mt-1">Submit this student when attendance, marks, and curriculum are complete.</p>{completionMessage && <p className={`text-sm mt-2 ${completionMessage.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>{completionMessage.text}</p>}</div>
        <button onClick={submitCompletion} disabled={submitting || student.rawStatus === 'Completed'} className="shrink-0 rounded-lg bg-[#345243] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#2b4a3b] disabled:opacity-50">{student.rawStatus === 'Completed' ? 'Course completed' : submitting ? 'Checking...' : 'Submit for review'}</button>
      </div>
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
