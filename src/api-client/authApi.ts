import { LoginPayload } from '@/models';
import axiosClient from './axiosClient';

export const authApi = {
  refreshToken(refreshToken: string) {
    return axiosClient.post('/refresh', { refreshToken: refreshToken });
  },
  auth() {
    return axiosClient.post('/auth');
  }
};
