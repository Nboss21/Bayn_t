import React, { useState } from 'react';
import { testimonials } from '../data/home/testimonialsData';

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="bg-[#4f574d] py-24 px-4 relative flex items-center justify-center text-center">
      <div className="max-w-4xl mx-auto w-full px-12 md:px-20 relative">
        
        {/* Left Arrow */}
        <button 
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#c0cdb3] rounded text-white flex items-center justify-center hover:bg-[#aebba1] transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>

        {/* Content */}
        <div className="flex flex-col items-center">
          {/* Stars */}
          <div className="flex space-x-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Quote */}
          <h3 className="text-3xl md:text-[34px] text-white font-serif mb-12 leading-relaxed">
            "{testimonials[currentIndex].quote}"
          </h3>

          {/* Author */}
          <div>
            <p className="text-white font-bold text-[15px] mb-1">{testimonials[currentIndex].author}</p>
            <p className="text-white/80 text-[13px]">{testimonials[currentIndex].role}</p>
          </div>
        </div>

        {/* Right Arrow */}
        <button 
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#c0cdb3] rounded text-white flex items-center justify-center hover:bg-[#aebba1] transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </button>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
