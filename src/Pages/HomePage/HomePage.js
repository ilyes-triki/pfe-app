import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
const HomePage = () => {
  return (
    <div>
      pfe project
      <Link to={'/admin'}>
        <button>admin page</button>
      </Link>
    </div>
  );
};

export default HomePage;
