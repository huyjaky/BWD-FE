import { ReactNode, createContext, useState } from 'react';

interface getHouseProps {
  children: ReactNode;
}

export interface isFilter_ {
  isFilter_:
    | 'noneAuthFilter'
    | 'favoriteHouse'
    | 'noneAuthHouseApi'
    | 'main'
    | 'authListHouse'
    | 'houseForSale'
    | 'houseForRent'
    | 'trending'
    | 'favoriteHouse';
}

interface getHouseData {
  isFilter: isFilter_['isFilter_'];
  setIsFilter: (payload: isFilter_['isFilter_']) => void;
  reRenderFilter: number;
  setReRenderFilter: (payload:number) => void
}

const getHouseDataDefault: getHouseData = {
  isFilter: 'main',
  setIsFilter: () => {},
  reRenderFilter:1,
  setReRenderFilter: ()=>{}
};

export const getHouseContext = createContext<getHouseData>(getHouseDataDefault);

const GetHouseProvider = ({ children }: getHouseProps) => {
  const [isFilter, setIsFilter_] = useState(getHouseDataDefault.isFilter);
  const [reRenderFilter, setReRenderFilter_] = useState(getHouseDataDefault.reRenderFilter);
  const setIsFilter = (payload: isFilter_['isFilter_']) => setIsFilter_(payload);
  const setReRenderFilter = (payload:number) => setReRenderFilter_(payload);

  const getHouseDynamicData = { isFilter, setIsFilter, reRenderFilter, setReRenderFilter };
  return (
    <getHouseContext.Provider value={getHouseDynamicData}>{children}</getHouseContext.Provider>
  );
};

export default GetHouseProvider;
