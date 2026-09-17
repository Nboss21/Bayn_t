import React from 'react';
import ContentAttentionItem from './ContentAttentionItem';

const attentionItems = [
  {
    type: 'gallery',
    title: 'Gallery update',
    status: 'Ready for Review',
    lines: [
      '2 gallery items are ready for review',
      'submitted by',
      'Senior Instructor Sarah Chen.',
    ],
  },
  {
    type: 'program',
    title: 'Program content',
    status: 'Draft',
    lines: [
      '1 program update is',
      'currently in draft: "Advanced',
      'Editorial Prosthetics"',
      'prerequisite changes.',
    ],
  },
  {
    type: 'website',
    title: 'Website content',
    status: 'Ready to Publish',
    lines: [
      '3 verified changes are staging-',
      'approved and ready to',
      'deploy to production.',
    ],
  },
];

export default function ContentNeedsAttentionSection() {
  return (
    <div className="flex-1 min-w-0">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-1">
        <h2 className="text-lg font-semibold text-[#111827]">Needs attention</h2>
        <span className="text-[11px] font-semibold text-white bg-[#dc2626] px-2.5 py-0.5 rounded-full">
          3 pending
        </span>
      </div>
      <p className="text-xs text-[#9ca3af] mb-4">Administrative review</p>

      {/* Attention items */}
      <div>
        {attentionItems.map((item, i) => (
          <ContentAttentionItem key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
