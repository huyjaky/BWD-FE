import { house_ } from '@/models/house';
import { ReactNode, createContext, useState } from 'react';

interface getHouseProps {
  children: ReactNode;
}

interface getHouseData {
  house: house_[];
  setHouse: (payload: house_[]) => void;
}

const getHouseDataDefault: getHouseData = {
  // house: {
  //   houseDetail: {
  //     HouseId: '',
  //     Title: '',
  //     DateUp: new Date(),
  //     Price: 0,
  //     Area: '',
  //     NumsOfBed: 1,
  //     NumsOfBath: 1,
  //     PostBy: '',
  //     AddressId: '',
  //     JudicalId: '',
  //     Des: ''
  //   },
  //   address: {
  //     countryRegion: '',
  //     locality: '',
  //     adminDistrict: '',
  //     adminDistrict2: '',
  //     countryRegionIso2: '',
  //     houseNumber: '',
  //     postalCode: '',
  //     addressLine: '',
  //     streetName: '',
  //     formattedAddress: '',
  //     latitude: '',
  //     longitude: ''
  //   },
  //   useracc: {
  //     UserId: '',
  //     UserName: '',
  //     Password: '',
  //     Birth: new Date(),
  //     Gmail: '',
  //     Sex: '',
  //     Decentralization: '',
  //     PersonCode: '',
  //     CustomerType: '',
  //     error: ''
  //   }
  // },
  house: [],
  setHouse: () => {}
};

export const getHouseContext = createContext<getHouseData>(getHouseDataDefault);

const GetHouseProvider = ({ children }: getHouseProps) => {
  const [house, setHouse_] = useState(getHouseDataDefault.house);
  const setHouse = (payload: house_[]) => setHouse_(payload);

  const getHouseDynamicData = { house, setHouse };
  return (
    <getHouseContext.Provider value={getHouseDynamicData}>{children}</getHouseContext.Provider>
  );
};

export default GetHouseProvider;
