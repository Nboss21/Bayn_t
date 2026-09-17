import React from 'react';
import GalleryCard from './GalleryCard';
import ProgramsCard from './ProgramsCard';
import CourseImagesCard from './CourseImagesCard';
import NewsletterCard from './NewsletterCard';
import PublicPreviewCard from './PublicPreviewCard';

export default function ManagedAreasSection() {
  return (
    <section className="mb-10">
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-[#111827]">Managed Areas</h2>
        <span className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider">
          5 Modules Active
        </span>
      </div>

      {/* Top row: 3 cards */}
      <div className="grid grid-cols-3 gap-5 mb-5">
        <GalleryCard />
        <ProgramsCard />
        <CourseImagesCard />
      </div>

      {/* Bottom row: 2 cards */}
      <div className="grid grid-cols-2 gap-5">
        <NewsletterCard />
        <PublicPreviewCard />
      </div>
    </section>
  );
}
