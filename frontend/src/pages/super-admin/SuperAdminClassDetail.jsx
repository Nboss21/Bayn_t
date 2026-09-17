import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Pencil, CalendarDays, Clock, Users, UserRound, MapPin, GraduationCap } from 'lucide-react';
import useSuperAdminClasses from '../../hooks/useSuperAdminClasses';

const STATUS_META = {
  Active: {
    dot: 'bg-[#10b981]',
    badge: 'bg-[#ecfdf5] text-[#065f46] border-[#a7f3d0]',
    description: 'Cohort is currently running with attendance tracking active.',
  },
  Upcoming: {
    dot: 'bg-[#d97706]',
    badge: 'bg-[#fffbeb] text-[#92400e] border-[#fde68a]',
    description: 'Scheduled for an upcoming intake; open to enrollment.',
  },
  Full: {
    dot: 'bg-white',
    badge: 'bg-[#252525] text-white border-[#404040]',
    description: 'All seats filled. Applicants are placed on the waitlist.',
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

function SidebarRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <span className="text-[13px] text-[#6b7280]">{label}</span>
      <span className="text-[14px] font-medium text-[#111827] text-right">{value}</span>
    </div>
  );
}

export default function SuperAdminClassDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { classesModel, loading } = useSuperAdminClasses();

  if (loading || !classesModel) {
    return (
      <div className="w-full p-6">
        <div className="h-6 w-56 bg-gray-100 rounded mb-6 animate-pulse"></div>
        <div className="h-48 bg-gray-100 rounded-2xl animate-pulse"></div>
        <div className="h-64 bg-gray-100 rounded-xl mt-6 animate-pulse"></div>
      </div>
    );
  }

  const cls = classesModel.findById(id);

  if (!cls) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20">
        <p className="text-[16px] text-[#6b7280] mb-4">Class not found</p>
        <button
          onClick={() => navigate('/super-admin/classes')}
          className="px-4 py-2 text-[13px] font-medium text-[#374151] bg-white border border-[#d1d5db] rounded-lg hover:bg-[#f9fafb] transition-colors cursor-pointer"
        >
          Back to Classes & Intakes
        </button>
      </div>
    );
  }

  const statusMeta = STATUS_META[cls.status] || STATUS_META.Upcoming;
  const scheduleParts = cls.schedule.split('·');
  const capacityPct = cls.percentage;

  return (
    <div className="w-full pb-12">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-[#6b7280] mb-6">
        <Link to="/super-admin/classes" className="hover:text-[#111827] flex items-center transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Classes & Intakes
        </Link>
        <span className="mx-2 text-[#d1d5db]">•</span>
        <span>Class Registry</span>
      </div>

      {/* Hero */}
      <div className="bg-[#f6f8f2] border border-[#e5e7eb] rounded-2xl px-8 py-7 mb-6 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="min-w-0">
          <p className="text-[10px] font-bold text-[#6b7280] uppercase tracking-widest mb-2">
            Academic Management · Class Record
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-[30px] leading-tight font-semibold text-[#111827]">{cls.name}</h1>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusMeta.badge}`}>
              <span className={`w-1.5 h-1.5 ${statusMeta.dot} rounded-full mr-1.5`}></span>
              {cls.status}
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white border border-[#e5e7eb] text-[#374151]">
              {cls.type}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#6b7280]">
            <span className="inline-flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-[#9ca3af]" />
              {cls.program}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 text-[#9ca3af]" />
              {cls.intake}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#9ca3af]" />
              {scheduleParts[0]} ·{scheduleParts[1]}
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-3 lg:flex-col lg:items-stretch shrink-0">
          <Link
            to="/super-admin/classes/add"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1f2937] text-white rounded-lg text-sm font-medium hover:bg-[#111827] transition-colors shadow-sm"
          >
            <Pencil className="w-4 h-4" />
            Manage Class
          </Link>
          <button
            onClick={() => navigate('/super-admin/classes')}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-[#d1d5db] rounded-lg text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors cursor-pointer"
          >
            Back to Classes & Intakes
          </button>
        </div>
      </div>

      {/* Capacity band */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)] mb-6">
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-[15px] font-semibold text-[#111827]">Enrollment capacity</h3>
              <p className="text-sm text-[#6b7280] mt-0.5">
                {cls.capacity} of {cls.maxCapacity} seats filled
              </p>
            </div>
            <span className="text-[26px] font-semibold text-[#111827]">{capacityPct}%</span>
          </div>
          <div className="w-full h-2.5 bg-[#f3f4f6] rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${cls.barColor}`} style={{ width: `${capacityPct}%` }}></div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[13px] text-[#6b7280]">
            <span>{cls.capacity} / {cls.maxCapacity} enrolled</span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              {cls.waitlist > 0 ? `${cls.waitlist} on waitlist` : 'No waitlist'}
            </span>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <div className="flex items-start justify-between p-6 pb-5">
              <div>
                <h2 className="text-lg font-semibold text-[#111827]">Class information</h2>
                <p className="text-sm text-[#6b7280] mt-1">Core record details for this cohort.</p>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold tracking-wider bg-[#f3f4f6] text-[#6b7280] uppercase">
                READ ONLY
              </span>
            </div>

            <div className="px-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DetailTile icon={GraduationCap} label="Program" value={cls.program} />
              <DetailTile icon={CalendarDays} label="Intake" value={cls.intake} />
              <DetailTile icon={Clock} label="Schedule" value={`${scheduleParts[0]} ·${scheduleParts[1]}`} />
              <DetailTile icon={MapPin} label="Days" value={cls.days.join(', ')} />
              <DetailTile icon={UserRound} label="Lead educator" value={cls.instructor} />
              <DetailTile icon={MapPin} label="Studio facility" value={cls.studio} />
              <DetailTile icon={CalendarDays} label="Start date" value={cls.startDate} />
              <DetailTile icon={Clock} label="Weekly commitment" value={cls.weeklyHours} />
            </div>

            <div className="p-6">
              <div className="border-l-2 border-[#c6dbb6] pl-4">
                <p className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider mb-2">
                  Cohort status
                </p>
                <p className="text-[15px] text-[#374151] leading-relaxed">
                  The {cls.type} cohort runs {scheduleParts[0]} ·{scheduleParts[1]} from {cls.startDate} to{' '}
                  {cls.endDate}, averaging {cls.weeklyHours.toLowerCase()}. Enrollment is {cls.capacity} of{' '}
                  {cls.maxCapacity} seats.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-6">
            <h3 className="text-[15px] font-semibold text-[#111827] mb-4">Status & roster</h3>

            <div className="flex items-center gap-3 bg-[#fafaf9] border border-[#e5e7eb] rounded-lg p-4 mb-2">
              <span className={`w-2.5 h-2.5 ${statusMeta.dot} rounded-full shrink-0`}></span>
              <div>
                <p className="text-[14px] font-semibold text-[#111827]">{cls.status}</p>
                <p className="text-[13px] text-[#6b7280] mt-0.5 leading-snug">{statusMeta.description}</p>
              </div>
            </div>

            <div className="mt-3 divide-y divide-[#f3f4f6]">
              <SidebarRow label="Enrolled seats" value={`${cls.capacity} / ${cls.maxCapacity}`} />
              <SidebarRow label="Waitlist" value={String(cls.waitlist)} />
              <SidebarRow label="End date" value={cls.endDate} />
              <SidebarRow label="Lead educator" value={cls.instructor} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}