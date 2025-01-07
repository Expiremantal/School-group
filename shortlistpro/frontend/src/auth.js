// auth.js
export function getUserFromToken() {
  const token = localStorage.getItem('authToken');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodes the base64-encoded JWT payload
      return payload.user; // Ensure the token structure includes a `user` key with role and other data
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }
  return null;
}
