import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock useAuth to allow setListenerRole side effect without provider
const setListenerRole = jest.fn();
jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'u1' },
    loading: false,
    isListener: false,
    consentSigned: true,
    signInWithEmail: jest.fn(),
    signUpWithEmail: jest.fn(),
    signOut: jest.fn(),
    markConsentSigned: jest.fn(),
    setListenerRole,
  }),
}));

import OnboardingApply from '../pages/onboarding/OnboardingApply';
import OnboardingTraining from '../pages/onboarding/OnboardingTraining';

describe('Onboarding flows', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('OnboardingApply submits and calls setListenerRole eventually', async () => {
    jest.useFakeTimers();
    render(<OnboardingApply />);

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Alex' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText(/experience/i), { target: { value: 'Many years' } });

    fireEvent.click(screen.getByRole('button', { name: /submit application/i }));

    // Submitting state
    expect(screen.getByText(/application submitted/i)).toBeInTheDocument();

    // Fast-forward timers to trigger approval
    jest.runAllTimers();

    // An alert is invoked - stub it to avoid noisy logs
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    expect(setListenerRole).toHaveBeenCalledWith(true);
    alertSpy.mockRestore();
    jest.useRealTimers();
  });

  test('OnboardingTraining toggles and enables completion when all checked', () => {
    render(<OnboardingTraining />);
    const checkboxes = screen.getAllByRole('checkbox');
    // Mark all
    checkboxes.forEach(cb => fireEvent.click(cb));

    const completeBtn = screen.getByRole('button');
    expect(completeBtn).toBeEnabled();
  });
});
