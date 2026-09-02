import React, { useState, useEffect } from 'react';

const TableOfContents = () => {
  const [activeSection, setActiveSection] = useState('section-1');

  const sections = [
    '1. Information Collection',
    '2. Use of Information',
    '3. Data Protection',
    '4. Cookie Policy',
    '5. Terms of Service',
    '6. Contact Information',
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find all intersecting entries
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // If multiple are visible, pick the first one (top-most)
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      { 
        rootMargin: '-20% 0px -70% 0px' // adjust margin so it highlights when scrolling near top third
      }
    );

    sections.forEach((_, index) => {
      const el = document.getElementById(`section-${index + 1}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      // smooth scroll taking the fixed navbar into account
      const top = element.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#e4ebd9] rounded-[30px] p-8 lg:p-10 sticky top-32 transition-all">
      <h3 className="text-2xl font-serif text-[#2a362a] mb-8">Table of Contents</h3>
      <ul className="space-y-5">
        {sections.map((item, index) => {
          const sectionId = `section-${index + 1}`;
          const isActive = activeSection === sectionId;
          
          return (
            <li key={index}>
              <a 
                href={`#${sectionId}`} 
                onClick={(e) => handleClick(e, sectionId)}
                className={`text-[13px] transition-all flex items-start ${
                  isActive 
                    ? 'text-[#2a362a] font-bold' 
                    : 'text-[#4a5c4a] hover:text-[#2a362a] font-normal'
                }`}
              >
                {item}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TableOfContents;
