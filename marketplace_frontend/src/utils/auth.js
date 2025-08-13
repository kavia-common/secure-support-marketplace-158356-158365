export const handleAuthError = (error, navigate) => {
  // eslint-disable-next-line no-console
  console.error('Authentication error:', error);

  const msg = (error && (error.message || error.error_description)) || '';

  if (msg.toLowerCase().includes('redirect')) {
    navigate('/auth/error?type=redirect');
  } else if (msg.toLowerCase().includes('email')) {
    navigate('/auth/error?type=email');
  } else {
    navigate('/auth/error');
  }
};
