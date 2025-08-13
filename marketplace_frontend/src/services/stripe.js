import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
// PUBLIC_INTERFACE
export function getStripe() {
  /**
   * Initialize Stripe with publishable key if provided.
   * If REACT_APP_STRIPE_PK is not set, returns null for placeholder usage.
   */
  if (!process.env.REACT_APP_STRIPE_PK) return null;
  if (!stripePromise) stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
  return stripePromise;
}
