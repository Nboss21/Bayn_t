import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import EventsPage from './pages/EventsPage';
import FAQPage from './pages/FAQPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="faq" element={<FAQPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
