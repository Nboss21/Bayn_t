import React from 'react';
import AddUserHeader from '../../components/super-admin/users/AddUserHeader';
import AddUserForm from '../../components/super-admin/users/AddUserForm';

export default function SuperAdminAddUser() {
  return (
    <div className="w-full max-w-4xl mx-auto pb-12">
      <AddUserHeader />
      <AddUserForm />
    </div>
  );
}
