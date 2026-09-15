import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StudentSummaryCard from '../components/StudentSummaryCard';
import AvailableClassesSection from '../components/AvailableClassesSection';
import AssignmentActionFooter from '../components/AssignmentActionFooter';

const MOCK_CLASSES = [
  {
    id: 'pma-morning',
    title: 'PMA - Morning',
    seatsAvailable: 2,
    totalSeats: 20,
    programInfo: 'Professional Makeup Artistry · Sep 2026',
    schedule: 'Mon-Fri',
    time: '9:00 AM - 12:00 PM',
    instructor: 'Hana Alemu',
    instructorRole: 'Lead Instructor',
    isFull: false,
  },
  {
    id: 'pma-afternoon',
    title: 'PMA - Afternoon',
    seatsAvailable: 0,
    totalSeats: 20,
    programInfo: 'Professional Makeup Artistry · Sep 2026',
    schedule: 'Mon-Fri',
    time: '2:00 PM - 5:00 PM',
    instructor: 'Ruth Bekele',
    instructorRole: 'Lead Instructor',
    isFull: true,
  },
  {
    id: 'pma-evening',
    title: 'PMA - Evening',
    seatsAvailable: 1,
    totalSeats: 20,
    programInfo: 'Professional Makeup Artistry · Sep 2026',
    schedule: 'Mon-Fri',
    time: '5:30 PM - 8:30 PM',
    instructor: 'Selamawit Tesfaye',
    instructorRole: 'Lead Instructor',
    isFull: false,
  },
];

export default function ClassAssignmentPage() {
  const navigate = useNavigate();
  const [selectedClassId, setSelectedClassId] = useState('pma-morning');

  const selectedClass = MOCK_CLASSES.find((c) => c.id === selectedClassId);

  return (
    <div className="pb-24">
      {/* Back link */}
      <button
        onClick={() => navigate('/registrar/applications')}
        className="flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-[#111827] transition-colors mb-5"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Application
      </button>

      {/* Page title row */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <h1 className="text-[28px] font-bold text-[#111827] leading-tight mb-1">
            Assign to Class
          </h1>
          <p className="text-sm text-[#6b7280]">
            Select a class that matches the student's program and intake period.
          </p>
        </div>
        {/* Step badge */}
        <div className="flex-shrink-0 mt-1 px-4 py-1.5 rounded-full bg-[#f3f4f6] text-xs font-medium text-[#6b7280] whitespace-nowrap">
          Step 2 of 2 · Final Cohort Enrollment
        </div>
      </div>

      {/* Student summary */}
      <StudentSummaryCard />

      {/* Available classes list */}
      <AvailableClassesSection
        selectedClassId={selectedClassId}
        onSelectClass={setSelectedClassId}
      />

      {/* Sticky footer */}
      <AssignmentActionFooter selectedClass={selectedClass} />
    </div>
  );
}
