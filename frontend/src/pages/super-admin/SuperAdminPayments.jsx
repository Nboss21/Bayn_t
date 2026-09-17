import React from 'react';
import PaymentsHeaderSection from '../../components/super-admin/payments/PaymentsHeaderSection';
import PaymentsMetricCardsSection from '../../components/super-admin/payments/PaymentsMetricCardsSection';
import PaymentsNeedsAttentionSection from '../../components/super-admin/payments/PaymentsNeedsAttentionSection';
import PaymentsRecentSection from '../../components/super-admin/payments/PaymentsRecentSection';

export default function SuperAdminPayments() {
  return (
    <div>
      <PaymentsHeaderSection />
      <PaymentsMetricCardsSection />
      <PaymentsNeedsAttentionSection />
      <PaymentsRecentSection />
    </div>
  );
}
