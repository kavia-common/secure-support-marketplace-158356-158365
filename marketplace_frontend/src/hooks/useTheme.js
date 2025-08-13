import React from 'react';

const THEME_KEY = 'theme';

// PUBLIC_INTERFACE
export default function useTheme() {
  /** Manage light/dark theme persisted in localStorage and applied to document. */
  const [theme, setTheme] = React.useState(() => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = React.useCallback(() => {
    /** Toggle between light and dark themes. */
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, toggleTheme };
}
