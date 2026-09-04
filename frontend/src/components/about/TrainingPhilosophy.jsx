import React from 'react';
import PhilosophyCard from './PhilosophyCard';
import { trainingPhilosophyData } from '../../data/about/trainingPhilosophyData';

const TrainingPhilosophy = () => {
  const { heading, subtitle, philosophies } = trainingPhilosophyData;

  return (
    <section className="bg-[#f0ece5] py-24 px-6">
      <div className="max-w-5xl mx-auto w-[90%]">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-serif text-[#1f1d1b] mb-4 leading-tight">
            {heading}
          </h2>
          <p className="text-[#7a6f67] text-sm max-w-xs mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {philosophies.map((item) => (
            <PhilosophyCard
              key={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
              hasBottomAccent={item.hasBottomAccent}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingPhilosophy;
