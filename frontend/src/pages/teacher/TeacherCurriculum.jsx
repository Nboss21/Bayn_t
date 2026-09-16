import React from 'react';
import CurriculumHeader from '../../components/teacher/curriculum/CurriculumHeader';
import CurriculumBanner from '../../components/teacher/curriculum/CurriculumBanner';
import CurriculumFilter from '../../components/teacher/curriculum/CurriculumFilter';
import TeachingContextCard from '../../components/teacher/curriculum/TeachingContextCard';
import ProgressCard from '../../components/teacher/curriculum/ProgressCard';
import ModuleSequence from '../../components/teacher/curriculum/ModuleSequence';

const TeacherCurriculum = () => {
  return (
    <div className="w-full">
      <CurriculumHeader />
      <CurriculumBanner />
      <CurriculumFilter />
      
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 mb-8">
        <TeachingContextCard />
        <ProgressCard />
      </div>
      
      <ModuleSequence />
    </div>
  );
};

export default TeacherCurriculum;

