import { LoginPayload } from '@/models';
import axiosClient from './axiosClient';

export const authApi = {
  login(payload: LoginPayload) {
    return axiosClient.post('/login', payload);
  },
  logout() {
    return axiosClient.post('/logout');
  },
};
