import axiosClient from './axiosClient';

export const houseApi = {
  noneAuthHouseApi() {
    return axiosClient.get(`/get/house`);
  }
};
