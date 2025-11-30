import { create } from 'zustand';
import { authAPI } from '../services/api';
import type { ILoginResponse } from '../services/api';
import { decodeToken } from '../services/api';

interface AuthState {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const token = localStorage.getItem('token');
  const decoded = token ? decodeToken(token) : null;

  return {
    token,
    userId: decoded?.userId || null,
    isAuthenticated: !!token,

    initialize: () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        const decoded = decodeToken(storedToken);
        set({
          token: storedToken,
          userId: decoded?.userId || null,
          isAuthenticated: true,
        });
      }
    },

    login: async (email: string, password: string) => {
      const response: ILoginResponse = await authAPI.login(email, password);
      const decoded = decodeToken(response.token);
      localStorage.setItem('token', response.token);
      set({
        token: response.token,
        userId: decoded?.userId || null,
        isAuthenticated: true,
      });
    },

    register: async (name: string, email: string, password: string) => {
      await authAPI.register(name, email, password);
      const response: ILoginResponse = await authAPI.login(email, password);
      const decoded = decodeToken(response.token);
      localStorage.setItem('token', response.token);
      set({
        token: response.token,
        userId: decoded?.userId || null,
        isAuthenticated: true,
      });
    },

    logout: () => {
      localStorage.removeItem('token');
      set({
        token: null,
        userId: null,
        isAuthenticated: false,
      });
    },
  };
});
