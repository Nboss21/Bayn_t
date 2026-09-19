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
  Calendar,
  BarChart2,
  CreditCard,
  FolderOpen,
  Shield,
  Bell,
  Settings,
} from 'lucide-react';

export const teacherNavItems = [
  { name: 'Overview', path: '/teacher/overview', icon: LayoutGrid },
  { name: 'My Classes', path: '/teacher/classes', icon: FileText },
  { name: 'Attendance', path: '/teacher/attendance', icon: Users },
  { name: 'Marks', path: '/teacher/marks', icon: CheckSquare },
  { name: 'Curriculum & Modules', path: '/teacher/curriculum', icon: BookOpen },
  { name: 'Student Roster', path: '/teacher/roster', icon: Clock },
];

export const registrarNavItems = [
  { name: 'Overview', path: '/registrar/overview', icon: LayoutDashboard },
  { name: 'Applications', path: '/registrar/applications', icon: ClipboardList },
  { name: 'Students', path: '/registrar/students', icon: Users },
  { name: 'Classes', path: '/registrar/classes', icon: BookOpen },
  { name: 'Enrollment History', path: '/registrar/history', icon: History },
  { name: 'Completion Reviews', path: '/registrar/completion-reviews', icon: CheckSquare },
  { name: 'Profile', path: '/registrar/profile', icon: User },
];

export const superadminNavItems = [
  { name: 'Overview', path: '/super-admin/overview', icon: LayoutDashboard },
  { name: 'Users', path: '/super-admin/users', icon: Users },
  { name: 'Programs', path: '/super-admin/programs', icon: BookOpen },
  { name: 'Classes & Intakes', path: '/super-admin/classes', icon: Calendar },
  { name: 'Grading', path: '/super-admin/grading', icon: CheckSquare },
  { name: 'Reports', path: '/super-admin/reports', icon: BarChart2 },
  { name: 'Payments', path: '/super-admin/payments', icon: CreditCard },
  { name: 'Content', path: '/super-admin/content', icon: FileText },
  { name: 'Documents', path: '/super-admin/documents', icon: FolderOpen },
  { name: 'Roles & Permissions', path: '/super-admin/roles', icon: Shield },
  { name: 'Audit Log', path: '/super-admin/audit', icon: History },
  { name: 'Notifications', path: '/super-admin/notifications', icon: Bell },
  { name: 'Profile & Settings', path: '/super-admin/settings', icon: Settings },
];
