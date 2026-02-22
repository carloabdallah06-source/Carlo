/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Gallery } from './pages/Gallery';
import { Feedbacks } from './pages/Feedbacks';
import { Contact } from './pages/Contact';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminOverview } from './pages/admin/AdminOverview';
import { AdminTestimonials } from './pages/admin/AdminTestimonials';
import { AdminGallery } from './pages/admin/AdminGallery';
import { AdminCategories } from './pages/admin/AdminCategories';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-black flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/feedbacks" element={<Feedbacks />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />}>
                <Route index element={<AdminOverview />} />
                <Route path="testimonials" element={<AdminTestimonials />} />
                <Route path="gallery" element={<AdminGallery />} />
                <Route path="categories" element={<AdminCategories />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}
