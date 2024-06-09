import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

/**
 * Renders a navigation bar component with links to the home page, login page, and admin panel.
 *
 * @return {JSX.Element} The navigation bar component.
 */
export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <span>Smart Light</span>
      </div>
      <div className="navs">
        <div className="nav-item">
          <Link className="link" to={'/'}>
            <span className="home">Home</span>
          </Link>
        </div>
        <div className="nav-item">
          <Link className="link">
            {' '}
            <span className="aboutUs">About Us</span>{' '}
          </Link>
        </div>
        <div className="nav-item">
          <Link className="link">
            {' '}
            <span className="Contact">Contact Us</span>
          </Link>
        </div>
        <div className="nav-item">
          <Link className="link" to={'/Admin'}>
            <span className="Admin">Admin Panel</span>
          </Link>
        </div>
      </div>
      <button className="log">Login</button>
    </div>
  );
}
