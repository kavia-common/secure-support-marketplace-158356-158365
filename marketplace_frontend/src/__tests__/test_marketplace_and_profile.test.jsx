import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import Marketplace from '../pages/marketplace/Marketplace';
import ListenerProfile from '../pages/marketplace/ListenerProfile';

describe('Marketplace and Listener Profile', () => {
  test('renders marketplace and filters listeners', async () => {
    render(
      <MemoryRouter initialEntries={['/marketplace']}>
        <Marketplace />
      </MemoryRouter>
    );

    // Defaults from API placeholder
    expect(await screen.findByText(/alex chen/i)).toBeInTheDocument();
    expect(screen.getByText(/priya singh/i)).toBeInTheDocument();

    // Filter by name
    fireEvent.change(screen.getByPlaceholderText(/search by name or topic/i), { target: { value: 'samir' } });
    expect(screen.queryByText(/alex chen/i)).not.toBeInTheDocument();
    expect(screen.getByText(/samir patel/i)).toBeInTheDocument();
  });

  test('navigates to listener profile and shows booking button', async () => {
    render(
      <MemoryRouter initialEntries={['/listener/l1']}>
        <Routes>
          <Route path="/listener/:id" element={<ListenerProfile />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/alex chen/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /book session/i })).toBeInTheDocument();
  });
});
