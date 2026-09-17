import React from 'react';
import OverviewStatCard from '../../components/super-admin/OverviewStatCard';
import NeedsAttentionSection from '../../components/super-admin/NeedsAttentionSection';
import QuickManagementSection from '../../components/super-admin/QuickManagementSection';
import RecentActivitySection from '../../components/super-admin/RecentActivitySection';
import AtelierStatusCard from '../../components/super-admin/AtelierStatusCard';
import { Calendar } from 'lucide-react';

export default function SuperAdminOverview() {
  return (
    <div className="max-w-[1200px] mx-auto pb-12">
      {/* Header section of the content */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#111827] mb-1">Good morning, Daniel</h1>
          <p className="text-[#6b7280]">Here's what needs your attention today.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-[#f3f4f6] px-4 py-2 rounded-lg text-sm text-[#4b5563]">
          <Calendar className="w-4 h-4" />
          <span>Monday, September 7, 2026</span>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-4 gap-6 mb-10">
        <OverviewStatCard
          title="USERS"
          value="24"
          subtitle="Active staff accounts"
        />
        <OverviewStatCard
          title="PROGRAMS"
          value="4"
          subtitle="Active programs"
        />
        <OverviewStatCard
          title="CLASSES"
          value="8"
          subtitle="Active classes"
        />
        <OverviewStatCard
          title="PAYMENTS"
          value="3"
          subtitle="Need attention"
          badge="Action Needed"
          subtitleDot="bg-[#ef4444]"
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column (2/3 width) */}
        <div className="col-span-2">
          <NeedsAttentionSection />
          <QuickManagementSection />
          <AtelierStatusCard />
        </div>

        {/* Right Column (1/3 width) */}
        <div className="col-span-1 pt-10">
          <RecentActivitySection />
        </div>
      </div>
    </div>
  );
}
