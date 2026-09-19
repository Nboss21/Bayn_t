import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import StudentSummaryCard from '../components/StudentSummaryCard';
import AvailableClassesSection from '../components/AvailableClassesSection';
import AssignmentActionFooter from '../components/AssignmentActionFooter';
import { registrarService } from '../services/applicationService';
import { scheduleParts } from '../utils/schedule';

const mapClass = (item) => {
  const schedule = scheduleParts(item.schedule);
  const totalSeats = Number(item.capacity || 0);
  const seatsAvailable = Number(item.available_capacity ?? Math.max(0, totalSeats - Number(item.enrolled_count || 0)));

  return {
    ...item,
    title: item.name,
    seatsAvailable,
    totalSeats,
    programInfo: [item.program?.name, item.intake?.name].filter(Boolean).join(' · '),
    schedule: schedule.label,
    time: schedule.time,
    instructor: item.teacher?.name || 'Instructor not assigned',
    instructorRole: item.teacher?.role_label || 'Lead instructor',
    isFull: seatsAvailable <= 0,
  };
};

export default function ClassAssignmentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    registrarService.application(id)
      .then((record) => Promise.all([
        Promise.resolve(record),
        registrarService.classes({ program_id: record.program_id, intake_id: record.intake_id, per_page: 100 }),
      ]))
      .then(([record, response]) => {
        if (!active) return;
        const availableClasses = (response?.data || response || []).map(mapClass);
        setApplication(record);
        setClasses(availableClasses);
        setSelectedClassId(availableClasses.find((item) => !item.isFull)?.id || null);
      })
      .catch((err) => {
        if (active) setError(err.message || 'The application classes could not be loaded.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [id]);

  const selectedClass = useMemo(
    () => classes.find((item) => String(item.id) === String(selectedClassId)) || null,
    [classes, selectedClassId],
  );

  const assignClass = async () => {
    if (!selectedClass || assigning) return;
    setAssigning(true);
    setError('');
    try {
      const student = await registrarService.enroll(id, selectedClass.id);
      navigate(`/registrar/students/${student.id}`);
    } catch (err) {
      setError(err.message || 'The student could not be assigned to this class.');
    } finally {
      setAssigning(false);
    }
  };

  if (loading) return <div className="py-20 text-center text-[#6b7280]">Loading available classes…</div>;

  if (!application) {
    return <div className="py-20 text-center text-[#6b7280]">{error || 'Application not found.'}</div>;
  }

  return (
    <div className="pb-24">
      <button onClick={() => navigate(`/registrar/applications/${id}`)} className="flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-[#111827] transition-colors mb-5">
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Application
      </button>

      <div className="flex items-start justify-between mb-1">
        <div>
          <h1 className="text-[28px] font-bold text-[#111827] leading-tight mb-1">Assign to Class</h1>
          <p className="text-sm text-[#6b7280]">Select an available class for this student’s program and intake.</p>
        </div>
        <div className="flex-shrink-0 mt-1 px-4 py-1.5 rounded-full bg-[#f3f4f6] text-xs font-medium text-[#6b7280] whitespace-nowrap">Step 2 of 2 · Final Cohort Enrollment</div>
      </div>

      <StudentSummaryCard application={application} />
      {error && <p role="alert" className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <AvailableClassesSection classes={classes} selectedClassId={selectedClassId} onSelectClass={setSelectedClassId} application={application} />
      <AssignmentActionFooter selectedClass={selectedClass} onAssign={assignClass} busy={assigning} />
    </div>
  );
}
