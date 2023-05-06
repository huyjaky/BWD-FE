import { address, addressProps } from '@/models/address';
import axiosClient from './axiosClient';

export const placeApi = {
  searchPlace(payload: addressProps) {
    return axiosClient.post('/searchplace', payload);
  },
  searchLocation(payload: address) {
    return axiosClient.post('/searchlocation', payload);
  }
};
