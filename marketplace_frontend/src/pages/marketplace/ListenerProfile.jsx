import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getListenerById } from '../../services/api';

export default function ListenerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listener, setListener] = React.useState(null);

  React.useEffect(() => {
    getListenerById(id).then(setListener).catch((e) => console.error(e));
  }, [id]);

  if (!listener) return <div className="container" style={{ padding: 24 }}>Loading listener...</div>;

  return (
    <div className="container" style={{ padding: 24, maxWidth: 780 }}>
      <div className="card">
        <h2>{listener.name}</h2>
        <p className="helper">Specialties: {(listener.tags || []).join(', ')}</p>
        <p className="helper">Formats: {(listener.formats || []).join(', ')}</p>
        <p className="helper">Rate: ${listener.price} / session</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn" onClick={() => navigate(`/booking/${listener.id}`)}>Book session</button>
        </div>
      </div>
    </div>
  );
}
