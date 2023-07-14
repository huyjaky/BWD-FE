import { addressProps } from '@/models/address';
import axiosClient from './axiosClient';

export interface scheduleCreate {
  UserId: string;
  HouseId: string;
  PhoneNumber: string;
  Date: Date;
  Adults: number;
  Childrens: number;
  Infants: number;
  Host: string
}

export const schedule = {
  createSchedule(payload: scheduleCreate) {
    return axiosClient.post('/create/schedule', payload);
  }
};
