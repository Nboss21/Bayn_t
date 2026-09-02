import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProgramCard from '../components/application/ProgramCard';

const programs = [
  {
    id: 1,
    title: 'Professional Makeup Artistry',
    description: 'Master the fundamentals of professional makeup application for salon and commercial work.',
    duration: '6 MONTHS',
    level: 'BEGINNER TO INTERMEDIATE',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 2,
    title: 'Bridal Makeup Artistry',
    description: 'Specialize in the art of traditional and modern Ethiopian bridal beauty.',
    duration: '3 MONTHS',
    level: 'ADVANCED',
    image: 'https://images.unsplash.com/photo-1512413914421-26c361994fb0?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 3,
    title: 'Beauty & Editorial Makeup',
    description: 'Push creative boundaries for high-fashion, editorial, and runway artistry.',
    duration: '4 MONTHS',
    level: 'ADVANCED',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=300'
  }
];

const ProgramSelection = () => {
  const [selectedId, setSelectedId] = useState(1);
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[800px] mx-auto px-4 py-8 flex flex-col items-center">
      {/* Header Section */}
      <div className="text-center mb-10 mt-6">
        <p className="text-[#a87b52] text-[10px] font-bold tracking-[0.15em] uppercase mb-4">
          PROGRAM
        </p>
        <h2 className="text-[34px] md:text-[40px] font-serif leading-[1.1] text-[#111111] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
          Which program would you like to<br />apply for?
        </h2>
        <p className="text-[14px] text-gray-500">
          Choose the program that best matches your goals.
        </p>
      </div>

      {/* Cards List */}
      <div className="w-full space-y-4 mb-16">
        {programs.map((program) => (
          <ProgramCard
            key={program.id}
            title={program.title}
            description={program.description}
            duration={program.duration}
            level={program.level}
            image={program.image}
            isSelected={selectedId === program.id}
            onClick={() => setSelectedId(program.id)}
          />
        ))}
      </div>

      {/* Footer Navigation */}
      <div className="w-full flex justify-between items-center pb-10">
        <button 
          onClick={() => navigate('/application')}
          className="border border-gray-400 bg-transparent text-[#111111] text-[12px] font-medium uppercase tracking-wider py-3 px-8 rounded-full hover:bg-gray-50 transition flex items-center"
        >
          <svg className="w-3.5 h-3.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
        <button 
          onClick={() => navigate('/application/selected')}
          className="bg-[#dfbc55] hover:bg-[#d4b14d] text-[#111111] text-[12px] font-medium uppercase tracking-wider py-3 px-8 rounded-full transition flex items-center shadow-sm"
        >
          Continue
          <svg className="w-3.5 h-3.5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProgramSelection;
