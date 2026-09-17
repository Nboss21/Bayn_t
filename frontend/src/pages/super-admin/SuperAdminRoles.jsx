import React from 'react';
import RolesHeaderSection from '../../components/super-admin/roles/RolesHeaderSection';
import RolesList from '../../components/super-admin/roles/RolesList';
import RoleDetails from '../../components/super-admin/roles/RoleDetails';

export default function SuperAdminRoles() {
  return (
    <div className="flex flex-col h-full bg-[#fafaf9]">
      <RolesHeaderSection />
      
      <div className="flex flex-1 gap-8 items-start">
        <RolesList />
        <RoleDetails />
      </div>
    </div>
  );
}
