import { apiRequest } from './api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const loginApi = async (userId: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/login/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId,
      password,
      // appUrl: "admin." + globalThis.location.hostname,
      appUrl: "admin.localhost"
    })
  });

  if (!response.ok) {
    if(response.status === 401){
      window.dispatchEvent(new CustomEvent("logout", { detail: { message: "Your session has expired. Please log in again." } }));
      throw new Error("Unauthorized");
    }
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
};

export const createUser = async (payload: object) => {
  return apiRequest('/user/create-user-lord', 'POST', payload);
};

export const getBalance = async () => {
  return apiRequest('/user/get-balance-lord', 'POST');
};

export const getNetExposureDetail = async () => {
  return apiRequest('/user/netexposure-detail-lord', 'POST');
};

export const getNetExposureDetailByUserId = async (payload: { userId: string; }) => {
  return apiRequest('/user/netexposure-detail-userid-lord', 'POST', payload);
};
export const getChildListLord = async (payload: object) => {
  return apiRequest('/user/child-list-lord', 'POST', payload);
};

export const updateUserLord = async (payload: object) => {
  return apiRequest('/user/update-user-lord', 'POST', payload);
};

export const getDetailForUpdateLord = async (payload: { userId: string }) => {
  return apiRequest('/user/get-detail-for-update-lord', 'POST', payload);
};

export const getUnsettledByMatchId = async (payload: object) => {
  return apiRequest('/lord/unsettled-by-matchid', 'POST', payload);
};
export const getBettingPnl = async (payload: {
  userId: string;
  fromDate: string;
  toDate: string;
}) => {
  return apiRequest('/lord/betting-pnl-uidswise-lord', 'POST', payload);
};

export const getBettingPnlDetail = async (payload: {
  userId: string;
  fromDate: string;
  toDate: string;
  marketId: string;
}) => {
  return apiRequest('/lord/betting-pnl-detail', 'POST', payload);
};

export const getWinLossActivity = async (payload: { userId: string }) => {
  return apiRequest('/lord/win-loss-activity', 'POST', payload);
};

export const getBalanceByUserId = async (payload: { userId: string }) => {
  return apiRequest('/user/get-balance-useridwise-lord', 'POST', payload);
};

export const getBetDetailUseridwiseLord = async (payload: object) => {
  return apiRequest('/lord/bet-detail-useridwise-lord', 'POST', payload);
};

export const getBetTicker = async (payload: object) => {
  return apiRequest('/lord/bet-ticker', 'POST', payload);
};

export const logoutApi = async () => {
  return apiRequest('/login/logout', 'POST');
};

export const createPwLord = async (payload: object) => {
  return apiRequest('/pw-lord/crate-pw-lord', 'POST', payload);
};

export const getDownlineUserlistLord = async (payload: object) => {
  return apiRequest('/user/get-donwline-userlist-lord', 'POST', payload);
};

export const listPwUserLord = async () => {
  return apiRequest('/pw-lord/list-pwuser-lord', 'POST');
};

export const updatePwLord = async (payload: object) => {
  return apiRequest('/pw-lord/update-pwuser-pass', 'POST', payload);
};

export const updatePwStatus = async (payload: object) => {
  return apiRequest('/pw-lord/update-pwstatus', 'POST', payload);
};

export const updatePwUserPermission = async (payload: object) => {
  return apiRequest('/pw-lord/update-pwuser-permission', 'POST', payload);
};

export const getStatementUseridwiseLord = async (payload: object) => {
  return apiRequest('/lord/statement-useridwise-lord', 'POST', payload);
};

