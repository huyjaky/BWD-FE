import { house_ } from '@/models/house';
import { ReactNode, createContext, useState } from 'react';

interface getHouseProps {
  children: ReactNode;
}

interface getHouseData {
  isFilter: boolean | null,
  setIsFilter: (payload: boolean) => void;
}

const getHouseDataDefault: getHouseData = {
  isFilter: null,
  setIsFilter: () => {}
};

export const getHouseContext = createContext<getHouseData>(getHouseDataDefault);

const GetHouseProvider = ({ children }: getHouseProps) => {
  const [isFilter, setIsFilter_] = useState(getHouseDataDefault.isFilter);
  const setIsFilter = (payload: boolean | null) => setIsFilter_(payload);

  const getHouseDynamicData = { isFilter, setIsFilter};
  return (
    <getHouseContext.Provider value={getHouseDynamicData}>{children}</getHouseContext.Provider>
  );
};

export default GetHouseProvider;
