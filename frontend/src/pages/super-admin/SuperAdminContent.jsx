import React from 'react';
import ContentHeaderSection from '../../components/super-admin/content/ContentHeaderSection';
import ContentLifecycleBar from '../../components/super-admin/content/ContentLifecycleBar';
import ManagedAreasSection from '../../components/super-admin/content/ManagedAreasSection';
import ContentNeedsAttentionSection from '../../components/super-admin/content/ContentNeedsAttentionSection';
import ContentRecentActivitySection from '../../components/super-admin/content/ContentRecentActivitySection';

export default function SuperAdminContent() {
  return (
    <div className="w-full pb-12">
      <ContentHeaderSection />
      <ContentLifecycleBar />
      <ManagedAreasSection />
      
      <div className="flex gap-8">
        <ContentNeedsAttentionSection />
        <ContentRecentActivitySection />
      </div>
    </div>
  );
}
