import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ApplicationLayout from './layouts/ApplicationLayout';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import EventsPage from './pages/EventsPage';
import Teachers from './pages/Teachers';
import FAQPage from './pages/FAQPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';
import Application from './pages/Application';

import ProgramSelection from './pages/ProgramSelection';
import SelectedProgram from './pages/SelectedProgram';
import LocationStep from './pages/LocationStep';
import ExperienceStep from './pages/ExperienceStep';
import DocumentsStep from './pages/DocumentsStep';
import ReviewStep from './pages/ReviewStep';
import PaymentStep from './pages/PaymentStep';
import ApplicationConfirmation from './pages/ApplicationConfirmation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="programs" element={<Programs />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        
        {/* Application specific routes */}
        <Route path="/application" element={<ApplicationLayout />}>
          <Route index element={<Application />} />
          <Route path="program" element={<ProgramSelection />} />
          <Route path="selected" element={<SelectedProgram />} />
          <Route path="location" element={<LocationStep />} />
          <Route path="experience" element={<ExperienceStep />} />
          <Route path="documents" element={<DocumentsStep />} />
          <Route path="review" element={<ReviewStep />} />
          <Route path="payment" element={<PaymentStep />} />
          <Route path="confirmation" element={<ApplicationConfirmation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
