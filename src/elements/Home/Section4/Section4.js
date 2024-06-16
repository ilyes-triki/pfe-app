import React from 'react';
import './Section4.css';
import image from '../../../Images/homme.png'

const Section4 = () => {
  return (
    <div className="subscription-container">
      <div className="image-container">
        <img src={image} alt="Man working on laptop" className="subscription-image" />
      </div>
      <div className="text-container">
        <h2>Sign Up for Designing with Lighting</h2>
        <p>
          Stay up-to-date with the latest lighting and controls specification news tailored
          to lighting professionals just like you and receive exclusive resources straight
          to your inbox monthly - such as continuing education opportunities, application
          guides, project inspiration and more.
        </p>
        <button className="subscribe-button">SUBSCRIBE</button>
      </div>
    </div>
  );
};

export default Section4;
