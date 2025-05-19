import React from 'react';
import Calculator from './components/Calculator';
import Results from './components/Results';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-green-100">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">CGPA & SGPA Calculator</h1>
          <Routes>
            <Route path="/" element={<Calculator />} />
            <Route path="/results" element={<Results />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;