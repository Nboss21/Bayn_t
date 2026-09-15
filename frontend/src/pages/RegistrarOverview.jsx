import React from 'react';
import SummaryCard from '../components/SummaryCard';
import NeedsAttentionItem from '../components/NeedsAttentionItem';
import RecentActivity from '../components/RecentActivity';
import QuickActions from '../components/QuickActions';

const RegistrarOverview = () => {
  return (
    <div className="max-w-7xl mx-auto pb-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Good morning, Sandra.</h1>
          <p className="text-[15px] text-gray-500">Here's what needs your attention today.</p>
        </div>
        <button className="bg-[#2a2a2a] hover:bg-black text-white text-[13px] font-semibold py-2.5 px-4 rounded-md transition-colors flex items-center gap-2">
          REVIEW APPLICATIONS &rarr;
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <SummaryCard 
          title="Applications requiring review" 
          count="12" 
          leftAction="Immediate triage" 
          rightAction="Queue" 
          borderColor="border-t-yellow-500" 
        />
        <SummaryCard 
          title="Applicants awaiting information" 
          count="7" 
          leftAction="Pending responses" 
          rightAction="View" 
          borderColor="border-t-blue-500" 
        />
        <SummaryCard 
          title="Approved students requiring class assignment" 
          count="5" 
          leftAction="Allocations ready" 
          rightAction="Assign" 
          borderColor="border-t-[#b45309]" 
        />
        <SummaryCard 
          title="Payment issues or exceptions" 
          count="3" 
          leftAction="Requires verification" 
          rightAction="Resolve" 
          borderColor="border-t-red-500" 
        />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-4 mb-8 shadow-sm">
        <span className="text-[13px] text-gray-600 font-medium whitespace-nowrap pl-2">
          Total active workload: <strong className="text-gray-900 font-semibold">27 items</strong> across pipeline
        </span>
        <div className="flex-1 h-2 bg-[#f2f4ec] rounded-full flex overflow-hidden mr-2">
          <div className="bg-[#fbbf24]" style={{ width: '25%' }}></div>
          <div className="bg-[#3b82f6]" style={{ width: '15%' }}></div>
          <div className="bg-[#b45309]" style={{ width: '10%' }}></div>
          <div className="bg-[#ef4444]" style={{ width: '8%' }}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-[18px] font-bold text-gray-900">Needs attention</h2>
              <span className="bg-[#f2f4ec] text-gray-700 text-[12px] font-medium px-2.5 py-1 rounded border border-gray-200">
                4 active queues
              </span>
            </div>
            <p className="text-[13px] text-gray-500">
              Prioritized queue of operational bottlenecks requiring action.
            </p>
          </div>
          
          <div className="space-y-3">
            <NeedsAttentionItem 
              countText="12 applications need review"
              badgeText="Needs Review"
              badgeBg="bg-yellow-50"
              badgeColor="text-yellow-700"
              badgeBorder="border-yellow-200"
              description="Pending registrar initial evaluation, eligibility check, and diploma verification."
              actionText="Review applications"
              lineColor="bg-[#fbbf24]"
            />
            <NeedsAttentionItem 
              countText="7 applicants are awaiting information"
              badgeText="Awaiting Info"
              badgeBg="bg-blue-50"
              badgeColor="text-blue-700"
              badgeBorder="border-blue-200"
              description="Proof of residency or preliminary artistic portfolio items requested from candidate."
              actionText="View applications"
              lineColor="bg-[#3b82f6]"
            />
            <NeedsAttentionItem 
              countText="5 approved students need class assignment"
              badgeText="Ready for assignment"
              badgeBg="bg-orange-50"
              badgeColor="text-orange-700"
              badgeBorder="border-orange-200"
              description="Tuition deposit secured; awaiting studio bench seat and cohort assignment."
              actionText="Assign classes"
              lineColor="bg-[#b45309]"
            />
            <NeedsAttentionItem 
              countText="3 payment issues require attention"
              badgeText="Payment Exception"
              badgeBg="bg-red-50"
              badgeColor="text-red-700"
              badgeBorder="border-red-200"
              description="Bank transfer mismatch or fee waiver application pending registrar verification."
              actionText="Review payments"
              lineColor="bg-[#ef4444]"
            />
          </div>
        </div>
        
        <div className="space-y-6 pt-[60px]">
          <RecentActivity />
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default RegistrarOverview;
