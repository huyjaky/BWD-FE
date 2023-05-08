import { address } from './address';

export interface placeListData {
  placeList: any[];
  isLoading: boolean;
  isFetch: boolean;
  setIsLoading: (payload: boolean) => void;
  setPlaceList: (payload: any) => void;
  setIsFetch: (payload: boolean) => void;
}
export interface selectPlaceData {
  address: address;
  setAddress: (payload: address) => void;
}
export interface selectPopoverDefault {
  selected: string;
  setSelected: (selected: string) => void;
}
