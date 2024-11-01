import { Role, User } from '@/zustand/auth/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;

  accessTokenState: string | null;
  refreshTokenState: string | null;
  setUser: (user: User) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (set) => ({
      user: null,
      role: null,
      accessTokenState: null,
      refreshTokenState: null,

      setUser: (user) => set({ user }),

      setTokens: (accessToken, refreshToken) =>
        set({ accessTokenState: accessToken, refreshTokenState: refreshToken }),

      clearAuth: () =>
        set({
          user: null,
          accessTokenState: null,
          refreshTokenState: null,
        }),
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    },
  ),
);
