import { addressSearch } from '@/models/addressSearch';
import { filterForm } from '@/models/filter';
import axiosClient from './axiosClient';

export const houseApi = {
  noneAuthHouseApi(page: number) {
    return axiosClient.get(`/get/house/page/${page}`);
  },
  noneAuthFilter(payload: {filter: filterForm, selectPlace: addressSearch}, page: number) {
    return axiosClient.post(`/get/house/filter/${page}`, payload);
  }
};
