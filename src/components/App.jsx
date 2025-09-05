// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './Hero';
import GreenPulse from './GreenPulse';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/greenpulse" element={<GreenPulse />} />
      </Routes>
    </Router>
  );
}

export default App;