import React from 'react';
import FAQCategory from '../components/faq/FAQCategory';
import FAQContactCTA from '../components/faq/FAQContactCTA';
import { FAQ_CATEGORIES } from '../utils/faqData';

const FAQPage = () => {
  return (
    <div className="bg-[#e8ede0] min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-xl mx-auto w-[90%]">

        {/* Page heading */}
        <div className="text-center mb-14">
          <h1 className="font-serif text-[36px] md:text-[42px] text-[#1c1c1c] leading-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-[13px] text-[#1c1c1c]/60 leading-relaxed max-w-sm mx-auto">
            Find answers to common questions about our programs, admissions process, and student life at Ethiopian Makeup Academy.
          </p>
        </div>

        {/* FAQ categories */}
        {FAQ_CATEGORIES.map((category) => (
          <FAQCategory
            key={category.id}
            title={category.title}
            items={category.items}
          />
        ))}

        {/* CTA card */}
        <FAQContactCTA />

      </div>
    </div>
  );
};

export default FAQPage;
