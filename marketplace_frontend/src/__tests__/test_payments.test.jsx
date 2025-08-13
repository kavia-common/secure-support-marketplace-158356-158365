import React from 'react';
import { render, screen } from '@testing-library/react';

// Ensure getStripe returns null to trigger fallback
jest.mock('../services/stripe', () => ({
  getStripe: () => null,
}));

import Payments from '../pages/payments/Payments';

describe('Payments page', () => {
  test('renders Stripe not configured fallback', () => {
    render(<Payments />);
    expect(screen.getByText(/stripe not configured/i)).toBeInTheDocument();
  });
});
