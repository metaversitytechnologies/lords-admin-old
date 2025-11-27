import { apiRequest } from './api';

export const getOddsData = async (matchId: string) => {
  return apiRequest(`/betfair_api/fancy/${matchId}`, 'GET');
};
