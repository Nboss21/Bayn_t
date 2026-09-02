import React, { useEffect } from 'react';
import GalleryHero from '../components/gallery/GalleryHero';
import GalleryGrid from '../components/gallery/GalleryGrid';
import GalleryCTA from '../components/gallery/GalleryCTA';

const Gallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fdfbf8] min-h-screen">
      {/* Top Brown Header Placeholder */}
      <div className="bg-[#a87b52] w-full h-[84px] md:h-[90px]"></div>
      
      <GalleryHero />
      <GalleryGrid />
      <GalleryCTA />
    </div>
  );
};

export default Gallery;
