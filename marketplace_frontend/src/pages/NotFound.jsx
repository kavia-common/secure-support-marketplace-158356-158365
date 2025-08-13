import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container" style={{ padding: 24 }}>
      <h2>Page not found</h2>
      <p className="helper">The page you requested could not be found.</p>
      <Link className="btn" to="/">Go home</Link>
    </div>
  );
}
