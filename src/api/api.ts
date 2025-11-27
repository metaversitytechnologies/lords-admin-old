const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) return { "Content-Type": "application/json" };
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
};

export const apiRequest = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "POST",
  body: object | null = null
) => {
  const config: RequestInit = {
    method,
    headers: getAuthHeaders()
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (response.status === 401) {
    // Dispatch a custom event to trigger logout
    window.dispatchEvent(new CustomEvent("logout", { detail: { message: "Your session has expired. Please log in again." } }));
    // We can also throw an error to stop further processing in the caller
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }

  return response.json();
};
