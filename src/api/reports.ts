import { apiRequest } from "./api";

export const getGameReportLord = (
  fromDate: string,
  toDate: string,
  eventType: string
) => {
  return apiRequest("/lord/get-game-report-lord", "POST", {
    fromDate,
    toDate,
    eventType
  });
};

export interface AccountStatementPayload {
  pnlStatement: boolean;
  userId: string;
  fromDate: string;
  toDate: string;
  noOfRecords: number;
  index: number;
  balanceType: string;
}

export const getAccountStatement = (payload: AccountStatementPayload) => {
  return apiRequest("/lord/act-statement-with-userid-lord", "POST", payload);
};

export const getSportListLord = () => {
  return apiRequest("/lord/sport-list-lord", "POST", {});
};

export const getMarketListSportWiseLord = (payload: { sportId: string }) => {
  return apiRequest("/lord/market-list-sportwise-lord", "POST", payload);
};
