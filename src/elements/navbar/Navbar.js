import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

/**
 * Renders a navigation bar component with links to the home page, login page, and admin panel.
 *
 * @return {JSX.Element} The navigation bar component.
 */
const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="#" className="navbar-brand">
        Smart Lighting System
      </a>
      <ul className="navbar-links">
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/login'}>Login</Link>
        </li>
        <li>
          <Link to={'/admin'}>Admin panel</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
