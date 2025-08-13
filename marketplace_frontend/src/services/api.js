 /**
 * Minimal fetch wrapper for backend interactions.
 * Replace REACT_APP_API_BASE_URL with your backend URL when available.
 */
const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    credentials: 'include',
    ...options,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) return res.json();
  return res.text();
}

// PUBLIC_INTERFACE
export async function getListeners() {
  /** Fetch list of listeners. Placeholder returns static data if no backend. */
  if (!BASE_URL) {
    return [
      { id: 'l1', name: 'Alex Chen', rating: 4.9, tags: ['anxiety', 'stress'], price: 35, formats: ['audio', 'video', 'text'] },
      { id: 'l2', name: 'Priya Singh', rating: 4.8, tags: ['grief', 'relationships'], price: 30, formats: ['audio', 'text'] },
      { id: 'l3', name: 'Samir Patel', rating: 4.7, tags: ['burnout', 'work'], price: 40, formats: ['video', 'text', 'in-person'] },
    ];
  }
  return request('/listeners');
}

// PUBLIC_INTERFACE
export async function getListenerById(id) {
  /** Fetch single listener details by id. */
  if (!BASE_URL) {
    const all = await getListeners();
    return all.find((l) => l.id === id);
  }
  return request(`/listeners/${id}`);
}

// PUBLIC_INTERFACE
export async function createBooking(payload) {
  /** Create a new session booking. Placeholder echoes the payload. */
  if (!BASE_URL) {
    const generatedId =
      window.crypto?.randomUUID?.() || String(Date.now());
    return { id: generatedId, status: 'pending', ...payload };
  }
  return request('/bookings', { method: 'POST', body: JSON.stringify(payload) });
}

// PUBLIC_INTERFACE
export async function sendMessage(conversationId, message) {
  /** Send a message. Placeholder returns message with id. */
  if (!BASE_URL) {
    const generatedId =
      window.crypto?.randomUUID?.() || String(Date.now());
    return { id: generatedId, sentAt: new Date().toISOString(), message, conversationId };
  }
  return request(`/messages/${conversationId}`, { method: 'POST', body: JSON.stringify({ message }) });
}
