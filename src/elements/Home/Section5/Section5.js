import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { ArrowRightOutlined } from '@ant-design/icons';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Section5.css';
import img1 from '../../../Images/caousel1.jpg';
import img2 from '../../../Images/carousel2.jpg';
import img3 from '../../../Images/carousel3.jpg';

const images = [img1, img2, img3];

const Section5 = () => {
  return (
    <div className="carousel-section">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={3000}
        showArrows={false}
        showIndicators={false}
      >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`carousel-${index}`} />
          </div>
        ))}
      </Carousel>
      <div className="carousel-overlay">
        <h2>Get inspiration for your project</h2>
        <span className="get-started">
          {' '}
          <ArrowRightOutlined />
        </span>
      </div>
    </div>
  );
};

export default Section5;
