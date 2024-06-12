import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Pages/LoginPage/AuthProvider';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase-config';

import './Navbar.css';

/**
 * Renders a navigation bar component with links to the home page, login page, and admin panel.
 *
 * @return {JSX.Element} The navigation bar component.
 */
export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const disconnect = async () => {
    await signOut(auth);
    navigate('/');
  };

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
      </div>
      {user ? (
        <div className="nav-item">
          {' '}
          <span>alerts</span> <button onClick={disconnect}>disconnect</button>{' '}
        </div>
      ) : (
        <Link to={'/Login'}>
          <button className="log">Login</button>
        </Link>
      )}
    </div>
  );
}
