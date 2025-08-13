import React from 'react';

const modules = [
  { id: 'm1', title: 'Confidentiality & Privacy' },
  { id: 'm2', title: 'Active Listening Basics' },
  { id: 'm3', title: 'Crisis Escalation Protocols' },
  { id: 'm4', title: 'Cultural Sensitivity' },
];

export default function OnboardingTraining() {
  const [completed, setCompleted] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('training') || '{}'); } catch { return {}; }
  });

  const toggle = (id) => {
    setCompleted((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem('training', JSON.stringify(next));
      return next;
    });
  };

  const allDone = modules.every((m) => completed[m.id]);

  return (
    <div className="container" style={{ padding: 24, maxWidth: 780 }}>
      <h2>Training modules</h2>
      <div className="card" style={{ display: 'grid', gap: 12 }}>
        {modules.map((m) => (
          <label key={m.id} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <input type="checkbox" checked={!!completed[m.id]} onChange={() => toggle(m.id)} />
            <span>{m.title}</span>
          </label>
        ))}
      </div>
      <div style={{ marginTop: 12 }}>
        <button className="btn" disabled={!allDone}>{allDone ? 'Complete' : 'Mark all to complete'}</button>
      </div>
    </div>
  );
}
