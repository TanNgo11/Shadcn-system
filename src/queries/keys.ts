// Import environment variables
const BASE_URLS = {
  DEFAULT: import.meta.env.VITE_API_BASE_URL_IDENTITY,
  PROFILE: import.meta.env.VITE_API_BASE_URL_PROFILE,
  NOTIFICATION: import.meta.env.VITE_API_BASE_URL_NOTIFICATION,
  COURSE: import.meta.env.VITE_API_BASE_URL_COURSE,
  CHAT: import.meta.env.VITE_API_BASE_URL_CHAT,
  BLOG: import.meta.env.VITE_API_BASE_URL_BLOG,
  FILE: import.meta.env.VITE_API_BASE_URL_FILE,
};
// Enum for endpoints
export enum API_ENDPOINTS {
  IDENTITY = '/identity',
  PROFILE = '/profile',
  NOTIFICATION = '/notifications',
  COURSE = '/course-svc',
  CHAT = '/chat-svc',
  BLOG = '/post-svc',
  FILE = '/file-svc',
}

// Map endpoints to their base URLs
const ENDPOINT_BASE_URL_MAP: Record<API_ENDPOINTS, string> = {
  [API_ENDPOINTS.IDENTITY]: BASE_URLS.DEFAULT,
  [API_ENDPOINTS.PROFILE]: BASE_URLS.PROFILE,
  [API_ENDPOINTS.NOTIFICATION]: BASE_URLS.NOTIFICATION,
  [API_ENDPOINTS.COURSE]: BASE_URLS.COURSE,
  [API_ENDPOINTS.CHAT]: BASE_URLS.CHAT,
  [API_ENDPOINTS.BLOG]: BASE_URLS.BLOG,
  [API_ENDPOINTS.FILE]: BASE_URLS.FILE,
};

// Function to construct URLs dynamically
const getApiUrl = (endpoint: API_ENDPOINTS): string => {
  const baseUrl = ENDPOINT_BASE_URL_MAP[endpoint] || BASE_URLS.DEFAULT;
  return `${baseUrl}${endpoint}`;
};

// Export URLs for easy access
export const API_URLS = {
  IDENTITY: getApiUrl(API_ENDPOINTS.IDENTITY),
  PROFILE: getApiUrl(API_ENDPOINTS.PROFILE),
  NOTIFICATION: getApiUrl(API_ENDPOINTS.NOTIFICATION),
  COURSE: getApiUrl(API_ENDPOINTS.COURSE),
  CHAT: getApiUrl(API_ENDPOINTS.CHAT),
  BLOG: getApiUrl(API_ENDPOINTS.BLOG),
  FILE: getApiUrl(API_ENDPOINTS.FILE),
} as const;

export enum API_QUERIES {
  TAGS_LIST = '/tag-list',
  POSTS_LIST = '/post-list',
}
