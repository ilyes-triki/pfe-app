import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col gap-2">
      error 404 not found
      <Link to="/">
        <button>return to HomePage</button>
      </Link>
    </div>
  );
};

export default NotFound;
