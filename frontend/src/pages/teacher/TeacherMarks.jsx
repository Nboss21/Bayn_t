import React from 'react';
import TeacherMarksHeader from '../../components/teacher/TeacherMarksHeader';
import TeacherMarksClassInfo from '../../components/teacher/TeacherMarksClassInfo';
import TeacherMarksGradingWeight from '../../components/teacher/TeacherMarksGradingWeight';
import TeacherMarksTableSection from '../../components/teacher/TeacherMarksTableSection';
import TeacherMarksFooter from '../../components/teacher/TeacherMarksFooter';

const TeacherMarks = () => {
  return (
    <>
      <TeacherMarksHeader />
      <TeacherMarksClassInfo />
      <TeacherMarksGradingWeight />
      <TeacherMarksTableSection />
      <TeacherMarksFooter />
    </>
  );
};

export default TeacherMarks;

