
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

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

export const createUser = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/user/create-user-lord`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create user');
  }

  return response.json();
};

export const getBalance = async () => {
  const response = await fetch(`${API_BASE_URL}/user/get-balance-lord`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch balance');
  }

  return response.json();
};
