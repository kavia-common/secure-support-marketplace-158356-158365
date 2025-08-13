import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Mock useAuth so App can render without AuthProvider
jest.mock('./context/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    isListener: false,
    consentSigned: true,
    signInWithEmail: jest.fn(),
    signUpWithEmail: jest.fn(),
    signOut: jest.fn(),
    markConsentSigned: jest.fn(),
    setListenerRole: jest.fn(),
  }),
}));

// Polyfill matchMedia for Navbar/useTheme
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

import App from './App';

test('renders learn react link', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
