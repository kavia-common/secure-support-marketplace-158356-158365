import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Signup() {
  const { signUpWithEmail } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signUpWithEmail(email, password);
      setMessage('Check your email to confirm your account.');
    } catch (err) {
      setError(err.message || 'Failed to sign up.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container" style={{ padding: 24, maxWidth: 520 }}>
      <h2>Create your account</h2>
      <p className="helper">We will send you a confirmation link.</p>
      <form onSubmit={onSubmit} className="form" style={{ display: 'grid', gap: 12 }}>
        <label>
          Email
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
        </label>
        <label>
          Password
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
        </label>
        {error && <div className="card" style={{ borderColor: 'crimson', color: 'crimson' }}>{error}</div>}
        {message && <div className="card" style={{ borderColor: 'seagreen', color: 'seagreen' }}>{message}</div>}
        <button className="btn" disabled={busy}>{busy ? 'Creating account...' : 'Sign up'}</button>
      </form>
      <p className="helper" style={{ marginTop: 12 }}>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
}
