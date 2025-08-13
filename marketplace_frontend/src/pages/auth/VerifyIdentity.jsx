import React from 'react';

export default function VerifyIdentity() {
  const [status, setStatus] = React.useState('pending');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitted');
    setTimeout(() => setStatus('verified'), 1000);
  };

  return (
    <div className="container" style={{ padding: 24, maxWidth: 680 }}>
      <h2>Verify your identity</h2>
      <p className="helper">We verify identities privately to protect our community. This is not visible to the public.</p>

      {status === 'pending' && (
        <form onSubmit={handleSubmit} className="form" style={{ display: 'grid', gap: 12 }}>
          <label>
            Legal name (private)
            <input className="input" placeholder="Your full legal name" required />
          </label>
          <label>
            Government ID number (private)
            <input className="input" placeholder="########" required />
          </label>
          <label>
            Upload ID photo
            <input type="file" className="input" accept="image/*" required />
          </label>
          <button className="btn">Submit for verification</button>
        </form>
      )}

      {status === 'submitted' && <div className="card">Submitting for review...</div>}
      {status === 'verified' && <div className="card" style={{ borderColor: 'seagreen', color: 'seagreen' }}>Verified. You may proceed to consent and booking.</div>}
    </div>
  );
}
