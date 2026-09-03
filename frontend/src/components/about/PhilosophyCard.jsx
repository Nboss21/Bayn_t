import React from 'react';

const PhilosophyCard = ({ title, description, image, hasBottomAccent = false }) => {
  return (
    <div
      className={`relative rounded-sm overflow-hidden flex flex-col justify-end ${
        hasBottomAccent ? 'border-b-4 border-[#c9a254]' : ''
      }`}
      style={{ minHeight: '340px' }}
    >
      {/* Full-bleed background image */}
      {image && (
        <>
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </>
      )}

      {/* Text content at the bottom */}
      <div className="relative z-10 p-8">
        <h3 className="text-[#c9a254] text-base font-semibold mb-3 leading-snug">{title}</h3>
        <p className="text-white/90 text-xs leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default PhilosophyCard;
