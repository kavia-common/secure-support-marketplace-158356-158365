import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AuthError() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const type = params.get('type') || 'generic';

  const title =
    type === 'redirect' ? 'Redirect URL not allowed' :
    type === 'email' ? 'Email verification issue' :
    'Authentication error';

  return (
    <div className="container" style={{ padding: 24, maxWidth: 600 }}>
      <h2>{title}</h2>
      <div className="card" style={{ marginTop: 12 }}>
        <p className="helper">
          Something went wrong during authentication. Please try again. If this persists, contact support.
        </p>
        <ul className="helper">
          <li>Ensure your site/redirect URLs are allow-listed in Supabase Auth.</li>
          <li>Use the same browser/device where you requested the sign-in.</li>
        </ul>
        <div style={{ marginTop: 12 }}>
          <Link className="btn" to="/login">Return to Login</Link>
        </div>
      </div>
    </div>
  );
}
