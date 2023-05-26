// components/HowItWorksPage.js
import React, { useState } from 'react';
import './HowItWorksPage.css';

const HowItWorksPage = () => {
  const [expandedSections, setExpandedSections] = useState([]);

  const toggleSection = (index) => {
    if (expandedSections.includes(index)) {
      setExpandedSections(expandedSections.filter((i) => i !== index));
    } else {
      setExpandedSections([...expandedSections, index]);
    }
  };

  return (
    <div className="container how-it-works-page">
      <h1>How It Works</h1>
      <div className="content">
        <div className="quick-explanation">
          <p>Click on each section to expand and view more details.</p>
        </div>
        <div className="section" onClick={() => toggleSection(1)}>
          <h2 className={`section-title ${expandedSections.includes(1) ? 'active' : ''}`}>Overview</h2>
          {expandedSections.includes(1) && (
            <p className="section-content">
              The M5StickC Plus is a powerful IoT device that combines an accelerometer and gyroscope to gather motion data. It can be used as a motion controller or connect to JavaScript to display and interact with various applications.
            </p>
          )}
        </div>
        <div className="section" onClick={() => toggleSection(2)}>
          <h2 className={`section-title ${expandedSections.includes(2) ? 'active' : ''}`}>Data Acquisition</h2>
          {expandedSections.includes(2) && (
            <p className="section-content">
              The M5StickC Plus collects sensor data from its built-in accelerometer and gyroscope. These sensors provide information about the device's motion, including pitch, roll, and yaw. By combining the readings from both sensors using sensor fusion algorithms, we can obtain more accurate and reliable orientation data.
            </p>
          )}
        </div>
        <div className="section" onClick={() => toggleSection(3)}>
          <h2 className={`section-title ${expandedSections.includes(3) ? 'active' : ''}`}>Bluetooth Transmission</h2>
          {expandedSections.includes(3) && (
            <p className="section-content">
              Once the M5StickC Plus has gathered the motion data, it uses an Arduino-compatible microcontroller to transmit the data over Bluetooth. The device acts as a Bluetooth controller, sending the sensor readings as input signals to a connected device or application.
            </p>
          )}
        </div>
        <div className="section" onClick={() => toggleSection(4)}>
          <h2 className={`section-title ${expandedSections.includes(4) ? 'active' : ''}`}>JavaScript Integration</h2>
          {expandedSections.includes(4) && (
            <p className="section-content">
              To utilize the motion data in JavaScript, we can connect the M5StickC Plus to a computer or a web application. Using JavaScript, we can read the analog inputs of the Bluetooth controller and extract the pitch, roll, and yaw values. These values can be further processed and used to control various interactive elements or visualizations.
            </p>
          )}
        </div>
        <div className="section" onClick={() => toggleSection(5)}>
          <h2 className={`section-title ${expandedSections.includes(5) ? 'active' : ''}`}>Interactivity and Applications</h2>
          {expandedSections.includes(5) && (
            <p className="section-content">
              The M5StickC Plus opens up a wide range of possibilities for interactivity and applications. By mapping the pitch, roll, and yaw data to specific actions or visualizations, we can create immersive experiences, such as controlling a 3D object, navigating a virtual environment, or even designing interactive artwork. The real-time motion data enhances the level of engagement and control for the users.
            </p>
          )}
        </div>
      </div>
      <a href="/">Back to Homepage</a>
    </div>
  );
};

export default HowItWorksPage;
