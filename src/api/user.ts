import { apiRequest } from "./api";

interface ChildListPayload {
  userId: string;
  index: number;
  noOfRecords: number;
  username: string;
}

export const getChildListLord = (payload: ChildListPayload) => {
  return apiRequest("/user/child-list-lord", "POST", payload);
};
