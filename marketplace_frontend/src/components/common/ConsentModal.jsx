import React from 'react';
import { useAuth } from '../../context/AuthContext';

// PUBLIC_INTERFACE
export default function ConsentModal() {
  /** Non-blocking consent reminder. Full flow is available at /consent. */
  const { user, consentSigned } = useAuth();
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (user && !consentSigned) setShow(true);
  }, [user, consentSigned]);

  if (!show) return null;

  return (
    <div className="privacy-overlay" role="dialog" aria-modal="true">
      <div className="privacy-panel">
        <h3>Review and Sign Consent</h3>
        <p className="helper">
          To book sessions, you must review and sign our informed consent agreement.
        </p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
          <a href="/consent" className="btn">Go to Consent</a>
          <button className="btn ghost" onClick={() => setShow(false)}>Later</button>
        </div>
      </div>
    </div>
  );
}
