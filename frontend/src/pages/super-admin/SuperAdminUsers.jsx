import React from 'react';
import UsersPageHeader from '../../components/super-admin/users/UsersPageHeader';
import NeedsAttentionBanner from '../../components/super-admin/users/NeedsAttentionBanner';
import UsersFilterBar from '../../components/super-admin/users/UsersFilterBar';
import UsersTable from '../../components/super-admin/users/UsersTable';

export default function SuperAdminUsers() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <UsersPageHeader />
      <NeedsAttentionBanner />
      <UsersFilterBar />
      <UsersTable />
    </div>
  );
}
