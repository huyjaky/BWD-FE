import { address } from './address';

export interface addressSearch {
  address: address;
  checkInDay: Date;
  checkOutDay: Date;

  guest: {
    adults: number;
    childrens: number;
    infants: number;
  };
}
