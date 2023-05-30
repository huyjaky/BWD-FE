import { addressSearch } from '@/models/addressSearch';
import { filterForm } from '@/models/filter';
import axiosClient from './axiosClient';


export const houseApi = {
  noneAuthHouseApi(page: number | null, UserId: string) {
    return axiosClient.get(`/get/house/page/${page ? page : ''}`, {params: {userid: UserId}});
  },
  noneAuthFilter(payload: { filter: filterForm; selectPlace: addressSearch }, page: number, UserId: string) {
    return axiosClient.post(`/get/house/filter/${page}`, {datafil: payload, UserId: UserId});
  },
  authFavoriteHouse(HouseId: string, UserId: string) {
    return axiosClient.post(`/create/favorite`, { HouseId: HouseId, UserId: UserId });
  },
};
