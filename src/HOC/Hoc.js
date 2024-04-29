import React from 'react';
import Navbar from '../elements/navbar/Navbar.js';
import Footer from '../elements/footer/Footer.js';
import './Hoc.css';

/**
 * A Higer Order Component that adds a Navbar and Footer around a given component.
 *
 * @param {function} WrappedComponent - The component to wrap with Navbar and Footer.
 * @return {function} A new component with Navbar and Footer.
 */
const WithNavbar = (WrappedComponent) => {
  return () => (
    <div className="rendred-element">
      <div className="navbar-element">
        {' '}
        <Navbar />
      </div>
      <div className="main-element">
        {' '}
        <WrappedComponent />
      </div>
      <div className="footer-element">
        <Footer />
      </div>
    </div>
  );
};

export default WithNavbar;
