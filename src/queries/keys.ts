const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export enum API_QUERIES {
  _IDENTITY = '/identity',
  _LOGIN = '/login',
}
const getApiUrl = (endpoint: API_QUERIES) => {
  return `${API_BASE_URL}${endpoint}`;
};
export const API_URLS = {
  _IDENTITY: getApiUrl(API_QUERIES._IDENTITY),
  _LOGIN: getApiUrl(API_QUERIES._LOGIN),
} as const;