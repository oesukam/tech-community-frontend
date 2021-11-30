import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => (
  <div id="notfound">
    <div className="notfound">
      <div className="notfound-404" />
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>
        Sorry! The page you are looking for wether does not exist or
        has been removed or the name changed or is temporarily unavailable
      </p>
      <Link to="/">Back to homepage</Link>
    </div>
  </div>
);

export default NotFound;
