import { apiRequest } from "./api";

export const getAdminMessage = () => {
  return apiRequest("/message-lord/get-message-lord", "POST");
};

export const setAdminMessage = (payload: { message: string }) => {
  return apiRequest("/message-lord/set-message-admin", "POST", payload);
};
