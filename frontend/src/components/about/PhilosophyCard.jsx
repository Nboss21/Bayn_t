import React from 'react';

const PhilosophyCard = ({ title, description, hasBottomAccent = false }) => {
  return (
    <div
      className={`bg-white rounded-sm p-8 flex flex-col justify-between ${
        hasBottomAccent ? 'border-b-4 border-[#c9a254]' : ''
      }`}
      style={{ minHeight: '340px' }}
    >
      {/* Empty top space — mimics the image/visual area in the card */}
      <div className="flex-1 mb-6" />

      {/* Text content at the bottom */}
      <div>
        <h3 className="text-[#c9a254] text-base font-semibold mb-3 leading-snug">{title}</h3>
        <p className="text-[#5a5550] text-xs leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default PhilosophyCard;
