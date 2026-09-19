import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import ClassesHeader from '../components/ClassesHeader';
import { registrarService } from '../services/applicationService';
import { scheduleLabel } from '../utils/schedule';

export default function ClassesPage() {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState(null);
  const [savedId, setSavedId] = useState(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const [classResult, teacherResult] = await Promise.all([
        registrarService.classes({ per_page: 100 }),
        registrarService.teachers(),
      ]);
      setClasses(classResult?.data || classResult || []);
      setTeachers(teacherResult?.data || teacherResult || []);
    } catch (err) {
      setError(err.message || 'Classes and teachers could not be loaded.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const rows = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return classes;
    return classes.filter((item) => [item.name, item.program?.name, item.intake?.name, item.teacher?.name].some((value) => value?.toLowerCase().includes(query)));
  }, [classes, search]);

  const eligibleTeachers = (classItem) => teachers.filter((teacher) => (teacher.programs || []).some((program) => String(program.id) === String(classItem.program_id)));

  const assignTeacher = async (classItem, teacherId) => {
    setSavingId(classItem.id);
    setSavedId(null);
    setError('');
    try {
      const updated = await registrarService.assignTeacher(classItem.id, teacherId);
      const next = updated || { ...classItem, teacher_id: teacherId, teacher: teachers.find((teacher) => String(teacher.id) === String(teacherId)) || null };
      setClasses((current) => current.map((item) => (item.id === classItem.id ? { ...item, ...next } : item)));
      setSavedId(classItem.id);
    } catch (err) {
      setError(err.message || 'The teacher assignment could not be saved.');
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ClassesHeader />
      <div className="mb-6 flex items-center justify-between gap-4">
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by class, program, intake, or teacher" className="w-full max-w-[520px] rounded-lg border border-[#d1d5db] bg-white px-4 py-2.5 text-sm focus:border-[#9ca3af] focus:outline-none" />
        <button type="button" onClick={load} className="rounded-lg border border-[#d1d5db] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-gray-50">Refresh</button>
      </div>
      {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      {loading ? <div className="rounded-lg border border-[#e5e7eb] bg-white p-8 text-center text-sm text-gray-500">Loading classes and eligible teachers…</div> : (
        <div className="overflow-x-auto rounded-lg border border-[#e5e7eb] bg-white">
          <table className="w-full min-w-[900px] table-auto">
            <thead><tr className="border-b border-[#e5e7eb] bg-[#f9fafb]">
              {['Program', 'Intake / Class', 'Schedule', 'Students', 'Teacher assignment'].map((heading) => <th key={heading} className="px-4 py-3.5 text-left text-[13px] font-semibold tracking-wide text-[#6b7280]">{heading}</th>)}
            </tr></thead>
            <tbody>
              {rows.map((classItem) => {
                const options = eligibleTeachers(classItem);
                return <tr key={classItem.id} className="border-b border-[#e5e7eb] last:border-0 hover:bg-[#fafafa]">
                  <td className="px-4 py-5 text-sm font-medium text-[#111827]">{classItem.program?.name || '—'}<div className="mt-1 text-xs text-gray-500">{classItem.name}</div></td>
                  <td className="px-4 py-5 text-sm text-[#6b7280]">{classItem.intake?.name || '—'}</td>
                  <td className="px-4 py-5 text-sm text-[#6b7280]">{scheduleLabel(classItem.schedule)}</td>
                  <td className="px-4 py-5 text-sm text-[#111827]">{classItem.enrolled_count || 0} / {classItem.capacity}</td>
                  <td className="px-4 py-5">
                    <div className="flex items-center gap-2">
                      <select value={classItem.teacher_id || ''} onChange={(event) => assignTeacher(classItem, event.target.value)} disabled={savingId === classItem.id} className="w-full max-w-[270px] rounded-lg border border-[#d1d5db] bg-white px-3 py-2 text-sm disabled:opacity-60">
                        <option value="">Unassigned</option>
                        {options.map((teacher) => <option key={teacher.id} value={teacher.id}>{teacher.name}</option>)}
                      </select>
                      {savingId === classItem.id && <Loader2 className="h-4 w-4 animate-spin text-gray-500" />}
                      {savedId === classItem.id && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                    </div>
                    {options.length === 0 && <p className="mt-1 text-xs text-amber-700">No teacher is assigned to this program.</p>}
                  </td>
                </tr>;
              })}
              {!rows.length && <tr><td colSpan="5" className="px-4 py-10 text-center text-sm text-gray-500">No classes found.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
