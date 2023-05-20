import { filterForm } from '@/models/filter';
import axiosClient from './axiosClient';

export const houseApi = {
  noneAuthHouseApi(page: number) {
    return axiosClient.get(`/get/house/page/${page}`);
  },
  noneAuthFilter(payload: filterForm, page: number) {
    return axiosClient.post(`/get/house/filter/${page}`, payload);
  }
};
