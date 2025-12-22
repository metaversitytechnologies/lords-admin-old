import { apiRequest } from "./api";

interface ChildListPayload {
  userId: string;
  index: number;
  noOfRecords: number;
  username: string;
}

interface BankDepositWithdrawPayload {
  userid: string;
  amount: string;
  lupassword: string;
}

export const getChildListLord = (payload: ChildListPayload) => {
  return apiRequest("/user/child-list-lord", "POST", payload);
};

export const getTransferStatementLord = (payload: { userId: string }) => {
  return apiRequest("/lord/get-transfer-statement-lord", "POST", payload);
};

export const bankDepositWithdraw = (payload: BankDepositWithdrawPayload) => {
  return apiRequest("/dwc/bank-deposit-withdraw", "POST", payload);
};

export const getIpAddressDetailLord = (payload: { ipAddress: string }) => {
  return apiRequest("/lord/get-ipaddress-detail-lord", "POST", payload);
};

export const getChildListMarketBetLock = (payload: { marketId: string }) => {
  return apiRequest("/user/get-child-list-mkt-bt-lkunlk", "POST", payload);
};

export const updateChildListMarketBetLock = (payload: {
  marketId: string;
  matchId: string | number;
  userList: Array<{ userId: string; lock: boolean }>;
}) => {
  return apiRequest("/user/update-child-list-mkt-bt-lkunlk", "POST", payload);
};
