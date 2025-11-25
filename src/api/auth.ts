
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export const loginApi = async (userId: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/login/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      password,
      // appUrl: "admin." + globalThis.location.hostname,
      appUrl: "admin.localhost",
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
};

export const createUser = async (payload: object) => {
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

export const getNetExposureDetail = async () => {
  const response = await fetch(`${API_BASE_URL}/user/netexposure-detail-lord`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch net exposure details');
  }

  return response.json();
};
    export const getChildListLord = async (payload: object) => {
      const response = await fetch(`${API_BASE_URL}/user/child-list-lord`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch child list');
      }
    
      return response.json();
    };

export const updateUserLord = async (payload: object) => {
  const response = await fetch(`${API_BASE_URL}/user/update-user-lord`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update user');
  }

  return response.json();
};

export const getDetailForUpdateLord = async (payload: { userId: string }) => {

  const response = await fetch(`${API_BASE_URL}/user/get-detail-for-update-lord`, {

    method: 'POST',

    headers: getAuthHeaders(),

    body: JSON.stringify(payload),

  });



  if (!response.ok) {

    const errorData = await response.json();

    throw new Error(errorData.message || 'Failed to fetch user details for update');

  }



  return response.json();

};



export const getUnsettledByMatchId = async (payload: object) => {

  const response = await fetch(`${API_BASE_URL}/lord/unsettled-by-matchid`, {

    method: 'POST',

    headers: getAuthHeaders(),

    body: JSON.stringify(payload),

  });



  if (!response.ok) {

    const errorData = await response.json();

    throw new Error(errorData.message || 'Failed to fetch unsettled bets by match ID');

  }



  return response.json();

};
