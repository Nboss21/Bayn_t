import React from 'react';
import PhilosophyCard from './PhilosophyCard';

const philosophies = [
  {
    title: 'Technical Mastery',
    description:
      'Rigorous foundations in color theory, skin science, and application techniques tailored for diverse skin tones.',
    hasBottomAccent: false,
  },
  {
    title: 'Creative Expression',
    description:
      'Encouraging students to go beyond the lines and develop their unique signature style within the editorial and fashion contexts.',
    hasBottomAccent: true,
  },
  {
    title: 'Industry Readiness',
    description:
      'Practical business training, portfolio building, and client management skills to ensure long-term career success.',
    hasBottomAccent: false,
  },
];

const TrainingPhilosophy = () => {
  return (
    <section className="bg-[#f0ece5] py-24 px-6">
      <div className="max-w-5xl mx-auto w-[90%]">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-serif text-[#1f1d1b] mb-4 leading-tight">
            Training Philosophy
          </h2>
          <p className="text-[#7a6f67] text-sm max-w-xs mx-auto leading-relaxed">
            We believe in a holistic approach, blending technical precision with creative freedom.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {philosophies.map((item) => (
            <PhilosophyCard
              key={item.title}
              title={item.title}
              description={item.description}
              hasBottomAccent={item.hasBottomAccent}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingPhilosophy;
