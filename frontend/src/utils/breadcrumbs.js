import studentsDetailData from '../data/studentsDetailData';

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
