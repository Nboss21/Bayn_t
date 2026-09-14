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

        {/* View More */}
        <Reveal delay={120} className="mt-14">
          <Link
            to="/gallery"
            className="group inline-flex items-center gap-3 rounded-full border border-espresso/20 px-10 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:bg-espresso hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
          >
            View Gallery
            <svg
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default Gallery;