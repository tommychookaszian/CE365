// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import ControllerVisualization from './ControllerVisualization';
import SensorFusionExplanationPage from './SensorFusionExplanationPage';
import HowItWorksPage from './HowItWorksPage';
import Game from './Game'; // Import the Game component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sensor-fusion-explanation" element={<SensorFusionExplanationPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/Controller-Visualization" element={<ControllerVisualization />} />
        <Route path="/Game" element={<Game />} /> // Add a route for the Game component
        {/* Add more routes for other demonstration pages */}
      </Routes>
    </Router>
  );
}

export default App;
