import { address } from './address';
import { userAcc } from './userAcc';

export interface house {
  HouseId: string;
  Title: string;
  Des: string;
  DateUp: Date;
  PostBy: string;
  Price: number;
  Area: string;
  NumsOfBed: number;
  NumsOfBath: number;
  AddressId: string;
  JudicalId: string;
}

export interface house_ {
  HouseId: string;
  Title: string;
  Des: string;
  DateUp: Date;
  PostBy: string;
  Price: number;
  Area: string;
  NumsOfBed: number;
  NumsOfBath: number;
  AddressId: string;
  JudicalId: string;
  address: address;
  useracc: userAcc;
  IsFavorite: boolean; // yeu thich nha
  arrImg: { Path: string }[]; // Mang anh
  Orientation: string; // Huong nha
  Capacity: number;
  placeOffer: { PlaceOfferId: string; PlaceOffer: string; PathIcon: string }[];
}
