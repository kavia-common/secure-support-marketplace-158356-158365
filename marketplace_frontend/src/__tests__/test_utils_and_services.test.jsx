import { getURL } from '../utils/getURL';
import { generateTimeSlots } from '../services/scheduling';

describe('Utils and services', () => {
  test('getURL normalizes scheme and trailing slash', () => {
    const original = process.env.REACT_APP_SITE_URL;
    process.env.REACT_APP_SITE_URL = 'example.com';
    expect(getURL()).toBe('https://example.com/');
    process.env.REACT_APP_SITE_URL = original;
  });

  test('generateTimeSlots returns non-empty slots within range', () => {
    const slots = generateTimeSlots(8, 9, 15);
    expect(Array.isArray(slots)).toBe(true);
    expect(slots.length).toBeGreaterThan(0);
    // Ensure ISO value and label exist
    expect(slots[0]).toHaveProperty('label');
    expect(slots[0]).toHaveProperty('value');
  });
});
