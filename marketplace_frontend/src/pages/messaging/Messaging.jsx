import React from 'react';
import { initMessaging } from '../../services/messaging';
import { sendMessage as sendMessageApi } from '../../services/api';

export default function Messaging() {
  const [messages, setMessages] = React.useState([
    { id: 'm1', from: 'me', text: 'Hello!', at: new Date().toISOString() },
    { id: 'm2', from: 'them', text: 'Hi! How can I support you today?', at: new Date().toISOString() },
  ]);
  const [input, setInput] = React.useState('');
  const socketRef = React.useRef(null);

  React.useEffect(() => {
    socketRef.current = initMessaging();
    socketRef.current.onMessage((msg) => {
      setMessages((prev) => [...prev, { id: String(prev.length + 1), from: 'them', text: msg, at: new Date().toISOString() }]);
    });
    return () => socketRef.current?.close?.();
  }, []);

  const onSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const text = input.trim();
    setMessages((prev) => [...prev, { id: String(prev.length + 1), from: 'me', text, at: new Date().toISOString() }]);
    setInput('');
    socketRef.current?.send?.(text);
    await sendMessageApi('demo', text).catch(() => {});
  };

  return (
    <div className="container" style={{ padding: 24, maxWidth: 780 }}>
      <h2>Secure Messaging</h2>
      <div className="chat card">
        {messages.map((m) => (
          <div key={m.id} className={`message ${m.from === 'me' ? 'me' : ''}`}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{m.from === 'me' ? 'You' : 'Listener'}</div>
              <div>{m.text}</div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={onSend} style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        <input className="input" placeholder="Type your message..." value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="btn" type="submit">Send</button>
      </form>
    </div>
  );
}
