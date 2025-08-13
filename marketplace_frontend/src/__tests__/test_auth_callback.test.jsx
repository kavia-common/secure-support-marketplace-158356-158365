import React from 'react';
import { render, screen } from '@testing-library/react';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

// Mock supabase client used by AuthCallback
const exchangeMock = jest.fn();
const getSessionFromUrlMock = jest.fn();
jest.mock('../config/supabaseClient', () => ({
  supabase: {
    auth: {
      exchangeCodeForSession: (...args) => exchangeMock(...args),
      getSessionFromUrl: (...args) => getSessionFromUrlMock(...args),
    },
  },
}));

import AuthCallback from '../pages/auth/AuthCallback';

describe('AuthCallback', () => {
  beforeEach(() => {
    mockedNavigate.mockReset();
    exchangeMock.mockReset();
    getSessionFromUrlMock.mockReset();
    // ensure query string test isolation
    delete window.location;
    // eslint-disable-next-line no-restricted-properties
    window.location = { search: '' };
  });

  test('exchanges code and navigates to /dashboard on success', async () => {
    window.location.search = '?code=abc123';

    exchangeMock.mockResolvedValue({
      data: { session: { access_token: 'tok' } },
      error: null,
    });

    render(<AuthCallback />);

    // Wait until side effect resolves and navigate is called
    // We expect redirect to dashboard
    await screen.findByText(/auth callback/i);
    expect(mockedNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });
  });

  test('navigates to /login if no session', async () => {
    window.location.search = '?code=something';
    exchangeMock.mockResolvedValue({
      data: { session: null },
      error: null,
    });
    getSessionFromUrlMock.mockResolvedValue({ data: { session: null }, error: null });

    render(<AuthCallback />);

    await screen.findByText(/processing authentication/i);
    expect(mockedNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });

  test('handles error by routing to /auth/error', async () => {
    window.location.search = '?code=bad';
    exchangeMock.mockResolvedValue({
      data: null,
      error: new Error('redirect url not allowed'),
    });

    render(<AuthCallback />);

    await screen.findByText(/auth callback/i);
    expect(mockedNavigate).toHaveBeenCalledWith('/auth/error?type=redirect');
  });
});
