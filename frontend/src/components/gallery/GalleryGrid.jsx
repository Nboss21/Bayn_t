import React from 'react';
import { galleryImages } from '../../data/home/galleryData';

const colSpanClasses = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
};

const heightClasses = {
  tall: 'h-[300px] md:h-[450px]',
  medium: 'h-[200px] md:h-[250px]',
  short: 'h-[150px] md:h-[250px]',
};

const GalleryGrid = ({ images }) => {
  const resolvedImages = images?.length
    ? images.map((image, index) => ({ id: image.id || index, src: image.url || image.image_url, alt: image.category || 'Academy gallery', colSpan: 1, height: index === 0 ? 'tall' : 'medium' }))
    : galleryImages;
  return (
    <div className="w-full flex justify-center py-4 px-4 bg-[#fdfbf8] pb-32">
      <div className="w-full max-w-[800px] flex flex-col gap-4 md:gap-6">
        
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          {resolvedImages.map((image) => (
            <div key={image.id} className={colSpanClasses[image.colSpan]}>
              <img src={image.src} alt={image.alt} loading="lazy" className={`w-full ${heightClasses[image.height]} object-cover`} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default GalleryGrid;
