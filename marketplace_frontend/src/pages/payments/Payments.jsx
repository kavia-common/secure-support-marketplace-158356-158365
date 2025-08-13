import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '../../services/stripe';

function CheckoutForm() {
  return (
    <div className="card">
      <strong>Checkout</strong>
      <p className="helper">Stripe integration placeholder. Add payment details here.</p>
      <button className="btn" disabled>Pay now (demo)</button>
    </div>
  );
}

export default function Payments() {
  const stripePromise = getStripe();

  if (!stripePromise) {
    return (
      <div className="container" style={{ padding: 24 }}>
        <h2>Payments</h2>
        <div className="card">
          <p className="helper">
            Stripe not configured. Set REACT_APP_STRIPE_PK to enable payment widgets.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: 24 }}>
      <h2>Payments</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
