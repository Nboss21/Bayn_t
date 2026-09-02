import React from 'react';

const Gallery = () => {
  return (
    <section className="py-28 px-10 bg-white text-center">
      <p className="text-xs text-[#5c7a52] uppercase tracking-widest font-semibold mb-4">Our Work</p>
      <h2 className="text-4xl md:text-5xl font-serif text-[#1c1c1c] mb-6">Gallery</h2>
      <p className="text-gray-500 text-sm max-w-md mx-auto mb-16 leading-relaxed">Take a look at some of our students' amazing work and behind-the-scenes moments.</p>
      
      <div className="max-w-6xl mx-auto w-[90%] grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-gray-200 h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer">
          <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop" alt="Gallery 1" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
        </div>
        <div className="bg-gray-200 h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer">
          <img src="https://images.unsplash.com/photo-1512496015851-a912bbbc58e0?q=80&w=600&auto=format&fit=crop" alt="Gallery 2" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
        </div>
        <div className="bg-gray-200 h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer">
          <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop" alt="Gallery 3" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
        </div>
        <div className="bg-gray-200 h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer">
          <img src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=600&auto=format&fit=crop" alt="Gallery 4" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
        </div>
      </div>
    </section>
  );
};

export default Gallery;

