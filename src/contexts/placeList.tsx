import { ReactNode, createContext, useEffect, useState } from "react";



interface placeListProp {
  children: ReactNode;
}

interface placeListData {
  placeList: any[],
  isLoading: boolean,
  setIsLoading: (payload: boolean) => void,
  setPlaceList: (payload: any) => void
}

const placeListDefault = {
  placeList: [],
  isLoading: false,
  setIsLoading: () => {},
  setPlaceList: (placeList: any) => {}
}

export const placeListContext = createContext<placeListData>(placeListDefault);

const PlaceListProvider = ({children}: placeListProp) => {
  const [placeList, setPlaceList_] = useState(placeListDefault.placeList);
  const [isLoading, setIsLoading_] = useState(placeListDefault.isLoading);
  const setIsLoading = (IsLoading:boolean)=> setIsLoading_(IsLoading);
  const setPlaceList = (placeList:any) => setPlaceList_(placeList);

  useEffect(() => {
  }, [setPlaceList]);

  const placeListDynamicData = {placeList, setPlaceList, isLoading, setIsLoading};

  return <placeListContext.Provider value={placeListDynamicData}>
    {children}
  </placeListContext.Provider>

}

export default PlaceListProvider;