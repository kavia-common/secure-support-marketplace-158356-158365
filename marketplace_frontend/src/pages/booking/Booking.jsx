import React from 'react';
import { useParams } from 'react-router-dom';
import { createBooking, getListenerById } from '../../services/api';
import { generateTimeSlots } from '../../services/scheduling';

export default function Booking() {
  const { id } = useParams();
  const [listener, setListener] = React.useState(null);
  const [format, setFormat] = React.useState('audio');
  const [slot, setSlot] = React.useState('');
  const [note, setNote] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [result, setResult] = React.useState(null);

  React.useEffect(() => {
    getListenerById(id).then(setListener).catch((e) => console.error(e));
  }, [id]);

  const slots = React.useMemo(() => generateTimeSlots(8, 20, 30), []);
  const onBook = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await createBooking({ listenerId: id, format, slot, note });
      setResult(res);
    } catch (err) {
      alert(err.message || 'Booking failed.');
    } finally {
      setBusy(false);
    }
  };

  if (!listener) return <div className="container" style={{ padding: 24 }}>Loading booking...</div>;

  return (
    <div className="container" style={{ padding: 24, maxWidth: 780 }}>
      <h2>Book {listener.name}</h2>
      <form onSubmit={onBook} style={{ display: 'grid', gap: 12 }}>
        <label>
          Session type
          <select className="input" value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="audio">Audio</option>
            <option value="video">Video</option>
            <option value="text">Text</option>
            <option value="in-person">In-person</option>
          </select>
        </label>
        <label>
          Time slot
          <select className="input" value={slot} onChange={(e) => setSlot(e.target.value)}>
            <option value="">Select a time</option>
            {slots.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </label>
        <label>
          Notes (optional)
          <textarea className="input" rows={4} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Anything you'd like your listener to know?" />
        </label>
        <button className="btn" disabled={!slot || busy}>{busy ? 'Booking...' : 'Confirm booking'}</button>
      </form>

      {result && (
        <div className="card" style={{ marginTop: 12 }}>
          <strong>Booking created</strong>
          <p className="helper">Booking ID: {result.id}</p>
          <p className="helper">Status: {result.status}</p>
        </div>
      )}
    </div>
  );
}
