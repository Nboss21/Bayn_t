import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { studentService } from '../services/applicationService';
import Application from '../pages/Application';

export default function StudentApplicationEntry() {
  const location = useLocation();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let active = true;
    studentService.me()
      .then((student) => {
        if (!active) return;
        setStatus(String(student?.status || '').toLowerCase() === 'completed' ? 'completed' : 'application');
      })
      .catch(() => { if (active) setStatus('application'); });
    return () => { active = false; };
  }, []);

  if (new URLSearchParams(location.search).get('new') === '1') return <Application />;
  if (status === 'loading') return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading your student portal…</div>;
  if (status === 'completed') return <Navigate to="/dashboard" replace />;
  return <Application />;
}
