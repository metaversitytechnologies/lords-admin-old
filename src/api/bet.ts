import { apiRequest } from "./api";

export const getOddsPnl = async (payload: object) => {
  return apiRequest("/bets/odds-pnl", "POST", payload);
};
export const getWinnerPnl = async (payload: object) => {
  return apiRequest("/bets/winner-pnl", "POST", payload);
};
export const getFancyPnl = async (payload: object) => {
  return apiRequest("/bets/fancy-pnl", "POST", payload);
};
export const getBetList = async (payload: object) => {
  return apiRequest("/bets/bet-list-by-matchid", "POST", payload);
};

export const getMyBetReport = async (payload: object) => {
  return apiRequest("/lord/my-bet-report-lord", "POST", payload);
};

export const getPnlReportByMarketId = async (payload: object) => {
  return apiRequest("/lord/pnl-report-by-marketid-lord", "POST", payload);
};

export const getBetListByMarketId = async (payload: object) => {
  return apiRequest("/lord/bet-list-by-marketid-lord", "POST", payload);
};

export const getUserFancyBook = async (payload: object) => {
  return apiRequest("/bets/fancy-book", "POST", payload);
};

export const getUserBookMarketwise = async (payload: object) => {
  return apiRequest("/lord/get-user-book-lord-marketwise", "POST", payload);
};
