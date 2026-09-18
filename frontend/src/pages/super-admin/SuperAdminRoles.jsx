import React, { useEffect, useState } from 'react';
import { ShieldCheck, FileText, Monitor, User, ChevronRight, Check, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/applicationService';

/* ─── Static role definitions (roles are fixed in this system) ──────────── */
const ROLES = [
  {
    id: 'super_admin',
    label: 'Super Admin',
    tag: 'Full System',
    tagColor: 'bg-[#ecfccb] text-[#4d7c0f]',
    iconBg: 'bg-[#f3f4f6]',
    icon: <ShieldCheck className="w-5 h-5 text-[#111827]" />,
    borderClass: 'border-2 border-[#111827]',
    dotColor: 'bg-[#059669]',
    description: 'Full system access. Manage users, programs, classes, content, reports, payments, and all settings.',
  },
  {
    id: 'registrar',
    label: 'Registrar',
    tag: 'Admissions',
    tagColor: 'bg-[#ffedd5] text-[#c2410c]',
    iconBg: 'bg-[#fff7ed]',
    icon: <FileText className="w-5 h-5 text-[#ea580c]" />,
    borderClass: 'border border-[#e5e7eb]',
    dotColor: 'bg-[#ea580c]',
    description: 'Manage student applications, enrollments, attendance records, payments, and classes.',
  },
  {
    id: 'teacher',
    label: 'Teacher',
    tag: 'Faculty',
    tagColor: 'bg-[#dbeafe] text-[#1d4ed8]',
    iconBg: 'bg-[#eff6ff]',
    icon: <Monitor className="w-5 h-5 text-[#2563eb]" />,
    borderClass: 'border border-[#e5e7eb]',
    dotColor: 'bg-[#2563eb]',
    description: 'Manage assigned classes, record attendance, enter marks, view student roster and curriculum.',
  },
  {
    id: 'student',
    label: 'Student',
    tag: 'Learner',
    tagColor: 'bg-[#fce7f3] text-[#be185d]',
    iconBg: 'bg-[#fdf2f8]',
    icon: <User className="w-5 h-5 text-[#db2777]" />,
    borderClass: 'border border-[#e5e7eb]',
    dotColor: 'bg-[#db2777]',
    description: 'Submit applications, track application status, and view enrollment information.',
  },
];

/* ─── Permission matrix ──────────────────────────────────────────────────── */
const PERMISSIONS = [
  { label: 'User management', super_admin: true, registrar: false, teacher: false, student: false },
  { label: 'View all users', super_admin: true, registrar: false, teacher: false, student: false },
  { label: 'Program management', super_admin: true, registrar: false, teacher: false, student: false },
  { label: 'Class management', super_admin: true, registrar: true, teacher: false, student: false },
  { label: 'Application review', super_admin: true, registrar: true, teacher: false, student: false },
  { label: 'Student enrollment', super_admin: true, registrar: true, teacher: false, student: false },
  { label: 'Payment verification', super_admin: true, registrar: true, teacher: false, student: false },
  { label: 'View student roster', super_admin: true, registrar: true, teacher: true, student: false },
  { label: 'Record attendance', super_admin: true, registrar: false, teacher: true, student: false },
  { label: 'Enter marks/assessments', super_admin: true, registrar: false, teacher: true, student: false },
  { label: 'View curriculum', super_admin: true, registrar: false, teacher: true, student: false },
  { label: 'Submit application', super_admin: false, registrar: false, teacher: false, student: true },
  { label: 'View own profile', super_admin: true, registrar: true, teacher: true, student: true },
  { label: 'Site content management', super_admin: true, registrar: false, teacher: false, student: false },
  { label: 'Reports & exports', super_admin: true, registrar: true, teacher: false, student: false },
  { label: 'Audit logs', super_admin: true, registrar: true, teacher: false, student: false },
  { label: 'System settings', super_admin: true, registrar: false, teacher: false, student: false },
  { label: 'Backup & restore', super_admin: true, registrar: false, teacher: false, student: false },
];

export default function SuperAdminRoles() {
  const [userCounts, setUserCounts] = useState({});
  const [loadingCounts, setLoadingCounts] = useState(true);
  const [selectedRole, setSelectedRole] = useState('super_admin');

  useEffect(() => {
    async function loadCounts() {
      try {
        const res = await adminService.users({ per_page: 200 });
        const users = res?.data || res || [];
        const counts = {};
        users.forEach((u) => {
          counts[u.role] = (counts[u.role] || 0) + 1;
        });
        setUserCounts(counts);
      } catch {
        // non-critical — just show '—' if it fails
      } finally {
        setLoadingCounts(false);
      }
    }
    loadCounts();
  }, []);

  const activeRole = ROLES.find((r) => r.id === selectedRole);

  return (
    <div className="w-full py-2">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#111827] mb-1">Roles &amp; Permissions</h1>
        <p className="text-sm text-gray-500">
          System roles are fixed. Assign roles to individual users in{' '}
          <Link to="/super-admin/users" className="text-[#4A5D4E] font-medium underline underline-offset-2 hover:text-[#3D4C40]">
            Users Management →
          </Link>
        </p>
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-4 gap-4 mb-10">
        {ROLES.map((role) => (
          <button
            key={role.id}
            onClick={() => setSelectedRole(role.id)}
            className={`text-left bg-white rounded-xl p-5 shadow-sm transition-all ${selectedRole === role.id ? role.borderClass : 'border border-[#e5e7eb] hover:border-[#d1d5db]'}`}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full ${role.iconBg} flex items-center justify-center shrink-0`}>
                {role.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="text-[14px] font-bold text-[#111827]">{role.label}</h3>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${role.tagColor} uppercase tracking-wider`}>
                  {role.tag}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[#f3f4f6]">
              <div className={`w-1.5 h-1.5 rounded-full ${role.dotColor}`} />
              <span className="text-[12px] text-[#6b7280]">
                {loadingCounts ? '…' : userCounts[role.id] ?? 0} user{(userCounts[role.id] ?? 0) !== 1 ? 's' : ''}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Role Detail + Permission Matrix */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left: role info */}
        <div className="col-span-1">
          <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 shadow-sm sticky top-6">
            <div className={`w-12 h-12 rounded-full ${activeRole.iconBg} flex items-center justify-center mb-4`}>
              {activeRole.icon}
            </div>
            <h2 className="text-lg font-bold text-[#111827] mb-1">{activeRole.label}</h2>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${activeRole.tagColor} uppercase tracking-wider`}>
              {activeRole.tag}
            </span>
            <p className="text-sm text-[#6b7280] leading-relaxed mt-4">{activeRole.description}</p>
            <div className="mt-6 pt-4 border-t border-[#f3f4f6]">
              <div className="text-xs text-[#6b7280] mb-1">Assigned users</div>
              <div className="text-2xl font-bold text-[#111827]">
                {loadingCounts ? '…' : userCounts[selectedRole] ?? 0}
              </div>
            </div>
            <Link
              to="/super-admin/users"
              className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium bg-[#f3f4f6] hover:bg-[#e5e7eb] text-[#111827] rounded-lg transition-colors"
            >
              View {activeRole.label} users
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right: permissions matrix */}
        <div className="col-span-2">
          <h2 className="text-[15px] font-semibold text-[#111827] mb-4">
            Permissions for <span className="text-[#4A5D4E]">{activeRole.label}</span>
          </h2>
          <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#fafafa] border-b border-gray-100">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Permission</th>
                  {ROLES.map((r) => (
                    <th key={r.id} className={`px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide ${r.id === selectedRole ? 'text-[#4A5D4E]' : 'text-gray-400'}`}>
                      {r.label.split(' ')[0]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {PERMISSIONS.map((perm) => (
                  <tr key={perm.label} className={perm[selectedRole] ? 'bg-white' : 'bg-[#fafafa]'}>
                    <td className={`px-5 py-3 font-medium ${perm[selectedRole] ? 'text-[#111827]' : 'text-gray-400'}`}>
                      {perm.label}
                    </td>
                    {ROLES.map((r) => (
                      <td key={r.id} className="px-4 py-3 text-center">
                        {perm[r.id] ? (
                          <Check className={`w-4 h-4 mx-auto ${r.id === selectedRole ? 'text-[#4A5D4E]' : 'text-gray-300'}`} />
                        ) : (
                          <Minus className="w-3 h-3 mx-auto text-gray-200" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-gray-400">
            Roles are system-defined and cannot be edited. To change a user's role, edit their account in Users Management.
          </p>
        </div>
      </div>
    </div>
  );
}
