const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export enum API_QUERIES {
  IDENTITY = '/identity',
  LOGIN = '/login',
}
const getApiUrl = (endpoint: API_QUERIES) => {
  return `${API_BASE_URL}${endpoint}`;
};
export const API_URLS = {
  IDENTITY: getApiUrl(API_QUERIES.IDENTITY),
  LOGIN: getApiUrl(API_QUERIES.LOGIN),
} as const;
