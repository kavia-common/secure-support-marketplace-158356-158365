import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';

const mockStates = {
  loading: false,
  user: null,
  isListener: false,
};

jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    ...mockStates,
    consentSigned: true,
    signOut: jest.fn(),
    signInWithEmail: jest.fn(),
    signUpWithEmail: jest.fn(),
    markConsentSigned: jest.fn(),
    setListenerRole: jest.fn(),
  }),
}));

import ProtectedRoute from '../components/common/ProtectedRoute';

// Helper to display the current path
function Path() {
  const location = useLocation();
  return <div data-testid="path">{location.pathname}</div>;
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    mockStates.loading = false;
    mockStates.user = null;
    mockStates.isListener = false;
  });

  test('redirects unauthenticated user to /login', async () => {
    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route path="/private" element={<ProtectedRoute><div>Private</div></ProtectedRoute>} />
          <Route path="/login" element={<Path />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByTestId('path')).toHaveTextContent('/login');
  });

  test('allows authenticated user', () => {
    mockStates.user = { id: 'u1' };
    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route path="/private" element={<ProtectedRoute><div>Private</div></ProtectedRoute>} />
          <Route path="/login" element={<Path />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Private')).toBeInTheDocument();
  });

  test('redirects non-listener when requireListener=true', () => {
    mockStates.user = { id: 'u1' };
    mockStates.isListener = false;

    render(
      <MemoryRouter initialEntries={['/listener/dashboard']}>
        <Routes>
          <Route path="/listener/dashboard" element={<ProtectedRoute requireListener><div>Listener Only</div></ProtectedRoute>} />
          <Route path="/dashboard" element={<Path />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('path')).toHaveTextContent('/dashboard');
  });

  test('allows listener when requireListener=true', () => {
    mockStates.user = { id: 'u1' };
    mockStates.isListener = true;

    render(
      <MemoryRouter initialEntries={['/listener/dashboard']}>
        <Routes>
          <Route path="/listener/dashboard" element={<ProtectedRoute requireListener><div>Listener Only</div></ProtectedRoute>} />
          <Route path="/dashboard" element={<Path />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Listener Only')).toBeInTheDocument();
  });
});
