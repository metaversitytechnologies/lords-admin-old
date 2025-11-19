
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const loginApi = async (userId, password) => {
  const response = await fetch(`${API_BASE_URL}/login/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      password,
      appUrl: globalThis.location.hostname,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
};
