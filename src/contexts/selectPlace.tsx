import { addressSearch } from '@/models/addressSearch';
import { selectPlaceData } from '@/models/place';
import { ReactNode, createContext, useState } from 'react';

interface selectPlaceProps {
  children: ReactNode;
}

const selectPlaceDefaultData: selectPlaceData = {
  address: {
    address: {
      countryRegion: '',
      locality: '',
      adminDistrict: '',
      countryRegionIso2: '',
      postalCode: '',
      addressLine: '',
      streetName: '',
      formattedAddress: '',
      latitude: 0,
      longitude: 0,
      title: ''
    },
    checkInDay: new Date(),
    checkOutDay: new Date(),
    guest: {
      adults: 0,
      childrens: 0,
      infants: 0
    }
  },
  emptyAddress: {
    address: {
      title: '',
      countryRegion: '',
      locality: '',
      adminDistrict: '',
      countryRegionIso2: '',
      postalCode: '',
      addressLine: '',
      streetName: '',
      formattedAddress: '',
      latitude: 0,
      longitude: 0
    },
    checkInDay: new Date(),
    checkOutDay: new Date(),
    guest: {
      adults: 0,
      childrens: 0,
      infants: 0
    }
  },
  setAddress: () => { }
};

export const selectPlaceContext = createContext<selectPlaceData>(selectPlaceDefaultData);

const SelectPlaceProvider = ({ children }: selectPlaceProps) => {
  const [address, setAddress_] = useState(selectPlaceDefaultData.address);
  const [emptyAddress, setEmptyAddress] = useState(selectPlaceDefaultData.emptyAddress);

  const setAddress = (payload: addressSearch) => setAddress_(payload);

  const selectPlaceDynamicData = { address, setAddress , emptyAddress};

  return (
    <selectPlaceContext.Provider value={selectPlaceDynamicData}>
      {children}
    </selectPlaceContext.Provider>
  );
};
export default SelectPlaceProvider;
