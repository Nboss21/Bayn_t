import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { courses as allCourses } from '../data/home/coursesData';

const Courses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(allCourses.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCourses = allCourses.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <section className="py-28 px-10 bg-white">
      <div className="max-w-6xl mx-auto w-[90%]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1c1c1c] mb-4">Courses</h2>
            <p className="text-gray-500 text-sm">Find the perfect program for your goals.</p>
          </div>
          <Link to="/programs" className="mt-6 md:mt-0 border border-gray-400 px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-widest text-[#1c1c1c] hover:bg-gray-50 transition">See All</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {currentCourses.map(course => (
            <div key={course.id} className="group cursor-pointer">
              <div className="h-72 bg-gray-100 overflow-hidden mb-6 relative rounded-xl">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4 bg-white/90 px-4 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm text-[#1c1c1c]">
                  {course.tag}
                </div>
              </div>
              <h3 className="text-xl font-serif text-[#1c1c1c] mb-2 group-hover:text-[#d4a373] transition">{course.title}</h3>
              <p className="text-gray-500 text-sm font-medium">{course.price}</p>
            </div>
          ))}
        </div>
        
        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-16 space-x-2">
          <button 
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`w-10 h-10 rounded-full flex items-center justify-center border transition ${currentPage === 1 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-300 text-[#1c1c1c] hover:bg-gray-50'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          
          <div className="flex space-x-2 mx-4">
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition ${currentPage === i + 1 ? 'bg-[#d4a373] text-white' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          
          <button 
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`w-10 h-10 rounded-full flex items-center justify-center border transition ${currentPage === totalPages ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-300 text-[#1c1c1c] hover:bg-gray-50'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Courses;
