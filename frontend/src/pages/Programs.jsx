import React from 'react';
import ProgramsSection from '../components/programs/ProgramsSection';
import MiniProgramCards from '../components/programs/MiniProgramCards';
import ComparePrograms from '../components/programs/ComparePrograms';
import EnrollmentCTA from '../components/programs/EnrollmentCTA';

const Programs = () => {
  return (
    <div className="w-full bg-white pt-24 pb-4">
      <ProgramsSection />
      <MiniProgramCards />
      <ComparePrograms />
      <EnrollmentCTA />
    </div>
  );
};

export default Programs;
