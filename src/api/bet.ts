import { apiRequest } from "./api";

export const getOddsPnl = async (payload: object) => {
  return apiRequest("/bets/odds-pnl", "POST", payload);
};
export const getFancyPnl = async (payload: object) => {
  return apiRequest("/bets/fancy-pnl", "POST", payload);
};
export const getBetList = async (payload: object) => {
  return apiRequest("/bets/bet-list-by-matchid", "POST", payload);
};
