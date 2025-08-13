import React from 'react';
import { Link } from 'react-router-dom';
import { getListeners } from '../../services/api';

export default function Marketplace() {
  const [listeners, setListeners] = React.useState([]);
  const [q, setQ] = React.useState('');

  React.useEffect(() => {
    getListeners().then(setListeners).catch((e) => console.error(e));
  }, []);

  const filtered = listeners.filter((l) => {
    const find = q.trim().toLowerCase();
    if (!find) return true;
    return l.name.toLowerCase().includes(find) || (l.tags || []).some((t) => t.toLowerCase().includes(find));
  });

  return (
    <div className="container" style={{ padding: 24 }}>
      <h2>Find a listener</h2>
      <div className="form-row two" style={{ marginTop: 8 }}>
        <input className="input" placeholder="Search by name or topic..." value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="input" defaultValue="">
          <option value="">Any format</option>
          <option value="audio">Audio</option>
          <option value="video">Video</option>
          <option value="text">Text</option>
          <option value="in-person">In-person</option>
        </select>
      </div>

      <div className="grid three listeners-grid" style={{ marginTop: 16 }}>
        {filtered.map((l) => (
          <div key={l.id} className="card listener-card">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>{l.name}</h3>
              <span className="badge">⭐ {l.rating}</span>
            </div>
            <div className="helper" style={{ margin: '6px 0' }}>{(l.tags || []).join(' • ')}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <small className="muted">${l.price}/session</small>
              <Link className="btn" to={`/listener/${l.id}`}>View profile</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
