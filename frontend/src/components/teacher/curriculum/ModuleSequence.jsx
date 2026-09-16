import React from 'react';
import ModuleCard from './ModuleCard';

const modules = [
  {
    number: '01',
    title: 'Makeup Foundations',
    status: 'completed',
    description: 'Build core knowledge of tools, products, hygiene, and professional setup.',
    lessonsCount: 5,
  },
  {
    number: '02',
    title: 'Skin Preparation',
    status: 'completed',
    description: 'Prepare different skin types for clean, long-lasting makeup application.',
    lessonsCount: 5,
  },
  {
    number: '03',
    title: 'Skin Preparation & Complexion',
    status: 'in_progress',
    description: 'Develop complexion techniques, shade matching, and foundation application.',
    lessonsCount: 6,
    completedLessonsCount: 4,
  },
  {
    number: '04',
    title: 'Eye Makeup',
    status: 'upcoming',
    description: 'Develop eye makeup techniques from everyday looks to more advanced styles.',
    lessonsCount: 7,
  },
  {
    number: '05',
    title: 'Brows, Lashes & Definition',
    status: 'upcoming',
    description: 'Shape brows and apply lashes while balancing facial features.',
    lessonsCount: 5,
  },
  {
    number: '06',
    title: 'Bridal Makeup',
    status: 'upcoming',
    description: 'Learn professional bridal preparation, application, and long-wear techniques.',
    lessonsCount: 6,
  },
  {
    number: '07',
    title: 'Creative & Editorial Makeup',
    status: 'upcoming',
    description: 'Explore creative techniques, editorial looks, and professional presentation.',
    lessonsCount: 5,
  },
  {
    number: '08',
    title: 'Professional Practice',
    status: 'upcoming',
    description: 'Prepare for professional client work, portfolio development, and final practical assessment.',
    lessonsCount: 6,
  },
];

const ModuleSequence = () => {
  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[#1A1A1A]">Module Sequence (8 Total)</h2>
        <span className="text-[13px] text-gray-500">Ordered sequence for certificate qualification</span>
      </div>
      
      <div className="flex flex-col gap-3">
        {modules.map((module) => (
          <ModuleCard key={module.number} module={module} />
        ))}
      </div>
    </div>
  );
};

export default ModuleSequence;

