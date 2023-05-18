import { house_ } from '@/models/house';
import { ReactNode, createContext, useState } from 'react';

interface getHouseProps {
  children: ReactNode;
}

interface getHouseData {
  house: house_[];
  setHouse: (payload: house_[]) => void;
  isLoading: boolean,
  setIsLoading: (payload: boolean) => void;

}

const getHouseDataDefault: getHouseData = {
  house: [],
  setHouse: () => {},
  isLoading: true,
  setIsLoading: ()=>{}
};

export const getHouseContext = createContext<getHouseData>(getHouseDataDefault);

const GetHouseProvider = ({ children }: getHouseProps) => {
  const [isLoading, setIsLoading_] = useState(getHouseDataDefault.isLoading);
  const [house, setHouse_] = useState(getHouseDataDefault.house);
  const setIsLoading = (payload: boolean) => setIsLoading_(payload);
  const setHouse = (payload: house_[]) => {
    if (house.length != 0){
      setHouse_({...house, ...payload})
    } else {
      setHouse_(payload);
    }
  };

  const getHouseDynamicData = { house, setHouse, isLoading, setIsLoading };
  return (
    <getHouseContext.Provider value={getHouseDynamicData}>{children}</getHouseContext.Provider>
  );
};

export default GetHouseProvider;
