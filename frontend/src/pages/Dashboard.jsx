import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminService, registrarService, studentService, teacherService } from '../services/applicationService';
import { toUserMessage } from '../services/api';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [data, setData] = useState(null); const [error, setError] = useState('');
  useEffect(() => {
    const load = user?.role === 'student' ? studentService.me : user?.role === 'teacher' ? teacherService.dashboard : user?.role === 'super_admin' ? adminService.dashboard : registrarService.dashboard;
    load().then(setData).catch((err) => setError(toUserMessage(err)));
  }, [user]);
  return <main className="min-h-screen bg-[#f9f9f9] px-6 py-12"><div className="max-w-5xl mx-auto">
    <div className="flex justify-between items-start mb-10"><div><p className="text-[#a87b52] text-xs font-bold tracking-widest">{user?.role_label || user?.role}</p><h1 className="text-4xl font-serif mt-2">Welcome, {user?.name}</h1></div><button onClick={logout} className="border rounded-full px-5 py-2 text-sm">Sign out</button></div>
    {error && <p className="bg-red-50 text-red-700 p-4 rounded mb-5">{error}</p>}
    <div className="bg-white rounded-2xl p-6 shadow-sm"><h2 className="font-serif text-2xl mb-4">Dashboard</h2><pre className="text-xs whitespace-pre-wrap overflow-auto">{data ? JSON.stringify(data, null, 2) : 'Loading…'}</pre></div>
    {user?.role === 'student' && <Link to="/application" className="inline-block mt-6 bg-[#e6ca64] rounded-full px-6 py-3">Continue an application</Link>}
  </div></main>;
}
