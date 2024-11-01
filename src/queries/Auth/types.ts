import { LoginKey } from '@/queries/Auth/keys';

export interface Auth {
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  [LoginKey.USERNAME]: string;
  [LoginKey.PASSWORD]: string;
}
export interface RefreshTokenPayload {
  token: string;
}
