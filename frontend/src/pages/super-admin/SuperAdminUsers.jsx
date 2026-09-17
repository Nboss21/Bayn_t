import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersPageHeader from '../../components/super-admin/users/UsersPageHeader';
import NeedsAttentionBanner from '../../components/super-admin/users/NeedsAttentionBanner';
import UsersFilterBar from '../../components/super-admin/users/UsersFilterBar';
import UsersTable from '../../components/super-admin/users/UsersTable';
import UsersPagination from '../../components/super-admin/users/UsersPagination';
import useSuperAdminUsers from '../../hooks/useSuperAdminUsers';

function SkeletonTable() {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#e5e7eb]">
              {['USER', 'ROLE', 'EMAIL', 'STATUS', 'LAST SIGN-IN', 'ACTION'].map((label) => (
                <th key={label} className="px-6 py-4 text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f3f4f6]">
            {Array.from({ length: 5 }, (_, i) => (
              <tr key={i}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#f3f4f6] animate-pulse" />
                    <div className="h-3.5 w-32 bg-[#f3f4f6] rounded animate-pulse" />
                  </div>
                </td>
                <td className="px-6 py-4"><div className="h-3.5 w-24 bg-[#f3f4f6] rounded animate-pulse" /></td>
                <td className="px-6 py-4"><div className="h-3.5 w-40 bg-[#f3f4f6] rounded animate-pulse" /></td>
                <td className="px-6 py-4"><div className="h-6 w-16 bg-[#f3f4f6] rounded-full animate-pulse" /></td>
                <td className="px-6 py-4"><div className="h-3.5 w-24 bg-[#f3f4f6] rounded animate-pulse" /></td>
                <td className="px-6 py-4"><div className="h-8 w-16 bg-[#f3f4f6] rounded ml-auto animate-pulse" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function SuperAdminUsers() {
  const { usersModel, loading } = useSuperAdminUsers();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('All');
  const [status, setStatus] = useState('All');
  const [sort, setSort] = useState('recent');
  const [page, setPage] = useState(1);

  if (loading || !usersModel) {
    return (
      <div className="w-full">
        <UsersPageHeader activeCount={0} />
        <UsersFilterBar roles={[]} statuses={[]} sorts={[]} />
        <SkeletonTable />
      </div>
    );
  }

  const result = usersModel.query({ search, role, status, sort, page });

  const applySearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const applyRole = (value) => {
    setRole(value);
    setPage(1);
  };

  const applyStatus = (value) => {
    setStatus(value);
    setPage(1);
  };

  const applySort = (value) => {
    setSort(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch('');
    setRole('All');
    setStatus('All');
    setPage(1);
  };

  const reviewPending = () => applyStatus('Pending');

  const handleView = (user) => navigate(`/super-admin/users/${encodeURIComponent(user.resourceId || user.id)}`);

  return (
    <div className="w-full">
      <UsersPageHeader
        title={usersModel.header.title}
        description={usersModel.header.description}
        activeCount={usersModel.activeCount}
        activeLabel={usersModel.header.activeAccountsLabel}
        addUserPath={usersModel.header.addUserPath}
      />

      {usersModel.pendingCount > 0 && (
        <NeedsAttentionBanner
          message={`${usersModel.pendingCount} accounts are awaiting role assignment.`}
          actionText={usersModel.attentionBanner.actionText}
          onAction={reviewPending}
        />
      )}

      <UsersFilterBar
        searchValue={search}
        onSearchChange={applySearch}
        searchPlaceholder={usersModel.filters.searchPlaceholder}
        roles={usersModel.filters.roles}
        role={role}
        onRoleChange={applyRole}
        statuses={usersModel.filters.statuses}
        status={status}
        onStatusChange={applyStatus}
        sorts={usersModel.filters.sorts}
        sort={sort}
        onSortChange={applySort}
        onClearFilters={clearFilters}
      />

      <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
        <UsersTable
          rows={result.rows}
          onView={handleView}
          onReview={reviewPending}
        />

        <UsersPagination
          currentPage={result.page}
          totalPages={result.pageCount}
          totalCount={result.total}
          perPage={result.perPage}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}