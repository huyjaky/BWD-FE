import { house_ } from "@/models/house";
import { ReactNode, createContext, useState } from "react";



interface selectHouseProps {
  children: ReactNode
}

interface selectHouseData {
  selectHouse: house_ | undefined;
  resetSelectHouse: () => void;
  setSelectHouse: (payload: house_) => void
}

const selectHouseDefaultData: selectHouseData = {
  selectHouse: {
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
      title:''
    },
    AddressId: '', //
    Area: '', //
    arrImg: [],
    Capacity: 0, //
    DateUp: new Date(), //
    Description: '', //
    HouseId: '',
    IsFavorite: false,
    JudicalId: '',
    NumsOfBath: 0, //
    NumsOfBed: 0, //
    Orientation: '',
    placeOffer: [], //
    PostBy: '', //
    Price: 0, //
    Title: '', //
    Type: '',
    useracc: {
      UserId: '',
      UserName: '',
      Password: '',
      Birth: new Date(),
      Gmail: '',
      Sex: '',
      Decentralization: '',
      PersonCode: '',
      CustomerType: '',
      Image: '',
      error: '',
      Phone: ''
    }
  },
  resetSelectHouse: ()=>{},
  setSelectHouse: ()=>{}
}

export const selectHouseContext = createContext<selectHouseData>(selectHouseDefaultData);

const SelectHouseProvider = ({children}: selectHouseProps) =>{
  const [selectHouse, setSelectHouse_] = useState<house_>();
  const resetSelectHouse = () => setSelectHouse_(selectHouseDefaultData.selectHouse);
  const setSelectHouse = (payload: house_ ) => setSelectHouse_(payload);

  const selectHouseDynamicData = {selectHouse, resetSelectHouse, setSelectHouse};

  return <selectHouseContext.Provider value={selectHouseDynamicData}>
    {children}
  </selectHouseContext.Provider>
}

export default SelectHouseProvider;