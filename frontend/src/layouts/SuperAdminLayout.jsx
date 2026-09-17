import React from 'react';
import { Outlet } from 'react-router-dom';
import SuperAdminSidebar from '../components/super-admin/SuperAdminSidebar';
import SuperAdminHeader from '../components/super-admin/SuperAdminHeader';

export default function SuperAdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#fafaf9]">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col relative">
        <SuperAdminHeader />
        <main className="flex-1 overflow-y-auto p-8 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
