import React from 'react';
import { Settings, ChevronRight } from 'lucide-react';

const steps = [
  { number: 1, label: 'Draft Created', active: true },
  { number: 2, label: 'Atelier Review', active: false },
  { number: 3, label: 'Ready to Publish', active: false },
  { number: 4, label: 'Live on Web', active: false },
];

export default function ContentLifecycleBar() {
  return (
    <div className="flex items-center gap-2 py-3 px-4 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg mb-8">
      <Settings className="w-4 h-4 text-[#9ca3af]" />
      <span className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider mr-2">
        Content Lifecycle
      </span>
      <span className="text-[#d1d5db] mx-1">|</span>
      {steps.map((step, i) => (
        <React.Fragment key={step.number}>
          <span
            className={`text-xs font-medium ${
              step.active
                ? 'text-[#111827] bg-white px-3 py-1 rounded-md border border-[#e5e7eb] shadow-sm'
                : 'text-[#6b7280]'
            }`}
          >
            {step.number}. {step.label}
          </span>
          {i < steps.length - 1 && (
            <ChevronRight className="w-3.5 h-3.5 text-[#9ca3af]" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
