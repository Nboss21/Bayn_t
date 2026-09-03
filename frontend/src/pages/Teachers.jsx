import React from 'react';
import TeachersHero from '../components/teachers/TeachersHero';
import TeacherProfile from '../components/teachers/TeacherProfile';
import { teacherProfiles } from '../data/home/teachersData';

const getIcon = (iconType) => {
  if (iconType === 'star') {
    return (
      <svg className="w-4 h-4 text-[#b48a66]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }
  if (iconType === 'diamond') {
    return (
      <svg className="w-4 h-4 text-[#b48a66]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l8 10-8 10-8-10 8-10z" />
      </svg>
    );
  }
  return null;
};

const Teachers = () => {
  return (
    <div className="w-full flex flex-col items-center bg-white pt-12 pb-24">
      <div className="w-[95%] max-w-[1300px] bg-[#fdfbf8] flex flex-col items-center pt-24 pb-32 px-4 md:px-12 relative">
        <div className="w-full max-w-[1000px] flex flex-col items-center z-10">
          <TeachersHero />

          <div className="w-full mt-24 flex flex-col gap-32">
            {teacherProfiles.map((teacher) => (
              <TeacherProfile
                key={teacher.id}
                name={teacher.name}
                role={teacher.role}
                description={teacher.description}
                quote={teacher.quote}
                experience={teacher.experience}
                icon={getIcon(teacher.iconType)}
                image={teacher.image}
                imageLeft={teacher.imageLeft}
                placeholderColor={teacher.placeholderColor}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1300px] bg-[#b18968] flex flex-col items-center justify-center py-20 px-4 md:px-12 mt-12 rounded-[40px] mb-8">
        <h2 className="font-serif text-3xl md:text-[40px] text-white mb-8 text-center leading-tight">
          Ready To Learn From<br />Professionals?
        </h2>
        <button className="bg-[#dfdb5a] text-[#1c1c1c] font-sans font-bold text-xs uppercase tracking-wider py-4 px-10 rounded-full hover:bg-[#c9c54e] transition-colors">
          APPLY NOW
        </button>
      </div>
    </div>
  );
};

export default Teachers;
