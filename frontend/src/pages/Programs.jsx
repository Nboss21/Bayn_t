import React, { useEffect, useState } from 'react';
import ComparePrograms from '../components/programs/ComparePrograms';
import EnrollmentCTA from '../components/programs/EnrollmentCTA';
import { publicContentService } from '../services/applicationService';

const normalizeProgram = (program) => ({
  ...program,
  duration: program.duration || (program.duration_weeks ? `${program.duration_weeks} WEEKS` : '—'),
  level: program.level || '—',
});

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicContentService.programs({ per_page: 100 })
      .then((result) => setPrograms((result?.data || result || []).map(normalizeProgram)))
      .catch(() => setPrograms([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full bg-white pt-24 pb-4">
      {loading ? <div className="min-h-[420px] flex items-center justify-center text-gray-500">Loading programs…</div> : <ComparePrograms programs={programs} />}
      <EnrollmentCTA />
    </div>
  );
};

export default Programs;
