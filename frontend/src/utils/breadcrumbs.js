import studentsDetailData from '../data/studentsDetailData';
import { superAdminUsers } from '../data/superAdminUsersData';
import { superAdminPrograms } from '../data/superAdminProgramsData';
import { superAdminClasses } from '../data/superAdminClassesData';

const WORKSPACE = { label: 'Registrar Workspace', to: '/registrar/overview' };

const ROUTE_CRUMBS = {
  '/registrar/overview': [WORKSPACE, { label: 'Overview', active: true }],
  '/registrar/applications': [WORKSPACE, { label: 'Applications', active: true }],
  '/registrar/students': [WORKSPACE, { label: 'Students', active: true }],
  '/registrar/classes': [WORKSPACE, { label: 'Classes', active: true }],
  '/registrar/history': [WORKSPACE, { label: 'Enrollment History', active: true }],
  '/registrar/profile': [WORKSPACE, { label: 'Profile', active: true }],
};

export function getRegistrarBreadcrumbs(pathname) {
  if (ROUTE_CRUMBS[pathname]) return ROUTE_CRUMBS[pathname];

  const appReviewMatch = pathname.match(/^\/registrar\/applications\/([^/]+)$/);
  if (appReviewMatch) {
    return [
      WORKSPACE,
      { label: 'Applications', to: '/registrar/applications' },
      { label: appReviewMatch[1], active: true },
    ];
  }

  const assignMatch = pathname.match(/^\/registrar\/applications\/([^/]+)\/assign-class$/);
  if (assignMatch) {
    return [
      WORKSPACE,
      { label: 'Applications', to: '/registrar/applications' },
      { label: assignMatch[1], to: `/registrar/applications/${assignMatch[1]}` },
      { label: 'Class Assignment', active: true },
    ];
  }

  const studentDetailMatch = pathname.match(/^\/registrar\/students\/([^/]+)$/);
  if (studentDetailMatch) {
    const studentId = decodeURIComponent(studentDetailMatch[1]);
    const studentData = studentsDetailData[studentId];
    const label = studentData ? studentData.name : studentId;
    return [
      WORKSPACE,
      { label: 'Students', to: '/registrar/students' },
      { label, active: true },
    ];
  }

  return [WORKSPACE];
}

const TEACHER_WORKSPACE = { label: 'Teacher Workspace', to: '/teacher/overview' };

const TEACHER_ROUTE_CRUMBS = {
  '/teacher/overview': [TEACHER_WORKSPACE, { label: 'Overview', active: true }],
  '/teacher/classes': [TEACHER_WORKSPACE, { label: 'My Classes', active: true }],
  '/teacher/attendance': [TEACHER_WORKSPACE, { label: 'Attendance', active: true }],
  '/teacher/marks': [TEACHER_WORKSPACE, { label: 'Marks', active: true }],
  '/teacher/curriculum': [TEACHER_WORKSPACE, { label: 'Curriculum & Modules', active: true }],
  '/teacher/roster': [TEACHER_WORKSPACE, { label: 'Student Roster', active: true }],
  '/teacher/profile': [TEACHER_WORKSPACE, { label: 'Profile', active: true }],
};

export function getTeacherBreadcrumbs(pathname) {
  if (TEACHER_ROUTE_CRUMBS[pathname]) return TEACHER_ROUTE_CRUMBS[pathname];

  const rosterDetailMatch = pathname.match(/^\/teacher\/roster\/([^/]+)$/);
  if (rosterDetailMatch) {
    return [
      TEACHER_WORKSPACE,
      { label: 'Student Roster', to: '/teacher/roster' },
      { label: 'Student Progress', active: true },
    ];
  }

  return [TEACHER_WORKSPACE];
}

const SUPER_ADMIN_WORKSPACE = { label: 'Super Admin Workspace', to: '/super-admin/overview' };

const SUPER_ADMIN_ROUTE_CRUMBS = {
  '/super-admin/overview': [SUPER_ADMIN_WORKSPACE, { label: 'Overview', active: true }],
  '/super-admin/users': [SUPER_ADMIN_WORKSPACE, { label: 'Users', active: true }],
  '/super-admin/programs': [SUPER_ADMIN_WORKSPACE, { label: 'Programs', active: true }],
  '/super-admin/classes': [SUPER_ADMIN_WORKSPACE, { label: 'Classes & Intakes', active: true }],
  '/super-admin/grading': [SUPER_ADMIN_WORKSPACE, { label: 'Grading', active: true }],
  '/super-admin/reports': [SUPER_ADMIN_WORKSPACE, { label: 'Reports', active: true }],
  '/super-admin/payments': [SUPER_ADMIN_WORKSPACE, { label: 'Payments', active: true }],
  '/super-admin/content': [SUPER_ADMIN_WORKSPACE, { label: 'Content', active: true }],
  '/super-admin/documents': [SUPER_ADMIN_WORKSPACE, { label: 'Documents', active: true }],
  '/super-admin/roles': [SUPER_ADMIN_WORKSPACE, { label: 'Roles & Permissions', active: true }],
  '/super-admin/audit': [SUPER_ADMIN_WORKSPACE, { label: 'Audit Log', active: true }],
  '/super-admin/notifications': [SUPER_ADMIN_WORKSPACE, { label: 'Notifications', active: true }],
  '/super-admin/settings': [SUPER_ADMIN_WORKSPACE, { label: 'Profile & Settings', active: true }],
};

export function getSuperAdminBreadcrumbs(pathname) {
  if (SUPER_ADMIN_ROUTE_CRUMBS[pathname]) return SUPER_ADMIN_ROUTE_CRUMBS[pathname];

  if (pathname === '/super-admin/users/add') {
    return [
      SUPER_ADMIN_WORKSPACE,
      { label: 'Users', to: '/super-admin/users' },
      { label: 'Add User', active: true },
    ];
  }

  const userDetailMatch = pathname.match(/^\/super-admin\/users\/([^/]+)$/);
  if (userDetailMatch) {
    const userId = decodeURIComponent(userDetailMatch[1]);
    const user = superAdminUsers.users.find((u) => u.id === userId);
    return [
      SUPER_ADMIN_WORKSPACE,
      { label: 'Users', to: '/super-admin/users' },
      { label: user ? user.name : userId, active: true },
    ];
  }

  if (pathname === '/super-admin/programs/add') {
    return [
      SUPER_ADMIN_WORKSPACE,
      { label: 'Programs', to: '/super-admin/programs' },
      { label: 'Add Program', active: true },
    ];
  }

  const programViewMatch = pathname.match(/^\/super-admin\/programs\/([^/]+)$/);
  if (programViewMatch) {
    const program = superAdminPrograms.programDetails?.[programViewMatch[1]];
    return [
      SUPER_ADMIN_WORKSPACE,
      { label: 'Programs', to: '/super-admin/programs' },
      { label: program ? program.name : 'Program', active: true },
    ];
  }

  const programEditMatch = pathname.match(/^\/super-admin\/programs\/([^/]+)\/edit$/);
  if (programEditMatch) {
    const program = superAdminPrograms.programDetails?.[programEditMatch[1]];
    return [
      SUPER_ADMIN_WORKSPACE,
      { label: 'Programs', to: '/super-admin/programs' },
      { label: program ? `Edit ${program.name}` : 'Edit Program', active: true },
    ];
  }

  if (pathname === '/super-admin/classes/add') {
    return [
      SUPER_ADMIN_WORKSPACE,
      { label: 'Classes & Intakes', to: '/super-admin/classes' },
      { label: 'Add Class', active: true },
    ];
  }

  const classViewMatch = pathname.match(/^\/super-admin\/classes\/([^/]+)$/);
  if (classViewMatch) {
    const cls = superAdminClasses.classes.find((c) => String(c.id) === String(classViewMatch[1]));
    return [
      SUPER_ADMIN_WORKSPACE,
      { label: 'Classes & Intakes', to: '/super-admin/classes' },
      { label: cls ? cls.name : 'Class', active: true },
    ];
  }

  if (pathname === '/super-admin/reports/generate') {
    return [
      SUPER_ADMIN_WORKSPACE,
      { label: 'Reports', to: '/super-admin/reports' },
      { label: 'Generate Report', active: true },
    ];
  }

  const paymentMatch = pathname.match(/^\/super-admin\/payments\/([^/]+)$/);
  if (paymentMatch) {
    return [
      SUPER_ADMIN_WORKSPACE,
      { label: 'Payments', to: '/super-admin/payments' },
      { label: 'Verification', active: true },
    ];
  }

  return [SUPER_ADMIN_WORKSPACE];
}
