import React from 'react';

/**
 * PUBLIC_INTERFACE
 * PrivacyOverlay
 * A simple overlay to inform the user about privacy practices and allow them to dismiss it.
 * Props:
 * - onDismiss: function called when the user clicks "I understand"
 * Returns:
 * - A modal overlay element
 */
export default function PrivacyOverlay({ onDismiss }) {
  return (
    <div className="privacy-overlay" role="dialog" aria-modal="true" aria-label="Privacy notice">
      <div className="privacy-panel">
        <h3>Privacy-first experience</h3>
        <p className="helper">
          You remain anonymous to the public. We verify identity privately for legal and safety reasons.
          Your data is encrypted in transit; content is confidential as per our policy.
        </p>
        <ul className="helper">
          <li>Anonymous public profiles</li>
          <li>Consent required before booking</li>
          <li>Anonymized audit logs for compliance</li>
        </ul>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
          <button className="btn" onClick={onDismiss}>I understand</button>
        </div>
      </div>
    </div>
  );
}
