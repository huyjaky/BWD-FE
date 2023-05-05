import { address } from '@/models/address';
import { ReactNode, createContext, useState } from 'react';

interface selectPlaceProps {
  children: ReactNode;
}

interface selectPlaceData {
  address: address;
  setAddress: (payload: address) => void;
}

const selectPlaceDefaultData = {
  address: {
    countryRegion: '',
    locality: '',
    adminDistrict: '',
    adminDistrict2: '',
    countryRegionIso2: '',
    houseNumber: '',
    postalCode: '',
    addressLine: '',
    streetName: '',
    formattedAddress: ''
  },
  setAddress: () => {}
};

export const selectPlaceContext = createContext<selectPlaceData>(selectPlaceDefaultData);

const SelectPlaceProvider = ({ children }: selectPlaceProps) => {
  const [address, setAddress_] = useState(selectPlaceDefaultData.address);

  const setAddress = (payload: address) => setAddress_(payload);

  const selectPlaceDynamicData = { address, setAddress };

  return (
    <selectPlaceContext.Provider value={selectPlaceDynamicData}>
      {children}
    </selectPlaceContext.Provider>
  );
};
export default SelectPlaceProvider;
