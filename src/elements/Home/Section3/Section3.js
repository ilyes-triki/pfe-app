import React from 'react';
import './Section3.css';
import img1 from '../../../Images/img1.avif';
import img2 from '../../../Images/img2.avif';
import img3 from '../../../Images/img3.avif';
import img4 from '../../../Images/img4.avif';
import img5 from '../../../Images/img5.avif';
import img6 from '../../../Images/led2.jpg';

const Section3 = () => {
  const solutions = [
    {
      title: 'Waste & Wastewater Facilities',
      description: 'See how you can begin saving money now',
      imageUrl: img1,
    },
    {
      title: 'Street & Roadway',
      description: 'Drive down energy and maintenance costs',
      imageUrl: img2,
    },
    {
      title: 'Manufacturing Facilities',
      description: 'Reduce operational costs and enhance safety',
      imageUrl: img3,
    },
    {
      title: 'Warehouse',
      description: 'Place light where you need it most',
      imageUrl: img4,
    },
    {
      title: 'Municipalities and Local Government',
      description: 'Save energy and reduce carbon footprint',
      imageUrl: img5,
    },
    {
      title: 'Public Infrastructure and IIJA',
      description: 'Energy efficient lighting solutions for your IIJA project',
      imageUrl: img6,
    },
  ];
  return (
    <div className="container">
      <h1 className="hero-title">Featured Solutions </h1>

      <div className="featured-solutions">
        {solutions.map((solution, index) => (
          <div
            key={index}
            className="solution-card"
            style={{ backgroundImage: `url(${solution.imageUrl})` }}
          >
            <div className="solution-overlay">
              <h2>{solution.title}</h2>
              <p>{solution.description}</p>
              <button className="get-started">Get Started</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section3;
