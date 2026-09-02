import React from 'react';

const OurStory = () => {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto w-[90%] flex flex-col md:flex-row items-start gap-16">
        {/* Left — text */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-serif text-[#1f1d1b] mb-8 leading-tight">
            Our Story
          </h2>
          <p className="text-[#5a5550] text-sm leading-[1.85] mb-5">
            Founded in the heart of Addis Ababa, Ethiopian Beauty Academy began with a singular mission: to bridge the gap
            between traditional Ethiopian beauty rituals and modern global professional makeup standards.
          </p>
          <p className="text-[#5a5550] text-sm leading-[1.85]">
            We recognised the immense raw talent within our community and established an institution that provides
            industry techniques, business knowledge, and a deep understanding of artistry, business, and cultural pride.
            Today, our graduates lead the industry across local, national, and international spheres.
          </p>
        </div>

        {/* Right — image placeholder */}
        <div className="flex-shrink-0 w-full md:w-[42%] aspect-[4/5] bg-[#e8e4df] rounded-sm" />
      </div>
    </section>
  );
};

export default OurStory;
