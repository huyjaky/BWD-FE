import axiosClient from './axiosClient';

export const houseApi = {
  noneAuthHouseApi(page:number) {
    return axiosClient.get(`/get/house/page/${page}`);
  }
};
