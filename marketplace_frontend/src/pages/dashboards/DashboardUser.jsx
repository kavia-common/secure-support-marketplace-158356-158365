import React from 'react';
import { Link } from 'react-router-dom';

export default function DashboardUser() {
  return (
    <div className="container" style={{ padding: 24 }}>
      <h2>Your Dashboard</h2>
      <div className="grid three" style={{ marginTop: 12 }}>
        <div className="card">
          <strong>Upcoming session</strong>
          <p className="helper">No upcoming sessions.</p>
          <Link to="/marketplace" className="btn">Book now</Link>
        </div>
        <div className="card">
          <strong>Messages</strong>
          <p className="helper">Continue your conversations securely.</p>
          <Link to="/messages" className="btn ghost">Open messages</Link>
        </div>
        <div className="card">
          <strong>Consent</strong>
          <p className="helper">View or update your consent preferences.</p>
          <Link to="/consent" className="btn ghost">Manage consent</Link>
        </div>
      </div>
    </div>
  );
}
