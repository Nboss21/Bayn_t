import React, { useEffect, useState } from 'react';
import GalleryHero from '../components/gallery/GalleryHero';
import GalleryGrid from '../components/gallery/GalleryGrid';
import GalleryCTA from '../components/gallery/GalleryCTA';
import { publicService } from '../services/applicationService';

const Gallery = () => {
  const [images, setImages] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => { publicService.gallery({ per_page: 100 }).then((data) => setImages(data?.data || data || [])).catch(() => setImages([])); }, []);

  return (
    <div className="bg-[#fdfbf8] min-h-screen">
      {/* Top Brown Header Placeholder */}
      <div className="bg-[#a87b52] w-full h-[84px] md:h-[90px]"></div>
      
      <GalleryHero />
      <GalleryGrid images={images} />
      <GalleryCTA />
    </div>
  );
};

export default Gallery;
