import React from 'react';

const Banner = () => {
  return (
    <section className="bg-[#f0f4ea] py-28 px-10">
      <div className="max-w-4xl mx-auto bg-[#e4ecd9] py-16 px-12 rounded-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-[#1c1c1c] mb-8">Learn Courses, fast</h2>
        <a href="#" className="text-xs font-bold uppercase tracking-wider text-[#1c1c1c] border-b border-[#1c1c1c] pb-1 hover:text-[#d4a373] hover:border-[#d4a373] transition">Start now</a>
      </div>
      
      <div className="max-w-5xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-sm px-4">
        <div>
          <p className="font-serif text-lg text-[#1c1c1c] mb-3">Lifetime Access</p>
          <p className="text-gray-500 text-xs leading-relaxed">Learn at your own pace with unlimited access</p>
        </div>
        <div>
          <p className="font-serif text-lg text-[#1c1c1c] mb-3">Expert Tutors</p>
          <p className="text-gray-500 text-xs leading-relaxed">Learn from industry pros and active artists</p>
        </div>
        <div>
          <p className="font-serif text-lg text-[#1c1c1c] mb-3">Certificate</p>
          <p className="text-gray-500 text-xs leading-relaxed">Get certified upon course completion</p>
        </div>
        <div>
          <p className="font-serif text-lg text-[#1c1c1c] mb-3">Community</p>
          <p className="text-gray-500 text-xs leading-relaxed">Join our alumni network of professionals</p>
        </div>
      </div>
    </section>
  );
};

export default Banner;

