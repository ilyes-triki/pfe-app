import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../elements/navbar/Navbar.js';

const NotFound = () => {
  return (
    <div className="flex flex-col gap-2">
      <Navbar />
      error 404 not found
    </div>
  );
};

export default NotFound;
