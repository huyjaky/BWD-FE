import { placeListData } from '@/models/place';
import { ReactNode, createContext, useEffect, useState } from 'react';

interface placeListProp {
  children: ReactNode;
}

const placeListDefault = {
  placeList: [],
  isLoading: false,
  isFetch: true,
  setIsLoading: () => {},
  setPlaceList: () => {},
  setIsFetch: () => {}
};

export const placeListContext = createContext<placeListData>(placeListDefault);

const PlaceListProvider = ({ children }: placeListProp) => {
  const [placeList, setPlaceList_] = useState(placeListDefault.placeList);
  const [isLoading, setIsLoading_] = useState(placeListDefault.isLoading);
  const [isFetch, setIsFetch_] = useState(placeListDefault.isFetch);
  const setIsLoading = (IsLoading: boolean) => setIsLoading_(IsLoading);
  const setPlaceList = (placeList: any) => setPlaceList_(placeList);
  const setIsFetch = (isFetch: boolean) => setIsFetch_(isFetch);

  useEffect(() => {}, [setPlaceList]);

  const placeListDynamicData = {
    placeList,
    setPlaceList,
    isLoading,
    setIsLoading,
    isFetch,
    setIsFetch
  };

  return (
    <placeListContext.Provider value={placeListDynamicData}>{children}</placeListContext.Provider>
  );
};

export default PlaceListProvider;
