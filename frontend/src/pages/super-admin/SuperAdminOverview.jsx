import React from 'react';
import OverviewStatCard from '../../components/super-admin/OverviewStatCard';
import NeedsAttentionSection from '../../components/super-admin/NeedsAttentionSection';
import QuickManagementSection from '../../components/super-admin/QuickManagementSection';
import RecentActivitySection from '../../components/super-admin/RecentActivitySection';
import AtelierStatusCard from '../../components/super-admin/AtelierStatusCard';
import { Calendar } from 'lucide-react';
import useSuperAdminOverview from '../../hooks/useSuperAdminOverview';

export default function SuperAdminOverview() {
  const { overview, loading } = useSuperAdminOverview();

  if (loading || !overview) {
    return (
      <div className="w-full pb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-8 w-64 bg-gray-100 rounded mb-2 animate-pulse"></div>
            <div className="h-4 w-80 bg-gray-100 rounded animate-pulse"></div>
          </div>
          <div className="h-9 w-56 bg-gray-100 rounded-lg animate-pulse"></div>
        </div>
        <div className="grid grid-cols-4 gap-6 mb-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[140px] bg-gray-100 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-12">
      {/* Header section of the content */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#111827] mb-1">{overview.greeting}</h1>
          <p className="text-[#6b7280]">Here's what needs your attention today.</p>
        </div>

        <div className="flex items-center gap-2 bg-[#f3f4f6] px-4 py-2 rounded-lg text-sm text-[#4b5563]">
          <Calendar className="w-4 h-4" />
          <span>{overview.dateText}</span>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-4 gap-6 mb-10">
        {overview.stats.map((stat) => (
          <OverviewStatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            badge={stat.badge}
            subtitleDot={stat.subtitleDot}
          />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column (2/3 width) */}
        <div className="col-span-2">
          <NeedsAttentionSection items={overview.attentionItems} />
          <QuickManagementSection actions={overview.quickActions} />
          <AtelierStatusCard
            activeStudents={overview.atelierStatus.activeStudents}
            activeClasses={overview.atelierStatus.activeClasses}
          />
        </div>

        {/* Right Column (1/3 width) */}
        <div className="col-span-1 pt-10">
          <RecentActivitySection activities={overview.activities} />
        </div>
      </div>
    </div>
  );
}