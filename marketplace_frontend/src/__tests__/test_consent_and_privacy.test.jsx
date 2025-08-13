import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// matchMedia polyfill for useTheme
beforeAll(() => {
  if (!window.matchMedia) {
    window.matchMedia = () => ({
      matches: false,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      onchange: null,
      dispatchEvent: () => false,
      media: '',
    });
  }
});

const mockAuth = {
  user: { id: 'u1' },
  loading: false,
  isListener: false,
  consentSigned: false,
  signOut: jest.fn(),
  signInWithEmail: jest.fn(),
  signUpWithEmail: jest.fn(),
  markConsentSigned: jest.fn(),
  setListenerRole: jest.fn(),
};

jest.mock('../context/AuthContext', () => ({
  useAuth: () => mockAuth,
}));

import App from '../App';

describe('App consent and privacy overlays', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('shows PrivacyOverlay and ConsentModal, can dismiss both', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Privacy overlay visible
    expect(screen.getByText(/privacy-first experience/i)).toBeInTheDocument();
    // Consent modal visible
    expect(screen.getByText(/review and sign consent/i)).toBeInTheDocument();

    // Dismiss privacy overlay
    fireEvent.click(screen.getByRole('button', { name: /i understand/i }));
    expect(screen.queryByText(/privacy-first experience/i)).not.toBeInTheDocument();

    // Dismiss consent modal by clicking "Later"
    fireEvent.click(screen.getByRole('button', { name: /later/i }));
    expect(screen.queryByText(/review and sign consent/i)).not.toBeInTheDocument();
  });
});
