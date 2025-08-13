import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function OnboardingApply() {
  const { setListenerRole } = useAuth();
  const [submitted, setSubmitted] = React.useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setListenerRole(true);
      alert('Application approved (demo). Listener role enabled.');
    }, 800);
  };

  return (
    <div className="container" style={{ padding: 24, maxWidth: 780 }}>
      <h2>Listener Application</h2>
      {!submitted ? (
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
          <label>Full name<input className="input" required /></label>
          <label>Email<input className="input" type="email" required /></label>
          <label>Experience<textarea className="input" rows={4} required placeholder="Describe your listening/support experience" /></label>
          <button className="btn">Submit application</button>
        </form>
      ) : (
        <div className="card">Application submitted. We will notify you after review.</div>
      )}
    </div>
  );
}
