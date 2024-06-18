import React from 'react';
import './HeroSection.css';
import backgroundImg from '../../../Images/wallpapper.jpg'; // Ensure you have this image in the correct path

const HeroSection = () => {
  return (
    <section
      className="product-section"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="product-content">
        <h1>HIT Cleanroom LED Troffer</h1>
        <p>
          The HIT Troffer combines visually comfortable performance with an
          assortment of top-of-the-line ratings and listings. Designed for
          application in clean manufacturing, pharmaceutical, healthcare, and
          other controlled environments.
        </p>
        <a href="#" className="learn-more">
          Learn More
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
