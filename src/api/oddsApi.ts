const API_BASE_URL = import.meta.env.VITE_ODDS_API;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getOddsData = async (matchId: string) => {
  // const response = await fetch(`${API_BASE_URL}/betfair_api/fancy/${matchId}`, {
  //   method: "GET",
  //   headers: getAuthHeaders(),
  // });
  const response = await fetch(`${API_BASE_URL}api/fancy/v1/${matchId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch balance");
  }

  return response.json();
};
