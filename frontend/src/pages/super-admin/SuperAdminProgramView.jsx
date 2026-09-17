import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Pencil, Clock, Hash, GraduationCap, CalendarDays } from 'lucide-react';
import ProgramOverviewCard from '../../components/super-admin/program-edit/ProgramOverviewCard';
import PublicProgramCard from '../../components/super-admin/program-edit/PublicProgramCard';
import useSuperAdminPrograms from '../../hooks/useSuperAdminPrograms';

const STATUS_META = {
  Open: {
    dot: 'bg-[#65a30d]',
    badge: 'bg-[#ecfccb] text-[#3f6212] border-[#d9f99d]',
    description: 'Open to admissions and visible across HOB workflows.',
  },
  Upcoming: {
    dot: 'bg-[#f59e0b]',
    badge: 'bg-[#fffbeb] text-[#d97706] border-[#fde68a]',
    description: 'Scheduled for an upcoming admission cycle.',
  },
  Closed: {
    dot: 'bg-[#9ca3af]',
    badge: 'bg-[#f3f4f6] text-[#4b5563] border-[#e5e7eb]',
    description: 'Not accepting admissions at this time.',
  },
};

function DetailTile({ icon: Icon, label, value }) {
  return (
    <div className="bg-[#fafaf9] border border-[#e5e7eb] rounded-lg p-4">
      <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#6b7280] uppercase tracking-wider mb-2">
        {Icon && <Icon className="w-3.5 h-3.5" />}
        {label}
      </div>
      <p className="text-[15px] font-semibold text-[#111827]">{value}</p>
    </div>
  );
}

function SidebarRow({ label, value, mono }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <span className="text-[13px] text-[#6b7280]">{label}</span>
      <span className={`text-[14px] font-medium text-[#111827] ${mono ? 'font-mono text-[13px]' : ''}`}>{value}</span>
    </div>
  );
}

export default function SuperAdminProgramView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { programsModel, loading } = useSuperAdminPrograms();

  if (loading || !programsModel) {
    return (
      <div className="w-full">
        <div className="h-6 w-56 bg-gray-100 rounded mb-6 animate-pulse"></div>
        <div className="h-48 bg-gray-100 rounded-2xl animate-pulse"></div>
        <div className="h-32 bg-gray-100 rounded-xl mt-6 animate-pulse"></div>
        <div className="h-64 bg-gray-100 rounded-xl mt-6 animate-pulse"></div>
      </div>
    );
  }

  const program = programsModel.findById(id);

  if (!program) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20">
        <p className="text-[16px] text-[#6b7280] mb-4">Program not found</p>
        <button
          onClick={() => navigate('/super-admin/programs')}
          className="px-4 py-2 text-[13px] font-medium text-[#374151] bg-white border border-[#d1d5db] rounded-lg hover:bg-[#f9fafb] transition-colors cursor-pointer"
        >
          Back to Programs
        </button>
      </div>
    );
  }

  const editPath = `/super-admin/programs/${program.id}/edit`;
  const durationLabel = `${program.duration} ${program.durationUnit.toLowerCase()}`;
  const statusMeta = STATUS_META[program.status] || STATUS_META.Closed;

  return (
    <div className="w-full pb-12">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-[#6b7280] mb-6">
        <Link to="/super-admin/programs" className="hover:text-[#111827] flex items-center transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Programs
        </Link>
        <span className="mx-2 text-[#d1d5db]">•</span>
        <span>Academic Management Directory</span>
      </div>

      {/* Hero */}
      <div className="bg-[#f6f8f2] border border-[#e5e7eb] rounded-2xl px-8 py-7 mb-6 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="min-w-0">
          <p className="text-[10px] font-bold text-[#6b7280] uppercase tracking-widest mb-2">
            Academic Management · Program Record
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-[30px] leading-tight font-semibold text-[#111827]">{program.name}</h1>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusMeta.badge}`}>
              <span className={`w-1.5 h-1.5 ${statusMeta.dot} rounded-full mr-1.5`}></span>
              {program.status}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#4b5563]">
            <span className="inline-flex items-center gap-1.5 font-mono text-[13px] font-medium text-[#374151] bg-white border border-[#e5e7eb] rounded-md px-2 py-0.5">
              <Hash className="w-3.5 h-3.5 text-[#9ca3af]" />
              {program.code}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#6b7280]">
              <Clock className="w-4 h-4 text-[#9ca3af]" />
              Last updated {program.lastUpdated}
            </span>
          </div>
          <p className="mt-5 text-[15px] text-[#4b5563] leading-relaxed max-w-2xl">{program.description}</p>
        </div>

        <div className="flex flex-row items-center gap-3 lg:flex-col lg:items-stretch shrink-0">
          <Link
            to={editPath}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1f2937] text-white rounded-lg text-sm font-medium hover:bg-[#111827] transition-colors shadow-sm"
          >
            <Pencil className="w-4 h-4" />
            Edit Program
          </Link>
          <button
            onClick={() => navigate('/super-admin/programs')}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-[#d1d5db] rounded-lg text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors cursor-pointer"
          >
            Back to Programs
          </button>
        </div>
      </div>

      {/* At a glance */}
      <div className="mb-6">
        <ProgramOverviewCard program={program} />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <div className="flex items-start justify-between p-6 pb-5">
              <div>
                <h2 className="text-lg font-semibold text-[#111827]">Program information</h2>
                <p className="text-sm text-[#6b7280] mt-1">Core record details for this curriculum.</p>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold tracking-wider bg-[#f3f4f6] text-[#6b7280] uppercase">
                READ ONLY
              </span>
            </div>

            <div className="px-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DetailTile icon={Hash} label="Code" value={program.code} />
              <DetailTile icon={GraduationCap} label="Level" value={program.level} />
              <DetailTile icon={Clock} label="Duration" value={durationLabel} />
              <DetailTile icon={CalendarDays} label="Current intake" value={program.currentIntake} />
            </div>

            <div className="p-6">
              <div className="border-l-2 border-[#c6dbb6] pl-4">
                <p className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider mb-2">
                  Description
                </p>
                <p className="text-[15px] text-[#374151] leading-relaxed">{program.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-6">
            <h3 className="text-[15px] font-semibold text-[#111827] mb-4">Status & cycle</h3>

            <div className="flex items-center gap-3 bg-[#fafaf9] border border-[#e5e7eb] rounded-lg p-4 mb-2">
              <span className={`w-2.5 h-2.5 ${statusMeta.dot} rounded-full shrink-0`}></span>
              <div>
                <p className="text-[14px] font-semibold text-[#111827]">{program.status}</p>
                <p className="text-[13px] text-[#6b7280] mt-0.5 leading-snug">{statusMeta.description}</p>
              </div>
            </div>

            <div className="mt-3 divide-y divide-[#f3f4f6]">
              <SidebarRow label="Current intake" value={program.currentIntake} />
              <SidebarRow label="Last updated" value={program.lastUpdated} />
              <SidebarRow label="Program code" value={program.code} mono />
            </div>
          </div>

          <PublicProgramCard />
        </div>
      </div>
    </div>
  );
}