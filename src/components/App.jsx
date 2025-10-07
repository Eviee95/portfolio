import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './Hero';
import GreenPulse from './GreenPulse';
import NagyiPeksege from './NagyiPeksege';
import PetNanny from './PetNanny';
import Header from './Header';
import Footer from './Footer';
import './App.css';

function App() {
  return (
    <Router>
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