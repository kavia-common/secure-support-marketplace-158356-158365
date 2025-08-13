import { io } from 'socket.io-client';

const WS_URL = process.env.REACT_APP_WS_URL;

// PUBLIC_INTERFACE
export function initMessaging() {
  /**
   * Initialize messaging socket. If no WS_URL is configured, returns a stub
   * that mimics the interface without a backend connection.
   */
  if (!WS_URL) {
    // eslint-disable-next-line no-console
    console.info('No REACT_APP_WS_URL provided. Messaging will work in demo mode.');
    return {
      onMessage: (_cb) => {},
      send: (_payload) => Promise.resolve(true),
      close: () => {},
    };
  }
  const socket = io(WS_URL, { transports: ['websocket'] });
  return {
    onMessage: (cb) => socket.on('message', cb),
    send: (payload) => new Promise((resolve) => { socket.emit('message', payload); resolve(true); }),
    close: () => socket.close(),
  };
}
