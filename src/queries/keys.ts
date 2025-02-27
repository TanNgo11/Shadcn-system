// Import environment variables
const BASE_URLS = {
  DEFAULT: import.meta.env.VITE_API_BASE_URL_IDENTITY,
  PROFILE: import.meta.env.VITE_API_BASE_URL_PROFILE,
  NOTIFICATION: import.meta.env.VITE_API_BASE_URL_NOTIFICATION,
  COURSE: import.meta.env.VITE_API_BASE_URL_COURSE,
  CHAT: import.meta.env.VITE_API_BASE_URL_CHAT,
};
// Enum for endpoints
export enum API_QUERIES {
  IDENTITY = '/identity',
  PROFILE = '/profile',
  NOTIFICATION = '/notifications',
  COURSE = '/course-svc',
  CHAT = '/chat-svc',
}

// Map endpoints to their base URLs
const ENDPOINT_BASE_URL_MAP: Record<API_QUERIES, string> = {
  [API_QUERIES.IDENTITY]: BASE_URLS.DEFAULT,
  [API_QUERIES.PROFILE]: BASE_URLS.PROFILE,
  [API_QUERIES.NOTIFICATION]: BASE_URLS.NOTIFICATION,
  [API_QUERIES.COURSE]: BASE_URLS.COURSE,
  [API_QUERIES.CHAT]: BASE_URLS.CHAT,
};

// Function to construct URLs dynamically
const getApiUrl = (endpoint: API_QUERIES): string => {
  const baseUrl = ENDPOINT_BASE_URL_MAP[endpoint] || BASE_URLS.DEFAULT;
  return `${baseUrl}${endpoint}`;
};

// Export URLs for easy access
export const API_URLS = {
  IDENTITY: getApiUrl(API_QUERIES.IDENTITY),
  PROFILE: getApiUrl(API_QUERIES.PROFILE),
  NOTIFICATION: getApiUrl(API_QUERIES.NOTIFICATION),
  COURSE: getApiUrl(API_QUERIES.COURSE),
  CHAT: getApiUrl(API_QUERIES.CHAT),
} as const;

