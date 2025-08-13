import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Consent() {
  const { consentSigned, markConsentSigned } = useAuth();
  const [agree, setAgree] = React.useState(false);
  const [agreePrivacy, setAgreePrivacy] = React.useState(false);

  const onSign = (e) => {
    e.preventDefault();
    if (agree && agreePrivacy) {
      markConsentSigned();
      alert('Consent signed. You can now book sessions.');
    }
  };

  return (
    <div className="container" style={{ padding: 24, maxWidth: 780 }}>
      <h2>Informed Consent</h2>
      <div className="card" style={{ marginTop: 12 }}>
        <p className="helper">
          This service provides supportive listening, not clinical therapy or medical advice.
          In emergencies, call your local emergency number. Your data is handled per our privacy policy.
        </p>
        <ul className="helper">
          <li>Sessions may be audio, video, text, or in-person.</li>
          <li>We keep anonymized audit logs for safety and compliance.</li>
          <li>You can request data export or deletion in your settings.</li>
        </ul>
      </div>

      <form onSubmit={onSign} style={{ display: 'grid', gap: 12, marginTop: 12 }}>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          <span>I acknowledge this is supportive listening, not professional mental health care.</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <input type="checkbox" checked={agreePrivacy} onChange={(e) => setAgreePrivacy(e.target.checked)} />
          <span>I have read and agree to the privacy policy and consent to processing my data.</span>
        </label>
        <button className="btn" disabled={consentSigned || !(agree && agreePrivacy)}>{consentSigned ? 'Consent already signed' : 'Sign Consent'}</button>
      </form>
    </div>
  );
}
