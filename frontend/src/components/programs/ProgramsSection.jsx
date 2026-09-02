import React, { useState } from 'react';
import ProgramHeaderPill from './ProgramHeaderPill';
import ProgramCategories from './ProgramCategories';
import HorizontalProgramCard from './HorizontalProgramCard';
import VerticalProgramCard from './VerticalProgramCard';

const programsData = [
  {
    id: 1,
    category: 'Makeup Artistry',
    type: 'horizontal',
    duration: '12 WEEKS',
    level: 'BEGINNER',
    title: 'Professional Makeup Artistry',
    description:
      'Our foundational course designed to take you from a passion for beauty to a confident, working professional. Master color theory, facial...',
  },
  {
    id: 2,
    category: 'Makeup Artistry',
    type: 'vertical',
    duration: '8 WEEKS',
    level: 'INTERMEDIATE',
    title: 'Bridal Mastery',
    description:
      'Specialize in the lucrative bridal industry. Learn to create long-lasting, timeless looks that honor Ethiopian traditions while incorporating modern global trends.',
  },
  {
    id: 3,
    category: 'Makeup Artistry',
    type: 'vertical',
    duration: '6 WEEKS',
    level: 'ADVANCED',
    title: 'Editorial & Fashion',
    description:
      'Push the boundaries of conventional beauty. Designed for artists looking to work in print, runway, and conceptual art projects.',
  },
  {
    id: 4,
    category: 'Skincare',
    type: 'vertical',
    duration: '4 WEEKS',
    level: 'ALL LEVELS',
    title: 'Skincare Fundamentals',
    description:
      'Great makeup starts with great skin. Understand skin science, prep routines, and how to create the perfect canvas for any makeup application.',
  },
];

const ProgramsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All Programs');

  return (
    <section className="px-4 sm:px-6 md:px-8 py-6 sm:py-10 max-w-[1240px] mx-auto">
      {/* Light green rounded main wrapper */}
      <div className="bg-[#edf2ea] rounded-[32px] sm:rounded-[44px] md:rounded-[52px] p-6 sm:p-10 md:p-12 lg:p-14">
        {/* Header Pill */}
        <ProgramHeaderPill />

        {/* Categories Bar */}
        <ProgramCategories
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Cards Grid - Asymmetric 2-Column Desktop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Row 1: Professional Makeup & Bridal Mastery */}
          <div className="lg:col-span-8 flex">
            <HorizontalProgramCard
              duration={programsData[0].duration}
              level={programsData[0].level}
              title={programsData[0].title}
              description={programsData[0].description}
              className="h-full w-full"
            />
          </div>

          <div className="lg:col-span-4 flex">
            <VerticalProgramCard
              duration={programsData[1].duration}
              level={programsData[1].level}
              title={programsData[1].title}
              description={programsData[1].description}
              className="h-full w-full min-h-[480px] sm:min-h-[550px] lg:min-h-[620px]"
              maxDescWidth="max-w-[270px]"
            />
          </div>

          {/* Row 2: Editorial & Fashion & Skincare Fundamentals */}
          <div className="lg:col-span-6 flex">
            <VerticalProgramCard
              duration={programsData[2].duration}
              level={programsData[2].level}
              title={programsData[2].title}
              description={programsData[2].description}
              className="h-full w-full min-h-[380px] sm:min-h-[410px] lg:min-h-[430px]"
              maxDescWidth="max-w-[340px]"
            />
          </div>

          <div className="lg:col-span-6 flex">
            <VerticalProgramCard
              duration={programsData[3].duration}
              level={programsData[3].level}
              title={programsData[3].title}
              description={programsData[3].description}
              className="h-full w-full min-h-[380px] sm:min-h-[410px] lg:min-h-[430px]"
              maxDescWidth="max-w-[340px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
