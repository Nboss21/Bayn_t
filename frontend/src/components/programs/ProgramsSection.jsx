import React, { useState } from 'react';
import ProgramHeaderPill from './ProgramHeaderPill';
import ProgramCategories from './ProgramCategories';
import HorizontalProgramCard from './HorizontalProgramCard';
import VerticalProgramCard from './VerticalProgramCard';
import { pathData } from '../../data/home/pathData';

const ProgramsSection = () => {
  const { programs } = pathData;
  const [activeCategory, setActiveCategory] = useState('All Programs');

  const filteredPrograms = activeCategory === 'All Programs'
    ? programs
    : programs.filter((p) => p.category === activeCategory);

  const getColSpan = (index) => {
    if (index === 0) return 'md:col-span-12 lg:col-span-8';
    if (index === 1) return 'md:col-span-6 lg:col-span-4';
    return 'md:col-span-6 lg:col-span-6';
  };

  const getMinHeight = (index) => {
    if (index === 0) return '';
    if (index === 1) return 'min-h-[360px] sm:min-h-[420px] md:min-h-[480px] lg:min-h-[620px]';
    return 'min-h-[340px] sm:min-h-[380px] lg:min-h-[430px]';
  };

  return (
    <section className="px-4 sm:px-6 md:px-8 py-6 sm:py-10 max-w-[1240px] mx-auto">
      <div className="bg-white rounded-[32px] sm:rounded-[44px] md:rounded-[52px] w-full flex flex-col items-center">
        <ProgramHeaderPill />

        <div className="w-full mt-10 sm:mt-12 mb-8 flex justify-center">
          <ProgramCategories
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 w-full max-w-5xl">
          {filteredPrograms.map((program, index) => (
            <div key={program.id} className={`${getColSpan(index)} flex`}>
              {index === 0 ? (
                <HorizontalProgramCard
                  duration={program.duration}
                  level={program.level}
                  title={program.title}
                  description={program.description}
                  image={program.image}
                  className="h-full w-full"
                />
              ) : (
                <VerticalProgramCard
                  duration={program.duration}
                  level={program.level}
                  title={program.title}
                  description={program.description}
                  image={program.image}
                  className={`h-full w-full ${getMinHeight(index)}`}
                  maxDescWidth="max-w-[340px]"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
