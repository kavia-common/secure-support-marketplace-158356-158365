export function getURL() {
  let url =
    process.env.REACT_APP_SITE_URL ||
    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

  // Ensure URL starts with http/https
  if (url && !url.startsWith('http')) {
    url = `https://${url}`;
  }

  // Ensure trailing slash
  if (!url.endsWith('/')) {
    url = `${url}/`;
  }

  return url;
}
