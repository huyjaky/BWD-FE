import { address } from './address';
import { addressSearch } from './addressSearch';

export interface placeListData {
  placeList: any[];
  isLoading: boolean;
  isFetch: boolean;
  setIsLoading: (payload: boolean) => void;
  setPlaceList: (payload: any) => void;
  setIsFetch: (payload: boolean) => void;
}
export interface selectPlaceData {
  address: addressSearch;
  emptyAddress: addressSearch;
  setAddress: (payload: addressSearch) => void;
}
export interface selectPopoverDefault {
  selected: string;
  setSelected: (selected: string) => void;
  isLoginClick: boolean;
  setIsLoginClick: (payload: boolean) => void;
}
