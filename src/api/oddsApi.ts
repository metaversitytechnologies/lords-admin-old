
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getOddsData = async (matchId: string) => {

  const response = await fetch(`https://oddsapi.globalexch.co.in/api/fancy/v1/${matchId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch balance");
  }

  return response.json();
};

export const getScorecardData = async (matchId: string) => {

  const response = await fetch(`https://oddsapi.globalexch.co.in/api/fancy/v1/scoreApi/${matchId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch scorecard");
  }

  return response.json();
};

export const getMatchSettings = async (matchId: string) => {
  const response = await fetch(
    `https://oddsapi.globalexch.co.in/api/fancy/v1/matchSettings/${matchId}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch match settings");
  }

  return response.json();
};
