import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import EventsPage from './pages/EventsPage';
import FAQPage from './pages/FAQPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="programs" element={<Programs />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
