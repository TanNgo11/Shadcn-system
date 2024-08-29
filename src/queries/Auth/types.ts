export type Auth = {
  accessToken: string;
  refreshToken: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type RefreshTokenPayload = {
  token: string;
};
