import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './layouts/MainLayout';
import ApplicationLayout from './layouts/ApplicationLayout';
import { ApplicationProvider, useApplication } from './context/ApplicationContext';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import EventsPage from './pages/EventsPage';
import Teachers from './pages/Teachers';
import FAQPage from './pages/FAQPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Application from './pages/Application';

import ProgramSelection from './pages/ProgramSelection';
import SelectedProgram from './pages/SelectedProgram';
import LocationStep from './pages/LocationStep';
import ExperienceStep from './pages/ExperienceStep';
import DocumentsStep from './pages/DocumentsStep';
import ReviewStep from './pages/ReviewStep';
import PaymentStep from './pages/PaymentStep';
import ApplicationConfirmation from './pages/ApplicationConfirmation';

function ProtectedRoute({ step, children }) {
  const { canAccess } = useApplication();
  const targetStep = canAccess(step);
  if (targetStep !== true) {
    return <Navigate to={`/application/${targetStep}`} replace />;
  }
  return children;
}

function ApplicationStepsLayout() {
  return (
    <ApplicationProvider>
      <Outlet />
    </ApplicationProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="programs" element={<Programs />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        
        <Route path="/application" element={<ApplicationLayout />}>
          <Route index element={<Application />} />
        </Route>

        <Route path="/application" element={<ApplicationLayout />}>
          <Route element={<ApplicationStepsLayout />}>
            <Route path="program" element={<ProgramSelection />} />
            <Route path="selected" element={<ProtectedRoute step="selected"><SelectedProgram /></ProtectedRoute>} />
            <Route path="location" element={<ProtectedRoute step="location"><LocationStep /></ProtectedRoute>} />
            <Route path="experience" element={<ProtectedRoute step="experience"><ExperienceStep /></ProtectedRoute>} />
            <Route path="documents" element={<ProtectedRoute step="documents"><DocumentsStep /></ProtectedRoute>} />
            <Route path="review" element={<ProtectedRoute step="review"><ReviewStep /></ProtectedRoute>} />
            <Route path="payment" element={<ProtectedRoute step="payment"><PaymentStep /></ProtectedRoute>} />
            <Route path="confirmation" element={<ProtectedRoute step="confirmation"><ApplicationConfirmation /></ProtectedRoute>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
