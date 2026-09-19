import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { adminService } from '../../../services/applicationService';
import ProgramInformationCard from '../program-edit/ProgramInformationCard';
import PublicProgramCard from '../program-edit/PublicProgramCard';
import ProgramOverviewCard from '../program-edit/ProgramOverviewCard';
import ProgramStatusCard from '../program-edit/ProgramStatusCard';
import CurrentIntakeCard from '../program-edit/CurrentIntakeCard';

function getStatusBadgeClass(status) {
  const classes = {
    Open: 'bg-[#ecfccb] text-[#3f6212] border-[#d9f99d]',
    Upcoming: 'bg-[#fffbeb] text-[#d97706] border-[#fde68a]',
    Closed: 'bg-[#f3f4f6] text-[#4b5563] border-[#e5e7eb]',
  };
  return classes[status] || 'bg-[#f3f4f6] text-[#4b5563] border-[#e5e7eb]';
}

function getStatusDotClass(status) {
  if (status === 'Open') return 'bg-[#65a30d]';
  if (status === 'Upcoming') return 'bg-[#f59e0b]';
  if (status === 'Closed') return 'bg-[#9ca3af]';
  return 'bg-[#d1d5db]';
}

export default function ProgramFormLayout({
  mode = 'edit',
  program = null,
  options = {},
  backPath = '/super-admin/programs',
}) {
  const navigate = useNavigate();
  const isAdd = mode === 'add';
  const title = program?.name || (isAdd ? 'New Program' : 'Program');
  const [values, setValues] = useState({
    name: program?.name || '',
    description: program?.description || '',
    level: program?.level || options.levels?.[0] || '',
    duration: program?.duration && program.duration !== '—' ? String(program.duration) : '',
    durationUnit: program?.durationUnit || options.durationUnits?.[0] || 'Weeks',
    status: program?.status || options.statuses?.[0] || '',
    intakeMonths: program?.intakeMonths || [],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const updateValue = (key, value) => setValues((current) => ({ ...current, [key]: value }));

  const handleCancel = () => navigate(backPath);
  const handleSubmit = async () => {
    if (!values.intakeMonths.length) {
      setError('Select at least one intake month before saving this program.');
      return;
    }
    setSaving(true);
    setError('');
    const payload = {
      name: values.name,
      slug: program?.slug || values.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description: values.description,
      category: program?.category || 'makeup',
      level: values.level,
      status: values.status.toLowerCase(),
      tuition_fee: program?.tuition_fee || 0,
      fee_currency: program?.fee_currency || 'USD',
      duration_weeks: Number(values.duration),
      intake_months: values.intakeMonths,
    };
    try {
      if (isAdd) await adminService.createProgram(payload);
      else await adminService.updateProgram(program.id, payload);
      navigate(backPath);
    } catch (requestError) {
      setError(requestError.message || 'The program could not be saved.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full pb-12">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center text-sm text-[#6b7280] mb-4">
          <Link to={backPath} className="hover:text-[#111827] flex items-center transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Programs
          </Link>
          <span className="mx-2 text-[#d1d5db]">•</span>
          <span>Academic Management Directory</span>
        </div>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[28px] font-semibold text-[#111827] leading-tight">{title}</h1>
              {!isAdd && program?.status && (
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(program.status)}`}>
                  <span className={`w-1.5 h-1.5 ${getStatusDotClass(program.status)} rounded-full mr-1.5`}></span>
                  {program.status}
                </span>
              )}
              {isAdd && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#f3f4f6] text-[#6b7280] border border-[#e5e7eb]">
                  Draft
                </span>
              )}
            </div>
            <p className="text-[#6b7280] text-[15px] mt-1.5">
              {isAdd ? 'Create a new program and set its details.' : 'View and update the program information.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-white border border-[#d1d5db] rounded-lg text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="px-4 py-2 bg-[#1f2937] text-white rounded-lg text-sm font-medium hover:bg-[#111827] transition-colors shadow-sm cursor-pointer"
            >
              {saving ? 'Saving...' : (isAdd ? 'Create Program' : 'Save Changes')}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Wider) */}
        <div className="lg:col-span-2 space-y-6">
          <ProgramInformationCard program={program} options={options} values={values} onChange={updateValue} />
          <PublicProgramCard />
          <ProgramOverviewCard program={program} />
        </div>

        {/* Right Column (Narrower) */}
        <div className="space-y-6">
          <ProgramStatusCard program={program} options={options} value={values.status} onChange={(value) => updateValue('status', value)} />
          <CurrentIntakeCard program={program} options={options} value={values.intakeMonths} onChange={(value) => updateValue('intakeMonths', value)} />
        </div>
      </div>
      {error && <p role="alert" className="mt-4 text-sm text-[#b91c1c]">{error}</p>}

      {/* Bottom Actions */}
      <div className="mt-8 flex justify-end gap-3 pt-6">
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-white border border-[#d1d5db] rounded-lg text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="px-4 py-2 bg-[#1f2937] text-white rounded-lg text-sm font-medium hover:bg-[#111827] transition-colors shadow-sm cursor-pointer"
        >
          {saving ? 'Saving...' : (isAdd ? 'Create Program' : 'Save Changes')}
        </button>
      </div>
    </div>
  );
}