import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Mock useAuth across these auth page tests
jest.mock('../context/AuthContext', () => {
  const signInWithEmail = jest.fn().mockResolvedValue({});
  const signUpWithEmail = jest.fn().mockResolvedValue({});
  return {
    useAuth: () => ({
      user: null,
      loading: false,
      isListener: false,
      consentSigned: false,
      signInWithEmail,
      signUpWithEmail,
      signOut: jest.fn(),
      markConsentSigned: jest.fn(),
      setListenerRole: jest.fn(),
    }),
  };
});

import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';

describe('Auth pages (Login & Signup)', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('Login submits email/password via useAuth.signInWithEmail', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>
    );

    const email = screen.getByPlaceholderText(/you@example.com/i);
    const password = screen.getByPlaceholderText('••••••••');
    const submit = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(email, { target: { value: 'test@example.com' } });
    fireEvent.change(password, { target: { value: 'secret123' } });
    fireEvent.click(submit);

    // Button goes into busy state
    expect(await screen.findByRole('button', { name: /signing in/i })).toBeInTheDocument();
  });

  test('Signup submits email/password via useAuth.signUpWithEmail', async () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <Signup />
      </MemoryRouter>
    );

    const email = screen.getByPlaceholderText(/you@example.com/i);
    const password = screen.getByPlaceholderText('••••••••');
    const submit = screen.getByRole('button', { name: /sign up/i });

    fireEvent.change(email, { target: { value: 'new@example.com' } });
    fireEvent.change(password, { target: { value: 'secret123' } });
    fireEvent.click(submit);

    // Feedback message appears on success
    expect(await screen.findByText(/check your email to confirm/i)).toBeInTheDocument();
  });
});
