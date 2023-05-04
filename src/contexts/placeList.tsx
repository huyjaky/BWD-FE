import { ReactNode, createContext, useEffect, useState } from "react";



interface placeListProp {
  children: ReactNode;
}

interface placeListData {
  placeList: any[],
  setPlaceList: (payload: any) => void
}

const placeListDefault = {
  placeList: [],
  setPlaceList: (placeList: any) => {}
}

export const placeListContext = createContext<placeListData>(placeListDefault);

const PlaceListProvider = ({children}: placeListProp) => {
  const [placeList, setPlaceList_] = useState(placeListDefault.placeList);
  const setPlaceList = (placeList:any) => setPlaceList_(placeList);

  useEffect(() => {
  }, [setPlaceList]);

  const placeListDynamicData = {placeList, setPlaceList};

  return <placeListContext.Provider value={placeListDynamicData}>
    {children}
  </placeListContext.Provider>

}

export default PlaceListProvider;