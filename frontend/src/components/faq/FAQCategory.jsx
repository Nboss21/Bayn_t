import React from 'react';
import FAQAccordionItem from './FAQAccordionItem';

const FAQCategory = ({ title, items }) => {
  return (
    <div className="mb-12">
      {/* Category heading + divider */}
      <div className="flex items-center gap-4 mb-5">
        <h2 className="font-serif italic text-[22px] text-[#8b5e3c] whitespace-nowrap">
          {title}
        </h2>
        <div className="flex-1 h-px bg-[#c4c8be]" />
      </div>

      {/* Accordion items */}
      <div>
        {items.map((item) => (
          <FAQAccordionItem
            key={item.id}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQCategory;
