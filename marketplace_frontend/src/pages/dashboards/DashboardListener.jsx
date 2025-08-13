import React from 'react';
import { Link } from 'react-router-dom';

export default function DashboardListener() {
  return (
    <div className="container" style={{ padding: 24 }}>
      <h2>Listener Dashboard</h2>
      <div className="grid three" style={{ marginTop: 12 }}>
        <div className="card">
          <strong>Today</strong>
          <p className="helper">0 sessions</p>
        </div>
        <div className="card">
          <strong>Earnings</strong>
          <p className="helper">$0 this week</p>
        </div>
        <div className="card">
          <strong>Inbox</strong>
          <p className="helper">No new messages</p>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Quick actions</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link to="/onboarding/training" className="btn ghost">Training</Link>
          <Link to="/marketplace" className="btn">View marketplace</Link>
        </div>
      </div>
    </div>
  );
}
