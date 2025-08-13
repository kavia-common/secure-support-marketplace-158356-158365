import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Privacy-first emotional support</h1>
          <p>
            Connect anonymously with trained listeners through audio, video, text, or in-person sessions.
            Verify your identity privately for safety and sign consent to begin.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link className="btn" to="/marketplace">Browse listeners</Link>
            <Link className="btn ghost" to="/signup">Get started</Link>
          </div>
        </div>
      </section>

      <section className="container">
        <h3 className="section-title">How it works</h3>
        <div className="grid three">
          <div className="card">
            <strong>1. Sign up</strong>
            <p className="helper">Create an account and verify privately for safety and compliance.</p>
          </div>
          <div className="card">
            <strong>2. Consent</strong>
            <p className="helper">Review and sign informed consent to protect your privacy and rights.</p>
          </div>
          <div className="card">
            <strong>3. Book & connect</strong>
            <p className="helper">Choose your listener, select a session type, and start securely.</p>
          </div>
        </div>
      </section>
    </>
  );
}
