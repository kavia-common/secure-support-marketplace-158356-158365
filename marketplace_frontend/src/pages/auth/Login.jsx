import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { signInWithEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signInWithEmail(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to sign in.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container" style={{ padding: 24, maxWidth: 520 }}>
      <h2>Welcome back</h2>
      <p className="helper">Sign in to continue to your dashboard.</p>
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
        <button className="btn" disabled={busy}>{busy ? 'Signing in...' : 'Sign in'}</button>
      </form>
      <p className="helper" style={{ marginTop: 12 }}>
        New here? <Link to="/signup">Create an account</Link>
      </p>
    </div>
  );
}
