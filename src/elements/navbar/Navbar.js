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
          <span className="home">Home</span>
        </div>
        <div className="nav-item">
          <span className="aboutUs">About Us</span>
        </div>
        <div className="nav-item">
          <span className="Contact">Contact Us</span>
        </div>
        <div className="nav-item">
          <span className="Admin">Admin Panel</span>
        </div>
      </div>
      <button className="log">Login</button>
    </div>
  )
}
