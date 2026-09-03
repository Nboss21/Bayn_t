import React from 'react';
import { Link } from 'react-router-dom';
import teacher1 from '../assets/womans/woman 1.png';
import teacher2 from '../assets/womans/woman 2.png';
import teacher3 from '../assets/womans/woman 3.png';
import teacher4 from '../assets/womans/woman 4.png';

const teachers = [
  {
    name: "Tigist Haile",
    role: "Bridal & Traditional Looks",
    image: teacher1
  },
  {
    name: "Hana Bekele",
    role: "Editorial & Fashion Makeup",
    image: teacher2
  },
  {
    name: "Selam Girma",
    role: "Skincare & Complexion",
    image: teacher3
  },
  {
    name: "Yonas Tadesse",
    role: "Film & Stage Makeup",
    image: teacher4
  }
];

const TeachersSection = () => {
  return (
    <div className="w-full">
      {/* Top Header Area */}
      <div className="bg-[#f2f4ec] py-20 px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end w-[95%]">
          <h2 className="text-4xl md:text-5xl font-serif text-[#1c1c1c] mb-6 md:mb-0">
            Learn from the Best
          </h2>
          <div className="w-full md:w-[45%] lg:w-[35%]">
             <Link to="/teachers" className="text-[#a87f59] text-[15px] font-bold flex items-center border-b border-[#dad9cd] pb-3 hover:opacity-80 transition w-full group">
               <span>Meet All Teachers</span>
               <span className="ml-1.5 group-hover:translate-x-1 transition">&rarr;</span>
             </Link>
          </div>
        </div>
      </div>

      {/* Teachers Grid Area */}
      <div className="bg-white py-24 px-10">
        <div className="max-w-7xl mx-auto w-[95%]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teachers.map((teacher, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                {/* Image */}
                <div className="w-full aspect-[4/5] bg-gray-50 rounded-lg mb-8 border border-gray-100 overflow-hidden">
                  <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover" />
                </div>
                
                <h3 className="text-lg font-bold text-[#1c1c1c] mb-1.5">{teacher.name}</h3>
                <p className="text-gray-500 text-[13px] mb-4">{teacher.role}</p>
                <Link to="/teachers" className="text-[#d4a373] text-[13px] font-medium border-b border-[#d4a373] pb-0.5 hover:opacity-80 transition">
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersSection;
