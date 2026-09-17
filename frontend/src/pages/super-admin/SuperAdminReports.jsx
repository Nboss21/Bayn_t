import React from 'react';
import ReportsHeader from '../../components/super-admin/reports/ReportsHeader';
import ReportsFilterCard from '../../components/super-admin/reports/ReportsFilterCard';
import SchoolOverviewSection from '../../components/super-admin/reports/SchoolOverviewSection';
import ReportPreviewCard from '../../components/super-admin/reports/ReportPreviewCard';
import AvailableReportsSection from '../../components/super-admin/reports/AvailableReportsSection';

export default function SuperAdminReports() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <ReportsHeader />
      <ReportsFilterCard />
      <SchoolOverviewSection />
      <ReportPreviewCard />
      <AvailableReportsSection />
    </div>
  );
}
