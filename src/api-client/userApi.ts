import axiosClient from './axiosClient';

export const userApi = {
  userInfor(payload: string, attr: string) {
    return axiosClient.get(`/get/useracc/${attr}/${payload}`);
  }
};
