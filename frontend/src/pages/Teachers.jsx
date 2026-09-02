import React from 'react';
import TeachersHero from '../components/teachers/TeachersHero';
import TeacherProfile from '../components/teachers/TeacherProfile';
import { Star } from 'lucide-react'; // Make sure lucide-react is installed, otherwise replace with SVGs

const Teachers = () => {
  return (
    <div className="w-full flex flex-col items-center bg-white pt-12 pb-24">
      {/* Main content container with cream background limited to its width */}
      <div className="w-[95%] max-w-[1300px] bg-[#fdfbf8] flex flex-col items-center pt-24 pb-32 px-4 md:px-12 relative">
        <div className="w-full max-w-[1000px] flex flex-col items-center z-10">
          <TeachersHero />

          <div className="w-full mt-24 flex flex-col gap-32">
            <TeacherProfile
              name="Selamawit"
              role="LEAD INSTRUCTOR, EDITORIAL & FASHION"
              description="With over 15 years of experience spanning Milan, Paris, and Addis Ababa, Selamawit brings a rigorous, high-fashion perspective to the academy. Her work has redefined modern Ethiopian beauty standards in international publications."
              quote="“I teach to dismantle the boundaries between traditional artistry and global fashion. True mastery lies in the details—the slight shift in hue, the perfect diffusion of light.”"
              experience="15+ Years Experience"
              icon={<Star className="w-4 h-4 text-[#b48a66]" strokeWidth={2} />}
              imageLeft={true}
              placeholderColor="bg-white"
            />

            <TeacherProfile
              name="Helina"
              role="SPECIALIST, BRIDAL & TRADITIONAL"
              description="Helina is a pioneer in preserving and elevating traditional Ethiopian bridal aesthetics. She combines ancient techniques with modern, long-wear cosmetic chemistry to create looks that endure both tears and time."
              quote="“A bride's face tells a story of heritage and hope. My goal is to teach our students how to honor that narrative while delivering flawless, technical perfection.”"
              experience="12+ Years Experience"
              icon={
                <svg className="w-4 h-4 text-[#b48a66]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l8 10-8 10-8-10 8-10z" />
                </svg>
              }
              imageLeft={false}
              placeholderColor="bg-[#e5e5e5]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
