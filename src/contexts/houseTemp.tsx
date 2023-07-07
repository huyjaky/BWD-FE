import { house_ } from '@/models/house';
import { ReactNode, createContext, useState } from 'react';

interface HouseTempProps {
  children: ReactNode;
}

interface HouseTempData {
  houseTemp: house_[];
  setHouseTemp: (payload: house_[]) => void;
}

const houseTempDefaultData: HouseTempData = {
  houseTemp: [

  ],
  setHouseTemp: () => {}
};

export const houseTempContext = createContext<HouseTempData>(houseTempDefaultData);

const HouseTempProvider = ({ children }: HouseTempProps) => {
  const [houseTemp, setHouseTemp_] = useState<house_[]>(houseTempDefaultData.houseTemp);
  const setHouseTemp = (payload: house_[]) => setHouseTemp_(payload);

  const imgFileDynamicData = { houseTemp, setHouseTemp };
  return <houseTempContext.Provider value={imgFileDynamicData}>{children}</houseTempContext.Provider>;
};

export default HouseTempProvider;

