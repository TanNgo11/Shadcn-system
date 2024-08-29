/* eslint-disable react-hooks/rules-of-hooks */
import { LoginPayload } from '@/queries/Auth/types';
import { useGetUserInfo } from '@/queries/Auth/useGetUserInfo';
import { useLogin } from '@/queries/Auth/useLogin';
import { useRefreshToken } from '@/queries/Auth/useRefreshToken';
import { Role, User } from '@/zustand/auth/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// import { authenticate, fetchUserInfo } from '@/api/UserApi'; // Ensure this path is correct

interface AuthState {
  user: User | null;
  role: Role[] | null;
  accessTokenState: string | null;
  refreshTokenState: string | null;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  setTokens: (accessToken: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (set, get) => ({
      user: null,
      role: null,
      accessTokenState: null,
      refreshTokenState: null,

      login: async (payload) => {
        const { onLogin } = useLogin({
          onSuccess: (data) => {
            const { accessToken, refreshToken } = data.result;
            set({
              accessTokenState: accessToken,
              refreshTokenState: refreshToken,
            });
          },
          onError: (error) => {
            console.error('Login failed:', error);
          },
        });
        const { data } = useGetUserInfo();

        onLogin(payload);

        set({
          user: data,
        });
      },

      logout: () => {
        set({
          user: null,
          role: null,
          accessTokenState: null,
          refreshTokenState: null,
        });
      },

      refreshToken: async () => {
        const { refreshTokenState } = get();
        if (!refreshTokenState) throw new Error('No refresh token available');
        const { onRefreshToken } = useRefreshToken({
          onSuccess: (data) => {
            const { accessToken, refreshToken } = data.result;
            set({
              accessTokenState: accessToken,
              refreshTokenState: refreshToken,
            });
          },
          onError: (error) => {
            console.error('Refresh token failed:', error);
          },
        });
        onRefreshToken({ token: refreshTokenState });
      },

      setTokens: (accessToken, refreshToken) =>
        set({ accessTokenState: accessToken, refreshTokenState: refreshToken }),
    }),

    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    },
  ),
);
