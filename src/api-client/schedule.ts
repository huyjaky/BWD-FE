import { addressProps } from '@/models/address';
import axiosClient from './axiosClient';
import { house_ } from '@/models/house';

export interface scheduleCreate {
  UserId: string;
  HouseId: string;
  PhoneNumber: string;
  Date: Date;
  Adults: number;
  Childrens: number;
  Infants: number;
  Host: string;
  house: house_ | undefined
}

export const schedule = {
  createSchedule(payload: scheduleCreate) {
    return axiosClient.post('/create/schedule', payload);
  }
};
