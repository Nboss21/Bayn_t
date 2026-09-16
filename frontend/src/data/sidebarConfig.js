import {
  LayoutGrid,
  FileText,
  Users,
  CheckSquare,
  BookOpen,
  Clock,
  LayoutDashboard,
  ClipboardList,
  History,
  User,
} from 'lucide-react';

export const teacherNavItems = [
  { name: 'Overview', path: '/teacher/overview', icon: LayoutGrid },
  { name: 'My Classes', path: '/teacher/classes', icon: FileText },
  { name: 'Attendance', path: '/teacher/attendance', icon: Users, badge: '1' },
  { name: 'Marks', path: '/teacher/marks', icon: CheckSquare },
  { name: 'Curriculum & Modules', path: '/teacher/curriculum', icon: BookOpen },
  { name: 'Student Roster', path: '/teacher/roster', icon: Clock },
];

export const registrarNavItems = [
  { name: 'Overview', path: '/registrar/overview', icon: LayoutDashboard },
  { name: 'Applications', path: '/registrar/applications', icon: ClipboardList, badge: '12' },
  { name: 'Students', path: '/registrar/students', icon: Users },
  { name: 'Classes', path: '/registrar/classes', icon: BookOpen },
  { name: 'Enrollment History', path: '/registrar/history', icon: History },
  { name: 'Profile', path: '/registrar/profile', icon: User },
];