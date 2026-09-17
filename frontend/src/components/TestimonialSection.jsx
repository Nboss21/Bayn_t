import React, { useState } from 'react';
import { testimonials } from '../data/home/testimonialsData';

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-espresso via-espresso-soft to-espresso py-24 md:py-32 px-4 text-center">
      {/* Ambient glow + grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-champagne/10 blur-[140px]"
      />
      <div className="grain-overlay grain-overlay--soft" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl w-full px-6 md:px-16">
        {/* Eyebrow */}
        <p className="mb-8 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-champagne">
          <span className="h-[1px] w-10 bg-champagne/70" />
          Student Voice
          <span className="h-[1px] w-10 bg-champagne/70" />
        </p>

        {/* Stars */}
        <div className="mb-9 flex justify-center space-x-1.5">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="h-5 w-5 text-champagne" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Quote — re-animates on change */}
        <div
          key={testimonials[currentIndex].id}
          className="animate-[fadeInUp_0.6s_ease_both] motion-reduce:animate-none"
        >
          <h3 className="font-display text-[26px] font-light italic leading-relaxed text-cream md:text-[34px]">
            "{testimonials[currentIndex].quote}"
          </h3>
          <div className="mt-8">
            <p className="text-[15px] font-semibold text-cream">{testimonials[currentIndex].author}</p>
            <p className="mt-1 text-[13px] text-champagne-light/80">{testimonials[currentIndex].role}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-12 flex items-center justify-center gap-8">
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-cream/70 transition-all duration-300 hover:border-champagne hover:text-champagne hover:-translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
          >
            <svg className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={currentIndex === index ? 'true' : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne ${
                  currentIndex === index ? 'w-7 bg-champagne' : 'w-1.5 bg-white/25 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-cream/70 transition-all duration-300 hover:border-champagne hover:text-champagne hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
          >
            <svg className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;