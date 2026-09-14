import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { galleryImages } from '../data/home/galleryData';
import { publicService } from '../services/applicationService';

const Gallery = () => {
  const [images, setImages] = useState([]);
  useEffect(() => { publicService.gallery({ per_page: 100 }).then((data) => setImages(data?.data || data || [])).catch(() => setImages([])); }, []);
  const visibleImages = images.length ? images.map((image) => ({ src: image.url || image.image_url, alt: image.category || 'Academy gallery' })) : galleryImages;
  return (
    <section className="py-20 px-6 md:px-10 bg-white text-center">
      <h2 className="text-4xl md:text-5xl font-serif text-[#1c1c1c] mb-4">Gallery</h2>
      <p className="text-gray-700 text-base max-w-md mx-auto mb-12">
        Real work from our students, instructors, and academy events.
      </p>
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Column 1 */}
        <div className="flex flex-col gap-6">
          <img src={visibleImages[0]?.src} alt={visibleImages[0]?.alt} className="w-full rounded-2xl object-cover shadow-sm" />
        </div>
        
        {/* Column 2 */}
        <div className="flex flex-col gap-6">
          {visibleImages.slice(1, 4).map((image) => <img key={image.src} src={image.src} alt={image.alt} className="w-full rounded-2xl object-cover shadow-sm" />)}
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-6">
          {visibleImages.slice(4, 6).map((image) => <img key={image.src} src={image.src} alt={image.alt} className="w-full rounded-2xl object-cover shadow-sm" />)}
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
