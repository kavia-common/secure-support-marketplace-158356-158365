import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Create a controllable fake socket
let capturedOnMessage;
const sendMock = jest.fn().mockResolvedValue(true);
jest.mock('../services/messaging', () => ({
  initMessaging: () => ({
    onMessage: (cb) => { capturedOnMessage = cb; },
    send: (payload) => sendMock(payload),
    close: () => {},
  }),
}));

import Messaging from '../pages/messaging/Messaging';

describe('Messaging', () => {
  beforeEach(() => {
    capturedOnMessage = undefined;
    sendMock.mockClear();
  });

  test('sends a message and displays it', async () => {
    render(<Messaging />);

    const input = screen.getByPlaceholderText(/type your message/i);
    const sendBtn = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'Hello there' } });
    fireEvent.click(sendBtn);

    // Message from me should appear
    expect(await screen.findByText('You')).toBeInTheDocument();
    expect(screen.getByText('Hello there')).toBeInTheDocument();
    expect(sendMock).toHaveBeenCalledWith('Hello there');
  });

  test('receives a message via socket callback', async () => {
    render(<Messaging />);

    // Trigger incoming message
    if (typeof capturedOnMessage === 'function') {
      capturedOnMessage('Hi, how can I help?');
    }

    // "Listener" message should appear
    expect(await screen.findByText('Listener')).toBeInTheDocument();
    expect(screen.getByText('Hi, how can I help?')).toBeInTheDocument();
  });
});
