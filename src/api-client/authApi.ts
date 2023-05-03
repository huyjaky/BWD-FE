import { LoginPayload } from '@/models';
import axiosClient from './axiosClient';

export const authApi = {
  login(payload: LoginPayload) {
    return axiosClient.post('/login', payload);
  },
  logout() {
    return axiosClient.post('/logout');
  },
  refreshToken(refreshToken: string) {
    return axiosClient.post('/refresh', { refreshToken: refreshToken });
  },
  auth() {
    return axiosClient.post('/auth');
  }
};
