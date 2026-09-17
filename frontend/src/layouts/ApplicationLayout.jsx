import React from 'react';
import { Outlet } from 'react-router-dom';
import ApplicationHeader from '../components/ApplicationHeader';
import Footer from '../components/Footer';

const ApplicationLayout = () => {
  return (
    <div className="font-sans min-h-screen flex flex-col bg-[#f9f9f9]">
      <ApplicationHeader />
      <main className="flex-grow flex items-center justify-center py-8 sm:py-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ApplicationLayout;
