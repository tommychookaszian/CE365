// components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage">
      <h1>Welcome to the M5StickC Plus Demonstration!</h1>
      <p>
        This project aims to demonstrate the use of the M5StickC Plus as a motion controller. Here, you can explore how the device uses sensor fusion to combine data from its accelerometer and gyroscope to calculate pitch, roll, and yaw. You will also see some amazing visualizations that are controlled by the M5StickC Plus.
      </p>
      <Link to="/controller-visualization">Go to Controller Visualization</Link>
      <Link to="/sensor-fusion-explanation">Sensor Fusion Explanation</Link>
      <Link to="/how-it-works">How It Works</Link>
      <Link to="/Game">Game</Link>
    </div>
  );
}

export default HomePage;
