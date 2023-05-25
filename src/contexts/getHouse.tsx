import { ReactNode, createContext, useState } from 'react';

interface getHouseProps {
  children: ReactNode;
}

interface getHouseData {
  isFilter: number;
  setIsFilter: (payload: number) => void;
}

const getHouseDataDefault: getHouseData = {
  isFilter: 0,
  setIsFilter: () => {}
};

export const getHouseContext = createContext<getHouseData>(getHouseDataDefault);

const GetHouseProvider = ({ children }: getHouseProps) => {
  const [isFilter, setIsFilter_] = useState(getHouseDataDefault.isFilter);
  const setIsFilter = (payload: number) => setIsFilter_(payload);

  const getHouseDynamicData = { isFilter, setIsFilter };
  return (
    <getHouseContext.Provider value={getHouseDynamicData}>{children}</getHouseContext.Provider>
  );
};

export default GetHouseProvider;
