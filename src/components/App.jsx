import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Hero from './Hero';
import GreenPulse from './GreenPulse';
import NagyiPeksege from './NagyiPeksege';
import PetNanny from './PetNanny';
import Header from './Header';
import Footer from './Footer';
import './App.css';

// Robust scroll-to-top helper: window + document + all scrollable descendants
function scrollToTopAll() {
  try {
    // window/document
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  } catch (e) { /* ignore */ }
  if (document.documentElement) document.documentElement.scrollTop = 0;
  if (document.body) document.body.scrollTop = 0;

  // find any visible scrollable elements and reset them
  const all = Array.from(document.querySelectorAll('body *'));
  all.forEach(el => {
    try {
      const style = getComputedStyle(el);
      const overflowY = style.overflowY;
      const isScrollable = (overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight;
      if (isScrollable) {
        if (typeof el.scrollTo === 'function') {
          try { el.scrollTo({ top: 0, left: 0, behavior: 'auto' }); } catch (err) { el.scrollTop = 0; }
        } else {
          el.scrollTop = 0;
        }
      }
    } catch (err) {
      // ignore inaccessible elements
    }
  });
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // prevent browser auto-restoration from restoring old scroll
    try {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
    } catch (e) { /* ignore */ }

    // Run several times to avoid race conditions on mount
    const run = () => {
      scrollToTopAll();
      requestAnimationFrame(() => scrollToTopAll());
      setTimeout(() => scrollToTopAll(), 10);
      setTimeout(() => scrollToTopAll(), 60);
      setTimeout(() => scrollToTopAll(), 150);
    };

    const t = setTimeout(run, 8);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/greenpulse" element={<GreenPulse />} />
        <Route path="/nagyi-peksege" element={<NagyiPeksege />} />
        <Route path="/pet-nanny" element={<PetNanny />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;