import React from 'react';
import './HeroSection.css';

import ledImage from '../../../Images/led3.jpg'


const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>HIT Cleanroom LED Troffer</h1>
        <p>
          The HIT Troffer combines visually comfortable performance with an
          assortment of top-of-the-line ratings and listings. Designed for
          application in clean manufacturing, pharmaceutical, healthcare, and
          other controlled environments.
        </p>
        <a href="#" className="learn-more">
          Learn More <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
