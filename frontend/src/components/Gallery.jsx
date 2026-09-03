import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/womans/woman 1.png';
import img2 from '../assets/womans/woman 2.png';
import img3 from '../assets/womans/woman 3.png';
import img4 from '../assets/womans/woman 4.png';
import img5 from '../assets/womans/woman 5.jpg';
import img6 from '../assets/womans/woman 6.png';

const Gallery = () => {
  return (
    <section className="py-20 px-6 md:px-10 bg-white text-center">
      <h2 className="text-4xl md:text-5xl font-serif text-[#1c1c1c] mb-4">Gallery</h2>
      <p className="text-gray-700 text-base max-w-md mx-auto mb-12">
        Real work from our students, instructors, and academy events.
      </p>
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Column 1 */}
        <div className="flex flex-col gap-6">
          <img src={img1} alt="Gallery 1" className="w-full rounded-2xl object-cover shadow-sm" />
        </div>
        
        {/* Column 2 */}
        <div className="flex flex-col gap-6">
          <img src={img2} alt="Gallery 2" className="w-full rounded-2xl object-cover shadow-sm" />
          <img src={img3} alt="Gallery 3" className="w-full rounded-2xl object-cover shadow-sm" />
          <img src={img4} alt="Gallery 4" className="w-full rounded-2xl object-cover shadow-sm" />
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-6">
          <img src={img5} alt="Gallery 5" className="w-full rounded-2xl object-cover shadow-sm" />
          <img src={img6} alt="Gallery 6" className="w-full rounded-2xl object-cover shadow-sm" />
        </div>
      </div>

      <Link to="/gallery">
        <button className="mt-12 px-8 py-2.5 bg-[#E5CB74] text-[#1c1c1c] font-medium rounded-lg border border-[#BFA75B] hover:bg-[#d6bc65] transition shadow-sm">
          View More
        </button>
      </Link>
    </section>
  );
};

export default Gallery;

