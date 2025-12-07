
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getOddsData = async (matchId: string) => {

  const response = await fetch(`http://103.189.88.178:8081/api/fancy/v1/${matchId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch balance");
  }

  return response.json();
};
