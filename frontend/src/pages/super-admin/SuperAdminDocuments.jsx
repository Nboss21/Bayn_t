import React from 'react';
import DocumentsHeader from '../../components/super-admin/documents/DocumentsHeader';
import DocumentsAttentionBanner from '../../components/super-admin/documents/DocumentsAttentionBanner';
import DocumentsFilterBar from '../../components/super-admin/documents/DocumentsFilterBar';
import DocumentsQuickFilters from '../../components/super-admin/documents/DocumentsQuickFilters';
import DocumentsTable from '../../components/super-admin/documents/DocumentsTable';
import DocumentsPagination from '../../components/super-admin/documents/DocumentsPagination';

const SuperAdminDocuments = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="mb-2">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <span>Super Admin Workspace</span>
          <span>/</span>
          <span className="font-medium text-gray-900">Documents</span>
        </div>
      </div>
      
      <DocumentsHeader />
      <DocumentsAttentionBanner />
      
      <div className="bg-[#FAF9F7] border border-gray-100 rounded-2xl p-6 mb-4">
        <DocumentsFilterBar />
        <DocumentsQuickFilters />
        <DocumentsTable />
        <DocumentsPagination />
      </div>
      
      <div className="mt-6 text-[13px] text-gray-400">
        Last repository sync: Just now
      </div>
    </div>
  );
};

export default SuperAdminDocuments;
