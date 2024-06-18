import React from 'react';
import Navbar from '../../elements/navbar/Navbar.js';
import './HomePage.css';
import HeroSection from '../../elements/Home/HeroSection/HeroSection.js';
import Section2 from '../../elements/Home/Section2/Section2.js';
import Section3 from '../../elements/Home/Section3/Section3.js';
import Section4 from '../../elements/Home/Section4/Section4.js';
import Section5 from '../../elements/Home/Section5/Section5.js';

import Footer from '../../elements/footer/Footer.js';
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Footer />
    </div>
  );
};

export default HomePage;
