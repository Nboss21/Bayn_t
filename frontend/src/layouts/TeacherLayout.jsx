import React from 'react';
import { Outlet } from 'react-router-dom';
import TeacherSidebar from '../components/teacher/TeacherSidebar';
import TeacherTopHeader from '../components/teacher/TeacherTopHeader';

const TeacherLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <TeacherSidebar />
      <TeacherTopHeader />
      <main className="ml-[240px] p-8 pb-20">
        <div className="w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default TeacherLayout;

