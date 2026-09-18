import React from 'react';
import { Link } from 'react-router-dom';
import SummaryCard from '../components/SummaryCard';
import NeedsAttentionItem from '../components/NeedsAttentionItem';
import RecentActivity from '../components/RecentActivity';
import QuickActions from '../components/QuickActions';
import useDashboard from '../hooks/useDashboard';
import DashboardErrorState from '../components/DashboardErrorState';

const RegistrarOverview = () => {
  const { dashboard, loading, error, reload } = useDashboard();

  if (loading && !dashboard) {
    return (
      <div className="pb-10">
        <div className="h-8 w-72 bg-gray-100 rounded mb-4 animate-pulse"></div>
        <div className="h-4 w-96 bg-gray-100 rounded mb-8 animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-gray-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error && !dashboard) {
    return (
      <DashboardErrorState
        title="Unable to load Registrar Dashboard"
        message={error}
        onRetry={reload}
      />
    );
  }

  if (!dashboard) return null;

  return (
    <div className="pb-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">{dashboard.greeting}</h1>
          <p className="text-[15px] text-gray-500">Here's what needs your attention today.</p>
        </div>
        <Link
          to={dashboard.headerAction.path}
          className="bg-[#2a2a2a] hover:bg-black text-white text-[13px] font-semibold py-2.5 px-4 rounded-md transition-colors flex items-center gap-2"
        >
          {dashboard.headerAction.label} <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {dashboard.summaryCards.map((card) => (
          <SummaryCard
            key={card.id}
            title={card.title}
            count={card.count}
            leftAction={card.leftAction}
            rightAction={card.rightAction}
            borderColor={card.borderColor}
            textColor={card.textColor}
            path={card.path}
          />
        ))}
      </div>

      <div
        className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-4 mb-8 shadow-sm"
        role="img"
        aria-label={`Total active workload: ${dashboard.totalWorkload} items across pipeline`}
      >
        <span className="text-[13px] text-gray-600 font-medium whitespace-nowrap pl-2">
          Total active workload: <strong className="text-gray-900 font-semibold">{dashboard.totalWorkload} items</strong> across pipeline
        </span>
        <div className="flex-1 h-2 bg-[#f2f4ec] rounded-full flex overflow-hidden mr-2">
          {dashboard.workloadSegments.map((segment) => (
            <div
              key={segment.id}
              className={segment.color}
              style={{ width: `${segment.percent}%` }}
            ></div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-[18px] font-bold text-gray-900">Needs attention</h2>
              <span className="bg-[#f2f4ec] text-gray-700 text-[12px] font-medium px-2.5 py-1 rounded border border-gray-200">
                {dashboard.queues.length} active queues
              </span>
            </div>
            <p className="text-[13px] text-gray-500">
              Prioritized queue of operational bottlenecks requiring action.
            </p>
          </div>

          <div className="space-y-3">
            {dashboard.queues.map((queue) => (
              <NeedsAttentionItem
                key={queue.id}
                countText={queue.countText}
                badgeText={queue.badgeText}
                badgeBg={queue.badgeBg}
                badgeColor={queue.badgeColor}
                badgeBorder={queue.badgeBorder}
                description={queue.description}
                actionText={queue.actionText}
                lineColor={queue.lineColor}
                path={queue.path}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6 pt-[60px]">
          <RecentActivity
            activities={dashboard.recentActivity}
            viewAllPath={dashboard.activityViewAllPath}
          />
          <QuickActions actions={dashboard.quickActions} />
        </div>
      </div>
    </div>
  );
};

export default RegistrarOverview;