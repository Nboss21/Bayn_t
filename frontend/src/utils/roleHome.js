export function roleHome(role) {
  if (role === 'registrar') return '/registrar/overview';
  if (role === 'teacher') return '/teacher/overview';
  if (role === 'super_admin' || role === 'admin') return '/super-admin/overview';
  return '/dashboard';
}