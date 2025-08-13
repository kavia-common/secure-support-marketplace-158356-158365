import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import Booking from '../pages/booking/Booking';

describe('Booking flow', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('selects time and confirms booking', async () => {
    render(
      <MemoryRouter initialEntries={['/booking/l1']}>
        <Routes>
          <Route path="/booking/:id" element={<Booking />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for listener to load
    expect(await screen.findByText(/book alex chen/i)).toBeInTheDocument();

    // Select a time slot (first non-empty option)
    const slotSelect = screen.getByLabelText(/time slot/i);
    const options = within(slotSelect).getAllByRole('option');
    // first option is placeholder "Select a time", choose the next if available
    if (options.length > 1) {
      fireEvent.change(slotSelect, { target: { value: options[1].getAttribute('value') } });
    }

    // Add a note
    const notes = screen.getByPlaceholderText(/anything you'd like your listener to know/i);
    fireEvent.change(notes, { target: { value: 'Looking forward to it.' } });

    const confirm = screen.getByRole('button', { name: /confirm booking/i });
    fireEvent.click(confirm);

    // Result card
    expect(await screen.findByText(/booking created/i)).toBeInTheDocument();
    expect(screen.getByText(/status: pending/i)).toBeInTheDocument();
  });
});
